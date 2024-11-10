# app/config.py
import os

class Config:
    MONGO_URI = os.getenv('DATABASE_URI')