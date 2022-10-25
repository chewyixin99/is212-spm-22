from extensions import db
from flask import jsonify, request
from models.role_skill import role_skill

# fmt: off


class Role(db.Model):
    __tablename__ = 'role'

    role_id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(50))
    role_desc = db.Column(db.String(255))
    role_dept = db.Column(db.String(50))
    status = db.Column(db.String(50))
    skills = db.relationship('Skill', secondary=role_skill, backref='role')

    def __init__(self, role_name, role_desc, role_dept, status):
        self.role_name = role_name
        self.role_desc = role_desc
        self.role_dept = role_dept
        self.status = status

    def json(self):
        return {
            "role_id": self.role_id,
            "role_name": self.role_name,
            "role_desc": self.role_desc,
            "role_dept": self.role_dept,
            "status": self.status
        }
