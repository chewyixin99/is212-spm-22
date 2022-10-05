from __main__ import app, db
from flask import jsonify, request

from services.skill_course import skill_course

class Course(db.Model):
    __tablename__ = 'course'

    course_id = db.Column(db.String(20), primary_key = True)
    course_name = db.Column(db.String(50))
    course_desc = db.Column(db.String(255))
    course_status = db.Column(db.String(15))
    course_type = db.Column(db.String(10))
    course_category = db.Column(db.String(50))
    skills = db.relationship('Skill', secondary = skill_course, backref = 'course', viewonly=True)


    def __init__(self, course_id, course_name, course_desc, course_status, course_type, course_category):
        self.course_id = course_id
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

@app.route("/courses/<string:course_id>", methods=["POST"])
def create_course(course_id):
    if (Course.query.filter_by(course_id=course_id).first()):
        # exist, return 400
        return jsonify({
            "code": 400,
            "data": {
                "course_id": course_id
            },
            "message": f"Course for this course_id: {course_id} already exists."
        })
    
    data = request.get_json()

    try:
        course = Course(course_id, **data)
        db.session.add(course)
        db.session.commit()
    except Exception as e:
        # failed to add, return 500
        print(e)
        return jsonify({
            "code": 500,
            "data": {
                "course_id": course_id
            },
            "message": f"An error occured while creating the course record."
        })
    # success, return 200
    return jsonify({
        "code": 201,
        "data": course.json(),
        "message": f"Course successfully created for course {course_id}"
    })

@app.route("/courses/<string:course_id>", methods=["PUT"])
def update_course(course_id):
    course = Course.query.filter(Course.course_id == course_id).first()
    if not course:
        return jsonify({
            "code": 404,
            "message": f"Unable to update course {course_id}, course does not exist."
        })
    
    data = request.get_json()
    try:
        for key in data.keys():
            setattr(course, key, data[key])
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({
            "code": 500,
            "data": {
                "course_id": course_id
            },
            "message": "An error occured while updating the course."
        })
    return jsonify({
        "code": 200,
        "data": course.json(),
        "message": f"Successfully updated course {course_id}."
    })

@app.route("/courses/<string:course_id>/skills")
def get_skills_of_course(course_id):
    course = Course.query.filter_by(course_id = course_id).first()
    if not course:
        return jsonify({
            "code": 404,
            "message": "Course cannot be found. Please try again."
        })
    return jsonify({
        "code": 200,
        "data": {
            "course_id": course_id,
            "skills": [skill.json() for skill in course.skills]
        }
    })
