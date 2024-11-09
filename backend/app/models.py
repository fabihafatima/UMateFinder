from app import mongo

def find_item(name):
    return mongo.db.items.find_one({"name": name})
