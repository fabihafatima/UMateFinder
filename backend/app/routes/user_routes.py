from flask import Blueprint, request, jsonify, current_app

user_bp = Blueprint('user_bp', __name__, url_prefix='/user')

# @user_bp.route('/<string:email>', methods=['GET'])
# def get_user(email):
#     db = current_app.config["db"]
#     users_collection = db.user_login_data 
#     user_details = users_collection.find_one({"email": email})
#     if not user_details:
#         return jsonify({"error": "User not found"}), 404
#     user_details["_id"] = str(user_details["_id"])
#     user_response = {}
#     for field in user_details:
#         if field=="email" or field=="password":
#             user_response[field] = user_details[field]
#     return jsonify(user_response), 200

# Login
@user_bp.route('/validate', methods=['POST'])
def validate_user():
    db = current_app.config["db"]
    users_collection = db.user_login_data
    required_fields = ["email", "password"]  # Define required fields as needed
    data = request.json
    user_details = users_collection.find_one({"email": data["email"]})
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400
    if not user_details:
        return jsonify({"error": "User does not exist please Sign up!"}), 404
    if data["password"] != user_details["password"]:
        return jsonify({"error": "Wrong Password, try again!"}), 401
    return jsonify({"message": "User Logged in!"}), 200

# Sign Up
@user_bp.route('/insert', methods=['POST'])
def insert_user():
    db = current_app.config["db"]
    users_collection = db.user_login_data
    required_fields = ["name", "email", "password", "phone", "degree", "dob", "gender", "major"]  # Define required fields as needed
    data = request.json
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400
    user_id = users_collection.insert_one(data).inserted_id
    return jsonify({"message": "You have been Signed Up!"}), 200

# Adding or Deleting a favourite email id in a user according to the add_fav flag
@user_bp.route('/favourites', methods=['POST'])
def get_favourite_user():
    db = current_app.config["db"]
    users_collection = db.user_profile_data 
    required_fields = ["user_email","fav_email","add_fav"]  # Define required fields as needed
    data = request.json
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400
    if(data.get("add_fav")=="True"):
        result = users_collection.update_one(
                {"email": data.get("user_email")},
                {"$addToSet": {"favouriteRoommates": data.get("fav_email")}},
                upsert=True
            )
        if result.matched_count == 0:
            return jsonify({"message": "No matching document found"}), 404
        return jsonify({"message": "Favourite Added!"}), 200
    else:
        result = users_collection.update_one(
            {"email": data.get("user_email")},
            {"$pull": {"favouriteRoommates": data.get("fav_email")}}
        )
        if result.matched_count == 0:
            return jsonify({"message": "No matching document found"}), 404
        return jsonify({"message": "Favourite Deleted!"}), 200

# Retrieving favourite roommates data for one particular user to show on user profile
@user_bp.route('/favourite_roommates', methods=['GET'])
def get_roommate_names():
    db = current_app.config["db"]
    users_login = db["user_login_data"]
    users_profiles = db["user_profile_data"]
    required_fields = ["email"]  # Define required fields as needed
    data = request.json
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400
    user_details = users_profiles.find_one({"email": data["email"]})

    final_data=[]
    fav_names_data = {}
    for item in user_details["favouriteRoommates"]:
        roommate_login_data = users_login.find_one({"email": item})
        fav_names_data["name"] = roommate_login_data["name"]
        fav_names_data["gender"] = roommate_login_data["gender"]
        roommate_profile_data = users_profiles.find_one({"email": item})
        fav_names_data["age"] = roommate_profile_data["age"]
        fav_names_data["startDate"] = roommate_profile_data["startDate"]
        fav_names_data["title"] = roommate_profile_data["title"]
        fav_names_data["location"] = roommate_profile_data["preference"]["location"].copy()
        fav_names_data["budget"] = roommate_profile_data["budget"]
        fav_names_data["dietaryPreference"] = roommate_profile_data["dietaryPreference"]
        fav_names_data["drink"] = roommate_profile_data["drink"]
        fav_names_data["smoke"] = roommate_profile_data["smoke"]
        fav_names_data["email"] = roommate_profile_data["email"]
        final_data.append(fav_names_data)
    return jsonify(final_data), 200

# curl -X POST -H "Content-Type: application/json" -d '{"name": "Naman","email": "nmn@getmearoommate.com", "password": "abcd","phone":"1772756941","degree":"Master’s","dob":"1999-10-06","gender":"male","major":"Economics"}' http://127.0.0.1:5000/user/insert
# curl -X POST -H "Content-Type: application/json" -d '{"email": "mustafa@getmearoommate.com", "password": "test@123"}' http://127.0.0.1:5000/user/validate
# curl -X POST -H "Content-Type: application/json" -d '{"user_email": "admin@umass.edu", "fav_email": "patrick@getmearoommate.com","add_fav": "False"}' http://127.0.0.1:5000/user/favourites
# curl -X GET -H "Content-Type: application/json" http://127.0.0.1:5000/all_users/data
# curl -X GET -H "Content-Type: application/json" -d '{"email": "admin@umass.edu"}' http://127.0.0.1:5000/user/favourite_roommates
# curl -X GET -H "Content-Type: application/json" -d '{"email": "nancy@getmearoommate.com"}' http://127.0.0.1:5000/user/favourite_roommates