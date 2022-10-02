from __main__ import app, db
from flask import jsonify

class Course(db.Model):
    __tablename__ = 'course'

    course_id = db.Column(db.String(20), primary_key = True)
    course_name = db.Column(db.String(50))
    course_desc = db.Column(db.String(255))
    course_status = db.Column(db.String(15))
    course_type = db.Column(db.String(10))
    course_category = db.Column(db.String(50))


    def __init__(self, course_name, course_desc, course_status, course_type, course_category):
        self.course_name = course_name
        self.course_desc = course_desc
        self.course_status = course_status
        self.course_type = course_type
        self.course_category = course_category

    def json(self):
        return {"course_id": self.course_id,
                "course_name": self.course_name,
                "course_desc": self.course_desc,
                "course_status": self.course_status,
                "course_type": self.course_type,
                "course_category": self.course_category}

#Get All Courses
@app.route("/courses")
def get_all_courses():
    courses_list = Course.query.all()
    if len(courses_list):
        return jsonify(
            {
               "code": 200,
               "data":{
                    "courses": [course.json() for course in courses_list]
               } 
            }
        )
    return jsonify({
        "code": 404,
        "message": "There are no role records."
    }), 404

@app.route("/courses/<string:course_id>")
def get_course_by_id(course_id):
    course = Course.query.filter(Course.course_id == course_id).first()
    if course:
        return jsonify(
            {
               "code": 200,
               "data": course.json()
            }
        )
    return jsonify({
        "code": 404,
        "message": "Course cannot be found. Please try again."
    }), 404