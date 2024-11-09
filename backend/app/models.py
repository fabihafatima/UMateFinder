from app import mongo

# def find_item(name):
#     return mongo.db.items.find_one({"name": name})

def find_user_data(email):
    return mongo.bumbleForRoommates.user_profile_data.find_one({"email": email})

def find_login_data(email):
    return mongo.bumbleForRoommates.user_login_data.find_one({"email": email})