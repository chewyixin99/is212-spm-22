from extensions import db
from flask import jsonify, request
from models.role import Role
from models.role_skill import role_skill
from models.skill_course import skill_course
from models.staff_course import Staff_Course
from models.staff_skill import Staff_Skill

# fmt: off


class Skill(db.Model):
    __tablename__ = 'skill'

    skill_id = db.Column(db.Integer, primary_key=True)
    skill_name = db.Column(db.String(50))
    skill_desc = db.Column(db.String(255))
    status = db.Column(db.String(50))
    roles = db.relationship('Role', secondary=role_skill, backref='skill', viewonly=True)
    courses = db.relationship('Course', secondary=skill_course, backref='skill')
    staffs = db.relationship("Staff", secondary=Staff_Skill, backref="skill", viewonly=True)

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
