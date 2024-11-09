from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from pymongo import MongoClient

import os

# Initialize PyMongo object (shared between files)
# mongo = PyMongo()

def create_app():
    app = Flask(__name__)

    # Load configuration from `config.py` or environment variables
    client = MongoClient("mongodb+srv://fabihafatima9:0gg8l7BVGxN8Q3oz@proddb.qs2us.mongodb.net/?retryWrites=true&w=majority&appName=prodDB")
    app.config["db"] = client.bumbleForRoommates
    # app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb+srv://fabihafatima9:0gg8l7BVGxN8Q3oz@proddb.qs2us.mongodb.net/?retryWrites=true&w=majority&appName=prodDB")
    
    # Initialize PyMongo with app
    # mongo.init_app(app)

    # db = mongo.bumbleForRoommates
    # user_profile_collection = db.user_profile_data
    # user_login_collection = db.user_login_data

    from .routes import user_bp
    app.register_blueprint(user_bp)

    return app