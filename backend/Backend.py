from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import flask_sqlalchemy as sqlalchemy
from sqlalchemy import desc, distinct
import datetime
from passlib.hash import pbkdf2_sha256

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///backend.db'
#app.config['SQLALCHEMY_ECHO'] = True

db = sqlalchemy.SQLAlchemy(app)
base_url = '/api/'


class Users(db.Model):
    __tablename__ = 'users'
    userID = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    uwID = db.Column(db.String(20))
    auth_level = db.Column(db.String(10)) #Unit, subUnit or subsubUnit
    accessTo = db.Column(db.Integer, db.ForeignKey('units.unitID'), nullable=False)

class Units(db.Model):
    __tablename__ = 'units'
    unitID = db.Column(db.Integer, primary_key=True)
    UnitName = db.Column(db.String(50))
    user_ref = db.relationship('Users', backref='units_users', lazy=True)
    subunits = db.relationship('SubUnits', backref='units_subunits', lazy=True)

class SubUnits(db.Model):
    __tablename__ = 'subunits'
    subunitID = db.Column(db.Integer, primary_key=True)
    SubUnitName = db.Column(db.String(50))
    units = db.Column(db.Integer, db.ForeignKey('units.unitID'), nullable=False)
    subsubunits = db.relationship('SubSubUnits', backref='subunits_subsubunits', lazy=True)

class SubSubUnits(db.Model):
    __tablename__ = 'subsubunits'
    subsubunitID = db.Column(db.Integer, primary_key=True)
    SubSubUnitName = db.Column(db.String(50))
    subUnits = db.Column(db.Integer, db.ForeignKey('subunits.subunitID'), nullable=False)



#this will add Units to the database
@app.route(base_url+'addUnit', methods=['POST'])
def addUnit():
    Units_ = Units(**request.json)
    db.session.add(Units_)
    db.session.commit()

    db.session.refresh(Units_)

    return jsonify({"status": True}), 200

#this will add Sub Units to the database
@app.route(base_url+'addSubUnit', methods=['POST'])
def addSubUnit():
    #extract object for passed unitName
    Unit_obj = Units.query.filter_by(UnitName=request.get_json().get('UnitName')).first()
    if(Unit_obj == None):
        return jsonify({"status": False}), 200

    SubUnit_ = SubUnits(SubUnitName=request.get_json().get('SubUnitName'),units_subunits=Unit_obj)
    db.session.add(SubUnit_)
    db.session.commit()

    db.session.refresh(SubUnit_)

    return jsonify({"status": True}), 200

#this will add Sub Sub Units to the database
@app.route(base_url+'addSubSubUnit', methods=['POST'])
def addSubSubUnit():
    #extract object for passed unitName
    SubUnit_obj = SubUnits.query.filter_by(SubUnitName=request.get_json().get('SubUnitName')).first()
    if(SubUnit_obj == None):
        return jsonify({"status": False}), 200

    SubSubUnit_ = SubSubUnits(SubSubUnitName=request.get_json().get('SubSubUnitName'),subunits_subsubunits=SubUnit_obj)
    db.session.add(SubSubUnit_)
    db.session.commit()

    db.session.refresh(SubSubUnit_)

    return jsonify({"status": True}), 200



#this will add Users
@app.route(base_url+'addUsers', methods=['POST'])
def addUsers():
    obj = None
    authLevel = request.get_json().get('auth_level')
    if(authLevel == "Unit"):
        obj = Units.query.filter_by(UnitName=request.get_json().get('UnitName')).first()
    elif(authLevel == "SubUnit"):
        obj = SubUnits.query.filter_by(SubUnitName=request.get_json().get('SubUnitName')).first()
    elif(authLevel == "SubSubUnit"):
        obj = SubSubUnits.query.filter_by(SubSubUnitName=request.get_json().get('SubSubUnitName')).first()

    if(obj == None):
        return jsonify({"status": False}), 200

    #check if any user with same UWID exists
    User_obj = Users.query.filter_by(uwID=request.get_json().get('uwID')).first()

    if(User_obj):
        return jsonify({"status": False, "Message": "User with same UW ID exists"}), 200

    #else less add the user !
    Users_ = Users(name=request.get_json().get('name'),email=request.get_json().get('email'),
                   uwID=request.get_json().get('uwID'),auth_level=request.get_json().get('uwID'),units_users=obj)

    db.session.add(Users_)
    db.session.commit()

    db.session.refresh(Users_)


    return jsonify({"status": True}), 200



def main():
    db.create_all() # creates the tables you've provided
    app.run()  # runs the Flask application


if __name__ == '__main__':
    main()

