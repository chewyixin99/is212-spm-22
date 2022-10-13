from flask import jsonify, request
from extensions import db

from models.role_skill import role_skill

class Role(db.Model):
    __tablename__ = 'role'

    role_id = db.Column(db.Integer, primary_key = True)
    role_name = db.Column(db.String(50))
    status = db.Column(db.String(50))
    skills = db.relationship('Skill', secondary = role_skill, backref = 'role')

    def __init__(self,role_name, status):
        self.role_name = role_name
        self.status = status

    def json(self):
        return {
            "role_id": self.role_id,
            "role_name": self.role_name,
            "status": self.status
        }
