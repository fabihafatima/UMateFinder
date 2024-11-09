from flask import Blueprint, request, jsonify, current_app

user_bp = Blueprint('user_bp', __name__, url_prefix='/user')

#Add password and email validation and add return only email and password
@user_bp.route('/<string:email>', methods=['GET'])
def get_user(email):
    db = current_app.config["db"]
    users_collection = db.user_login_data  # Replace with your collection name
    user_details = users_collection.find_one({"email": email})
    if not user_details:
        return jsonify({"error": "User not found"}), 404
    user_details["_id"] = str(user_details["_id"])
    return jsonify(user_details), 200

# @user_bp.route('/insert', methods=['POST'])
# def insert_user():
#     db = current_app.config["db"]
#     users_collection = db.user_login_data  # Replace with your collection name
#     data = request.json
#     required_fields = ["name", "email", "password", "phone", "degree", "dob", "gender", "major"]  # Define required fields as needed
#     if not data:
#         return jsonify({"error": "User does not exist"}), 400
#     for field in required_fields:
#         if field not in data:
#             return jsonify({"error": f"{field} is required"}), 400
#     user_id = users_collection.insert_one(data).inserted_id
#     # user_details["_id"] = str(user_details["_id"])
#     return jsonify({"message": "User added successfully", "user_id" : str(user_id)}), 200