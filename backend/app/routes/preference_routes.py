# routes/preference.py

from flask import Blueprint, request, jsonify, current_app

# Define the Blueprint for preference routes
preference_bp = Blueprint('preference_bp', __name__, url_prefix='/user-details')

@preference_bp.route("/<string:email>", methods=["GET"])
def get_preferences(email):
    """
    GET API to fetch user preferences by joining user_profile_data and user_login_data
    collections based on email, excluding the password field.
    """
    try:
        db = current_app.config["db"]
        # Get MongoDB collections
        profile_collection = db['user_profile_data']
        login_collection = db['user_login_data']

        # Find matching documents in each collection
        profile_data = profile_collection.find_one({"email": email}, {"_id": 0, "createdAt" :0, "updatedAt":0})
        login_data = login_collection.find_one({"email": email}, {"_id": 0, "password": 0})

        # Return 404 if either document is missing
        if not login_data:
            return jsonify({"error": "Login data not found"}), 404

        # If profile_data is missing, return only login_data
        if not profile_data:
            return jsonify(login_data), 200

        # Merge and return profile and login data
        combined_data = {**login_data, **profile_data}
        return jsonify(combined_data), 200

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


@preference_bp.route("/", methods=["POST"])
def post_preferences():
    """
    POST API to add user preferences into user_profile_data and user_login_data collections
    """
    try:
        data = request.get_json()  
        if not data:
            return jsonify({"error": "Missing JSON request body"}), 400
        db = current_app.config["db"]
        # Separate profile and login data
        login_fields = ["email", "name", "password", "phone", "degree", "dob", "gender", "major"]
        login_data = {key: data[key] for key in login_fields if key in data}

        profile_fields = [
            "email", "courseDuration", "homeTown", "dietaryPreference",
            "drink", "smoke", "cleanliness", "budget", "identification", "socialMedia", "hobbies",
            "cook", "preference", "profileImages", "favouriteRoommates", "isRoommateFound", "startDate", "endDate", 
        ]
        profile_data = {key: data[key] for key in profile_fields if key in data}

        #call recommendation model and store return for recommendationRoomates
        # Get MongoDB collections
        profile_collection = db['user_profile_data']
        login_collection = db['user_login_data']


        # Upsert for login data
        login_collection.update_one(
            {"email": login_data.get("email")},
            {"$set": login_data},
            upsert=True
        )

        # Upsert for profile data
        profile_collection.update_one(
            {"email": profile_data.get("email")},
            {"$set": profile_data},
            upsert=True
        )

        return jsonify({"message": "User profile and preferences stored successfully"}), 201



    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
