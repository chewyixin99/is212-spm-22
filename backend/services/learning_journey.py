from __main__ import app, db
from flask import jsonify, request

from itsdangerous import json
from services.learning_journey_course import learning_journey_course
from services.course import Course

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

# Get all learning journeys
@app.route("/learning_journeys")
def get_all_learning_journeys():
    learning_journey_list = Learning_Journey.query.all()
    if len(learning_journey_list):
        return jsonify({
            "code": 200,
            "data": {
                "learning_journeys": [learning_journey.json() for learning_journey in learning_journey_list]
            }
        })
    return jsonify({
        "code": 404,
        "message": "There are no learning_journey records"
    })
<<<<<<< Updated upstream

@app.route("/learning_journeys/<int:staff_id>")
def get_learning_journey_by_id(staff_id):
    staff_learning_journeys = Learning_Journey.query.filter(Learning_Journey.staff_id == staff_id).all()
    if staff_learning_journeys:
        return jsonify({
            "code": 200,
            "data": [learning_journey.json() for learning_journey in staff_learning_journeys]
        })
    return jsonify({
        "code": 404,
        "message": "Staff does not have any learning journeys to be found. Please try again."
    })


@app.route("/learning_journeys/<int:learning_journey_id>/courses")
def get_courses_of_learning_journey(learning_journey_id):
    learning_journey = Learning_Journey.query.filter_by(learning_journey_id = learning_journey_id).first()
    if learning_journey:
        return jsonify({
            "code": 200,
            "data": learning_journey.json()
        })
    return jsonify({
        "code": 404,
        "message": "Learning journey cannot be found. Please try again."
    })
