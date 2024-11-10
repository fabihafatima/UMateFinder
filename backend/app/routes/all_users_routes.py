from flask import Blueprint, request, jsonify, current_app

all_users_bp = Blueprint('all_users_bp', __name__, url_prefix='/all_users')

def serialize_mongo_document(doc):
    """Converts MongoDB ObjectId to string for JSON serialization."""
    if '_id' in doc:
        doc['_id'] = str(doc['_id'])
    doc.pop('password', None)
    return doc

@all_users_bp.route('/data', methods=['GET'])
def get_all_users():
    db = current_app.config["db"]
    users_login = db["user_login_data"]
    users_profiles = db["user_profile_data"]
    
    login_data = [serialize_mongo_document(item) for item in users_login.find()]
    profile_data = [serialize_mongo_document(item) for item in users_profiles.find()]

    profile_data_dict = {item['email']: item for item in profile_data}

    merged_data = []
    for item in login_data:
        merged_item = item.copy()  # Copy original item to avoid modification
        email = item.get('email')
        if email in profile_data_dict:
            merged_item.update(profile_data_dict[email])  # Merge data from both collections
        merged_data.append(merged_item)

    return jsonify(merged_data), 200
