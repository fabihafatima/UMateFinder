class User:
    def __init__(self, db):
        self.collection = db.user_login_data

    def get_user_by_id(self, email):
        return self.collection.find_one({"email": email})

    def add_user(self, email):
        return self.collection.insert_one(email)