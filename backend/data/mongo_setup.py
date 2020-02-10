import mongoengine
from pymongo import MongoClient

def global_init():
    mongoengine.register_connection(alias='core', name='Capstone-database')
