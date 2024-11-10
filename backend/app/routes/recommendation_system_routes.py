from flask import Blueprint, request, jsonify, current_app
from datetime import datetime
# Define blueprint for recommendation system
rs_bp = Blueprint('rs_bp', __name__, url_prefix='/rs')

def format_date(date_str):
    """
    Converts a date string from 'YYYY-MM-DD' to 'MMM-YYYY' format.
    If the input is invalid or empty, returns an empty string.
    """
    try:
        date = datetime.strptime(date_str, "%Y-%m-%d")
        return date.strftime("%b-%Y")
    except (ValueError, TypeError):
        return ""  # Return empty string if the date format is incorrect or missing

@rs_bp.route('/top-match', methods=['GET'])
def get_top_matches():
    """
    GET API to fetch the top 5 recommended roommates based on user email.
    Returns email, name (from user_login_data), age, startDate, title, preference.location, and gender.
    """
    try:
        email = request.args.get("email")
        if not email:
            return jsonify({"error": "Email parameter is required"}), 400

        db = current_app.config["db"]
        profile_collection = db['user_profile_data']
        login_collection = db['user_login_data']

        # Fetch user profile data by email (only recommendedRoommates field)
        user_profile = profile_collection.find_one({"email": email}, {"_id": 0})
        if not user_profile or 'recommendedRoommates' not in user_profile:
            return jsonify({"error": "No recommended roommates found"}), 404

        # Ensure recommendedRoommates is a list
        recommended_roommates = user_profile["recommendedRoommates"]
        favourite_roommates = user_profile.get("favouriteRoommates", [])
        if not isinstance(recommended_roommates, list):
            return jsonify({"error": "recommendedRoommates is not a list"}), 500

        # Fetch user login data by email (for gender and name)
        user_login = login_collection.find_one({"email": email}, {"_id": 0, "password": 0})
        if not user_login:
            return jsonify({"error": "User login data not found"}), 404

        # Get details of the recommended roommates (up to 5)
        top_recommended_roommates = recommended_roommates[:5]

        # Create a list to store the matching roommate data
        matched_roommates = []
        for roommate_email in top_recommended_roommates:
            
            # Fetch the profile data of each recommended roommate
            roommate_profile = profile_collection.find_one(
                {"email": roommate_email},
                { "email": 1, "age": 1, "startDate": 1, "title": 1, "preference.location": 1}
            )
            if roommate_profile:
                formatted_start_date = format_date(roommate_profile.get("startDate", ""))
                # Fetch the name and gender from user_login_data for each recommended roommate
                roommate_login = login_collection.find_one(
                    {"email": roommate_email},
                    {"_id": 0, "name": 1, "gender": 1}
                )
                # If the login data is found, add to the matched roommate data
                if roommate_login:
                    matched_roommate = {
                        "email": roommate_profile.get("email", ""),
                        "name": roommate_login.get("name", ""),
                        "age": roommate_profile.get("age", ""),
                        "startDate": formatted_start_date,
                        "title": roommate_profile.get("title", ""),
                        "location": roommate_profile.get("preference", {}).get("location", []),
                        "gender": roommate_login.get("gender", "other"),
                        "isFav": roommate_email in favourite_roommates
                    }
                    matched_roommates.append(matched_roommate)

        # Return matched roommates (top 5 or fewer)
        return jsonify(matched_roommates), 200

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
