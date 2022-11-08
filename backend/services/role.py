from extensions import db
from flask import Blueprint, jsonify, request
from models.role import Role
from models.skill import Skill
from services.utils import error

role_routes = Blueprint("roles", __name__)


# Get all Roles
@role_routes.route("/roles")
def get_all_roles():
    roles_list = Role.query.all()
    if len(roles_list):
        return jsonify(
            {"code": 200, "data": {"roles": [role.json() for role in roles_list]}}
        )
    return error("role", None, "no_records")


# Get a Role by Id
@role_routes.route("/roles/<int:role_id>")
def get_role_by_id(role_id):
    role = Role.query.filter_by(role_id=role_id).first()
    if role:
        return jsonify({"code": 200, "data": role.json()})
    return error("role", role_id, "no_records_by_identifier")


# Get role by Name
@role_routes.route("/roles/<string:role_name>")
def get_role_by_name(role_name):
    role = Role.query.filter_by(role_name=role_name).first()
    if role:
        return jsonify({"code": 200, "data": role.json()})
    return error("role", role_name, "no_records_by_identifier")


# Create Role
@role_routes.route("/roles/<string:role_name>", methods=["POST"])
def create_role(role_name):
    if Role.query.filter_by(role_name=role_name).first():
        error_data = {"role_name": role_name}
        return error("role", role_name, "exists", error_data)

    data = request.get_json()

    # Verify skills for creation
    skills = []
    request_skills_id = data.pop("skills", [])

    for skill_id in request_skills_id:
        skill = Skill.query.filter_by(skill_id=skill_id).first()
        if skill is None:
            return error("skill", skill_id, "no_records_by_identifier")
        skills.append(skill)

    try:
        role = Role(role_name, **data)  # Init role with basic data
        role.skills = skills  # Add skills to role
        db.session.add(role)
        db.session.commit()
    except Exception as e:
        print(e)
        return error("role", role_name, "internal_server_error_create")
    return jsonify(
        {
            "code": 201,
            "data": role.json(),
            "message": f"Role successfully created for Role role_name: {role_name}",
        }
    )


# Update role
@role_routes.route("/roles/<int:role_id>", methods=["PUT"])
def update_role(role_id):
    role = Role.query.filter(Role.role_id == role_id).first()
    if not role:
        return error("role", role_id, "no_records_by_identifier")

    data = request.get_json()

    # Verify skills for update
    skills = []
    request_skills_id = data.pop("skills", [])

    for skill_id in request_skills_id:
        skill = Skill.query.filter_by(skill_id=skill_id).first()
        if skill is None:
            return error("skill", skill_id, "no_records_by_identifier")
        skills.append(skill)

    # Update DB
    try:
        # Update general attributes
        for key in data.keys():
            setattr(role, key, data[key])
        role.skills = skills  # Update skills attributes
        db.session.commit()

    except Exception as e:
        print(e)
        return error("role", role_id, "internal_server_error_update")
    return jsonify(
        {
            "code": 200,
            "data": role.json(),
            "message": f"Successfully updated role {role_id}.",
        }
    )


# Delete Role
@role_routes.route("/roles/<int:role_id>", methods=["DELETE"])
def delete_role(role_id):
    role = Role.query.filter_by(role_id=role_id).first()
    if not (role):
        return error("role", role_id, "no_records_by_identifier")

    try:
        db.session.delete(role)
        db.session.commit()
    except Exception as e:
        print(e)
        return error("role", role_id, "internal_server_error_delete")

    return jsonify(
        {
            "code": 201,
            "role_id": role_id,
            "message": f"Successfully deleted role {role_id}.",
        }
    )


# Get Skills of Role
@role_routes.route("/roles/<int:role_id>/skills")
def get_skills_of_role(role_id):
    role = Role.query.filter_by(role_id=role_id).first()
    if not role:
        return error("role", role_id, "no_records_by_identifier")
    return jsonify(
        {
            "code": 200,
            "data": {
                "role_id": role_id,
                "skills": [skill.json() for skill in role.skills],
            },
        }
    )


# Update Skills of Role
@role_routes.route("/roles/<int:role_id>/skills", methods=["PUT"])
def update_skills_of_role(role_id):
    role = Role.query.filter(Role.role_id == role_id).first()
    if not role:
        return error("role", role_id, "no_records_by_identifier")

    data = request.get_json()
    remove_skills = []
    add_skills = []
    for r in data["remove"]:
        to_remove = Skill.query.filter_by(skill_id=r).first()
        if to_remove is None:
            return error("skill", r, "no_records_by_identifier")
        remove_skills.append(to_remove)
    for a in data["add"]:
        to_add = Skill.query.filter_by(skill_id=a).first()
        if to_add is None:
            return error("skill", r, "no_records_by_identifier")
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
        return error("role", role_id, "internal_server_error_update")

    return jsonify(
        {
            "code": 200,
            "data": {
                "role": role.json(),
                "skills": [skill.json() for skill in role.skills],
                "message": "Successfully updated skills in role.",
            },
        }
    )
