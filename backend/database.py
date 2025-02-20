from flask_pymongo import PyMongo
from config import Config

mongo = PyMongo()

def init_db(app):
    
    app.config['MONGO_URI'] = Config.MONGO_URI
    mongo.init_app(app)

def get_users_collection():
    
    if not hasattr(mongo, "db"):
        raise Exception("MongoDB is not initialized. Call init_db(app) first.")
    return mongo.db.users

