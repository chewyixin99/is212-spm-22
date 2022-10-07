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

@app.route("/learning_journeys")
def get_all_learning_journeys():
    learning_journey_list = Learning_Journey.query.all()
    if len(learning_journey_list):
        return jsonify({
            "code": "200",
            "data": {
                "learning_journeys": [learning_journey.json() for learning_journey in learning_journey_list]
            }
        })
    return jsonify({
        "code": 404,
        "message": "There are no learning_journey records"
    })

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
    if not learning_journey:
        return jsonify({
            "code": 404,
            "message": "Learning Journey cannot be found. Please try again."
        })
    return jsonify({
        "code": 200,
        "data": {
            "learning_journey": learning_journey_id,
            "courses": [course.json() for course in learning_journey.course]
        }
    })


@app.route("/learning_journeys/<int:learning_journey_id>/courses/edit", methods=["PUT"])
def delete_course_in_learning_journey(learning_journey_id):
    learning_journey = Learning_Journey.query.filter_by(learning_journey_id = learning_journey_id).first()
    if not learning_journey:
        return jsonify({
            "code": 404,
            "message": "Learning Journey cannot be found. Please try again."
        })

    data = request.get_json()
    remove_courses = []
    add_courses = []

    for r in data["remove"]:
        to_remove = Course.query.filter_by(course_id = r).first()
        if to_remove == None:
            return jsonify({
                "code": 404,
                "message": f"Course id {r} does not exist."
            })
        remove_courses.append(to_remove)

    for a in data["add"]:
        to_add = Course.query.filter_by(course_id = a).first()
        if to_add == None:
            return jsonify({
                "code": 404,
                "message": f"Course id {a} does not exist."
            })
        add_courses.append(to_add)

    try:
        for c in remove_courses:
            if c not in learning_journey.course:
                return jsonify({
                    "code": 401,
                    "message": f"{c} is not in Learning Journey {learning_journey_id}. Please try again."
                })
            learning_journey.courses.remove(c)
        for c in add_courses:
            if c in learning_journey.course:
                return jsonify({
                    "code": 401,
                    "message": f"{c} is already in Learning Journey {learning_journey_id}. Please try again."
                })
            learning_journey.courses.append(c)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({
            "code": 500,
            "data": data,
            "message": f"An error occured while updating the courses with data."
        })
    
    return jsonify({
        "code": 200,
        "data":{
            "learning_journey": learning_journey_id,
            "courses": [course.json() for course in learning_journey.course],
            "message": f"Successfully updated courses from the Learning Journey {learning_journey_id}."
        }
        
    })