from __main__ import app, db
from flask import jsonify, request

from .role_skill import *

class Role(db.Model):
    __tablename__ = 'role'

    role_id = db.Column(db.Integer, primary_key = True)
    role_name = db.Column(db.String(50))
    status = db.Column(db.String(50))
    skills = db.relationship('Skill', secondary = role_skill, backref = 'roles')

    def __init__(self,role_name, status):
        self.role_name = role_name
        self.status = status

    def json(self):
        return {
            "role_id": self.role_id,
            "role_name": self.role_name,
            "status": self.status
        }

#Get All Roles
@app.route("/roles")
def get_all_roles():
    roles_list = Role.query.all()
    if len(roles_list):
        return jsonify(
            {
               "code": 200,
               "data":{
                    "roles": [role.json() for role in roles_list]
               } 
            }
        )
    return jsonify({
        "code": 404,
        "message": "There are no role records."
    }), 404

#Get a Role by role_id
@app.route("/roles/<int:role_id>")
def get_role_by_id(role_id):
    role = Role.query.filter_by(role_id = role_id).first()
    if role:
        return jsonify(
            {
               "code": 200,
               "data": role.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Role cannot be found. Please try again."
        }
    ), 404

@app.route("/roles/<string:role_name>", methods=["POST"])
def create_role(role_name):
    if (Role.query.filter_by(role_name=role_name).first()):
        return jsonify({
            "code": 400,
            "data": {
                "role_name": role_name,
            },
            "message": f"Role for this role_name: {role_name} already exists."
        })
    
    data = request.get_json()

    try:
        role = Role(role_name, **data)
        db.session.add(role)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({
            "code": 500,
            "data": {
                "role_name": role_name
            },
            "message": f"An error occured while creating the role record"
        })
    return jsonify({
        "code": 201,
        "data": role.json(),
        "message": f"Role successfully created for Role role_name: {role_name}"
    })

@app.route("/roles/<int:role_id>", methods=["PUT"])
def update_role(role_id):
    role = Role.query.filter(Role.role_id == role_id).first()
    if not role:
        return jsonify({
            "code": 404,
            "message": f"Unable to update role {role_id}, role does not exist."
        })
    
    data = request.get_json()
    try:
        for key in data.keys():
            setattr(role, key, data[key])
            db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({
            "code": 500,
            "data": {
                "role_id": role_id
            },
            "message": f"An error occured while updating role with role_id: {role_id}"
        })
    return jsonify({
        "code": 200,
        "data": role.json(),
        "message": f"Successfully updated role {role_id}."
    })