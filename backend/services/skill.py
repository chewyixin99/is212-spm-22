from __main__ import app, db
from flask import jsonify, request

from .skill_course import *

class Skill(db.Model):
    __tablename__ = 'skill'

    skill_id = db.Column(db.Integer, primary_key = True)
    skill_name = db.Column(db.String(50))
    skill_desc = db.Column(db.String(255))
    status = db.Column(db.String(50))
    courses = db.relationship('Course', secondary = skill_course, backref = 'skills')

    def __init__(self, skill_name, skill_desc, status):
        self.skill_name = skill_name
        self.skill_desc = skill_desc
        self.status = status
    
    def json(self):
        return {
            "skill_id": self.skill_id,
            "skill_name": self.skill_name,
            "skill_desc": self.skill_desc,
            "status": self.status
        }

@app.route("/skills")
def get_all_skills():
    skills_list = Skill.query.all()
    if len(skills_list):
        return jsonify({
            "code": "200",
            "data": {
                "skills": [skill.json() for skill in skills_list]
            }
        })
    return jsonify({
        "code": 404,
        "message": "There are no skill records"
    })

@app.route("/skills/<int:skill_id>")
def get_skill_by_id(skill_id):
    skill = Skill.query.filter_by(skill_id = skill_id).first()
    if skill:
        return jsonify({
            "code": 200,
            "data": skill.json()
        })
    return jsonify({
        "code": 404,
        "message": "Skill cannot be found. Please try again."
    })


@app.route("/skills/<string:skill_name>", methods=["POST"])
def create_skill(skill_name):
    if (Skill.query.filter_by(skill_name=skill_name).first()):
        return jsonify({
            "code": 400,
            "data": {
                "skill_name": skill_name,
            },
            "message": f"Skill for this skill_name: {skill_name} already exists."
        })
    
    data = request.get_json()

    try:
        skill = Skill(skill_name, **data)
        db.session.add(skill)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({
            "code": 500,
            "data": {
                "skill_name": skill_name
            },
            "message": f"An error occured while creating the skill record"
        })
    return jsonify({
        "code": 201,
        "data": skill.json(),
        "message": f"Skill successfully created for skill_name: {skill_name}"
    })

@app.route("/skills/<int:skill_id>", methods=["PUT"])
def update_skill(skill_id):
    skill = Skill.query.filter(Skill.skill_id == skill_id).first()
    if not skill:
        return jsonify({
            "code": 404,
            "message": f"Unable to update skill {skill_id}, skill does not exist."
        })
    
    data = request.get_json()
    try:
        for key in data.keys():
            setattr(skill, key, data[key])
            db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({
            "code": 500,
            "data": {
                "skill_id": skill_id
            },
            "message": f"An error occured while updating skill with skill_id: {skill_id}"
        })
    return jsonify({
        "code": 200,
        "data": skill.json(),
        "message": f"Successfully updated skill {skill_id}."
    })