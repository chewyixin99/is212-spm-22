from flask import Blueprint, jsonify, request
from extensions import db
from models.role import Role

role_routes = Blueprint('roles', __name__)

#Get All Roles
@role_routes.route("/roles")
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
@role_routes.route("/roles/<int:role_id>")
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

@role_routes.route("/roles/<string:role_name>", methods=["POST"])
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

@role_routes.route("/roles/<int:role_id>", methods=["PUT"])
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

@role_routes.route("/roles/<int:role_id>/skills")
def get_skills_of_role(role_id):
    role = Role.query.filter_by(role_id = role_id).first()
    if not role:
        return jsonify({
            "code": 404,
            "message": "Role cannot be found. Please try again."
        })
    return jsonify({
        "code": 200,
        "data": {
            "role_id": role_id,
            "skills": [skill.json() for skill in role.skills]
        }
    })

@role_routes.route("/roles/<int:role_id>/skills", methods=["PUT"])
def update_skills_of_role(role_id):
    role = Role.query.filter(Role.role_id == role_id).first()
    if not role:
        return jsonify({
            "code": 404,
            "message": f"Unable to update skills of role {role_id}, role does not exist."
        })
    data = request.get_json()
    remove_skills = []
    add_skills = []
    for r in data["remove"]:
        to_remove = Skill.query.filter_by(skill_id = r).first()
        if to_remove == None:
            return jsonify({
                "code": 404,
                "message": f"Skill id {r} does not exist."
            })
        remove_skills.append(to_remove)
    for a in data["add"]:
        to_add = Skill.query.filter_by(skill_id = a).first()
        if to_add == None:
            return jsonify({
                "code": 404,
                "message": f"Skill id {a} does not exist."
            })
        add_skills.append(to_add)

    try:
        for s in remove_skills:
            if s in role.skills:
                role.skills.remove(s)
        for s in add_skills:
            if s not in role.skills:
                role.skills.append(s)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({
            "code": 500,
            "data": data,
            "message": f"An error occured while updating role with data."
        })

    return jsonify({
        "code": 200,
        "data": {
            "role": role.json(),
            "skills": [skill.json() for skill in role.skills],
            "message": "Successfully updated skills in role."
        }
    })