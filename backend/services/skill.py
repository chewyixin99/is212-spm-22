from extensions import db
from flask import Blueprint, jsonify, request
from models.course import Course
from models.skill import Skill

skill_routes = Blueprint("skills", __name__)


# Get all Skills
@skill_routes.route("/skills")
def get_all_skills():
    skills_list = Skill.query.all()
    if len(skills_list):
        return jsonify(
            {"code": 200, "data": {"skills": [skill.json() for skill in skills_list]}}
        )
    return jsonify({"code": 404, "message": "There are no skill records"})


# Get Skill by Id
@skill_routes.route("/skills/<int:skill_id>")
def get_skill_by_id(skill_id):
    skill = Skill.query.filter_by(skill_id=skill_id).first()
    if skill:
        return jsonify({"code": 200, "data": skill.json()})
    return jsonify({"code": 404, "message": "Skill cannot be found. Please try again."})


# Get Skill by Name
@skill_routes.route("/skills/<string:skill_name>")
def get_skill_by_skill_name(skill_name):
    skill = Skill.query.filter_by(skill_name=skill_name).first()
    if skill:
        return jsonify({"code": 200, "data": skill.json()})
    return jsonify({"code": 404, "message": "Skill cannot be found. Please try again."})


# Create Skill
@skill_routes.route("/skills/<string:skill_name>", methods=["POST"])
def create_skill(skill_name):
    if Skill.query.filter_by(skill_name=skill_name).first():
        return jsonify(
            {
                "code": 400,
                "data": {
                    "skill_name": skill_name,
                },
                "message": f"Skill for this skill_name: {skill_name} already exists.",
            }
        )

    data = request.get_json()

    try:
        skill = Skill(skill_name, data["skill_desc"], data["status"])
        for course_id in data["courses"]:
            course = Course.query.filter_by(course_id=course_id).first()
            skill.courses.append(course)

        # ! CANNOT add role to skills
        # for role_name in data["roles"]:
        #     role = Role.query.filter_by(role_name=role_name).first()
        #     skill.roles.append(role)

        db.session.add(skill)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify(
            {
                "code": 500,
                "data": {"skill_name": skill_name},
                "message": "An error occurred while creating the skill record",
            }
        )
    return jsonify(
        {
            "code": 201,
            "data": skill.json(),
            "message": f"Skill successfully created for skill_name: {skill_name}",
        }
    )


# Update Skill
@skill_routes.route("/skills/<int:skill_id>", methods=["PUT"])
def update_skill(skill_id):
    skill = Skill.query.filter(Skill.skill_id == skill_id).first()
    if not skill:
        return jsonify(
            {
                "code": 404,
                "message": f"Unable to update skill {skill_id}, skill does not exist.",
            }
        )

    data = request.get_json()
    remove_courses = []
    add_courses = []

    for r in data["remove"]:
        to_remove = Course.query.filter_by(course_id=r).first()
        if to_remove is None:
            return jsonify({"code": 404, "message": f"Course id {r} does not exist."})
        remove_courses.append(to_remove)
    for a in data["add"]:
        to_add = Course.query.filter_by(course_id=a).first()
        if to_add is None:
            return jsonify({"code": 404, "message": f"Course id {a} does not exist."})
        add_courses.append(to_add)

    try:
        setattr(skill, "status", data["status"])
        setattr(skill, "skill_desc", data["skill_desc"])
        for c in remove_courses:
            if c in skill.courses:
                skill.courses.remove(c)
        for c in add_courses:
            if c not in skill.courses:
                skill.courses.append(c)
        db.session.commit()

    except Exception as e:
        print(e)
        return jsonify(
            {
                "code": 500,
                "data": {"skill_id": skill_id},
                "message": f"An error occurred while updating skill with skill_id: {skill_id}",
            }
        )
    return jsonify(
        {
            "code": 200,
            "data": skill.json(),
            "message": f"Successfully updated skill {skill_id}.",
        }
    )


# Delete Skill
@skill_routes.route("/skills/<int:skill_id>", methods=["DELETE"])
def delete_skill(skill_id):
    skill = Skill.query.filter_by(skill_id=skill_id).first()
    if not (skill):
        return jsonify(
            {
                "code": 404,
                "data": {"skill_id": skill_id},
                "message": f"Skill {skill_id} does not exist.",
            }
        )

    try:
        db.session.delete(skill)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify(
            {
                "code": 500,
                "data": {"skill_id": skill_id},
                "message": "An error occurred while deleting the skill.",
            }
        )

    return jsonify(
        {
            "code": 201,
            "skill_id": skill_id,
            "message": f"Successfully deleted skill {skill_id}.",
        }
    )


# Get Roles of Skill
@skill_routes.route("/skills/<int:skill_id>/roles")
def get_roles_of_skill(skill_id):
    skill = Skill.query.filter_by(skill_id=skill_id).first()
    if not skill:
        return jsonify(
            {"code": 404, "message": "Skill cannot be found. Please try again."}
        )
    return jsonify(
        {
            "code": 200,
            "data": {
                "skill_id": skill_id,
                "roles": [role.json() for role in skill.roles],
            },
        }
    )


# Get Courses of Skill
@skill_routes.route("/skills/<int:skill_id>/courses")
def get_courses_of_skill(skill_id):
    skill = Skill.query.filter_by(skill_id=skill_id).first()
    if not skill:
        return jsonify(
            {"code": 404, "message": "Skill cannot be found. Please try again."}
        )
    return jsonify(
        {
            "code": 200,
            "data": {
                # "skill": skill.json(),
                "skill_id": skill_id,
                "courses": [course.json() for course in skill.courses],
            },
        }
    )


# Get Staffs that COMPLETED this skill
@skill_routes.route("/skills/<int:skill_id>/staffs")
def get_staffs_of_skill(skill_id):
    skill = Skill.query.filter_by(skill_id=skill_id).first()
    if not skill:
        return jsonify(
            {"code": 404, "message": "Skill cannot be found. Please try again."}
        )
    return jsonify(
        {
            "code": 200,
            "data": {
                # "skill": skill.json(),
                "skill_id": skill_id,
                "staffs": [staff.json() for staff in skill.staffs],
            },
        }
    )
