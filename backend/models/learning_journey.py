from flask import jsonify, request
from extensions import db

from models.learning_journey_course import learning_journey_course

class Learning_Journey(db.Model):
    __tablename__ = 'learning_journey'

    learning_journey_id = db.Column(db.Integer, primary_key = True)
    learning_journey_name = db.Column(db.String(50))
    role_id = db.Column(db.Integer, db.ForeignKey('role.role_id'))
    staff_id = db.Column(db.Integer, db.ForeignKey('staff.staff_id'))
    courses = db.relationship('Course', secondary = learning_journey_course, backref = 'learning_journey')

    def __init__(self, learning_journey_name, role_id, staff_id):
        self.learning_journey_name = learning_journey_name
        self.role_id = role_id
        self.staff_id = staff_id
    
    def json(self):
        return {
            "learning_journey_id": self.learning_journey_id,
            "learning_journey_name": self.learning_journey_name,
            "role_id": self.role_id,
            "staff_id": self.staff_id
        }
