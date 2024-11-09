from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import os

# Initialize PyMongo object (shared between files)
mongo = PyMongo()

def create_app():
    app = Flask(__name__)

    # Load configuration from `config.py` or environment variables
    app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb+srv://fabihafatima9:0gg8l7BVGxN8Q3oz@proddb.qs2us.mongodb.net/?retryWrites=true&w=majority&appName=prodDB")
    
    # Initialize PyMongo with app
    mongo.init_app(app)

    # Define basic routes (API endpoints)

    @app.route('/userPreferences', methods=['GET'])
    def get_preferences():
        # Fetch all items from MongoDB
        items = list(mongo.db.items.find({}, {"_id": 0}))
        return jsonify(items), 200

    @app.route('/item', methods=['POST'])
    def add_item():
        # Add a new item to MongoDB
        data = request.json
        if not data or not 'name' in data:
            return jsonify({"error": "Bad request"}), 400
        mongo.db.items.insert_one({"name": data['name']})
        return jsonify({"message": "Item added"}), 201

    @app.route('/item/<string:name>', methods=['DELETE'])
    def delete_item(name):
        # Delete an item by name from MongoDB
        result = mongo.db.items.delete_one({"name": name})
        if result.deleted_count == 0:
            return jsonify({"error": "Item not found"}), 404
        return jsonify({"message": "Item deleted"}), 200

    return app