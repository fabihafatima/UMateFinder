from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from pymongo import MongoClient

import os

# Initialize PyMongo object (shared between files)
# mongo = PyMongo()

def create_app():
    app = Flask(__name__)

    CORS(app, 
         resources={
             r"/*": {
                 "origins": ["*"],
                 "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                 "allow_headers": ["Content-Type", "Authorization"],
                 "expose_headers": ["Content-Range", "X-Content-Range"],
                 "supports_credentials": True,
             }
         })
    
    # Load configuration from `config.py` or environment variables
    client = MongoClient("mongodb+srv://fabihafatima9:0gg8l7BVGxN8Q3oz@proddb.qs2us.mongodb.net/?retryWrites=true&w=majority&appName=prodDB")
    app.config["db"] = client.bumbleForRoommates
    
    # Initialize PyMongo with app
    # mongo.init_app(app)

    from .routes import user_bp, preference_bp, all_users_bp, rs_bp
    app.register_blueprint(user_bp)
    app.register_blueprint(preference_bp)
    app.register_blueprint(all_users_bp)
    app.register_blueprint(rs_bp)

    return app