# app.py
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash
# from pymongo.errors import DuplicateKeyError
# from bson.objectid import ObjectId
from models import MongoDB  # Import the MongoDB connection class

app = Flask(__name__)

# Initialize MongoDB connection
mongo_db = MongoDB(app)

@app.route('/api/user', methods=['POST'])
def create_user_profile():
    data = request.get_json()

    try:
        # Validate required fields
        required_fields = ["name", "age", "degree", "email", "password"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Extract and sanitize fields
        name = data['name']
        age = data['age']
        degree = data['degree']
        email = data['email']
        password = generate_password_hash(data['password'])  # Hash the password
        gender = data.get("gender", "other")  # Default to "other" if not provided

        # Validate gender
        if gender not in ["male", "female", "other"]:
            return jsonify({"error": "Gender must be one of 'male', 'female', or 'other'."}), 400

        # Check if email already exists
        user_collection = mongo_db.get_collection('user_profiles')
        existing_user = user_collection.find_one({"email": email})
        if existing_user:
            return jsonify({"error": "Username already exists"}), 400

        # Create the user profile document
        user_profile = {
            "name": name,
            "age": age,
            "degree": degree,
            "email": email,
            "password": password,
            "gender": gender
        }

        # Insert the document into MongoDB
        user_collection.insert_one(user_profile)

        return jsonify({"message": "User profile created successfully!"}), 201

    except DuplicateKeyError:
        return jsonify({"error": "Username already exists"}), 400

    except Exception as e:
        # Catch unexpected errors
        print(f"Unexpected error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True)