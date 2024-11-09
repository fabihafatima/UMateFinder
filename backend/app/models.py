from app import mongo

# def find_item(name):
#     return mongo.db.items.find_one({"name": name})

def find_preferences(email):
    return mongo.db.user_info.find_one({"email": email})
