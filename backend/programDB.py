import data.mongo_setup as mongo_setup
from flask import Flask
from flask_pymongo import PyMongo

def main():
    mongo_setup.global_init()




if __name__ == '__main__':
    main()