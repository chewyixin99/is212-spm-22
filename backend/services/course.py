from extensions import db
from flask import Blueprint, jsonify, request
from models.course import Course
from models.learning_journey_course import learning_journey_course
from models.skill_course import skill_course
from services.utils import error

# from services.learning_journey import Learning_Journey

course_routes = Blueprint("courses", __name__)


# Get all Courses
@course_routes.route("/courses")
def get_all_courses():
    courses_list = Course.query.all()
    if len(courses_list):
        return jsonify(
            {
                "code": 200,
                "data": {"courses": [course.json() for course in courses_list]},
            }
        )
    return error("course", None, "no_records")


# Get Course by Id
@course_routes.route("/courses/<string:course_id>")
def get_course_by_id(course_id):
    course = Course.query.filter(Course.course_id == course_id).first()
    if course:
        return jsonify({"code": 200, "data": course.json()})
    return error("course", course_id, "no_records_by_identifier")


# Create Course
@course_routes.route("/courses/<string:course_id>", methods=["POST"])
def create_course(course_id):
    if Course.query.filter_by(course_id=course_id).first():
        # already exists, return 400
        error_data = {"course_id": course_id}
        return error("course", course_id, "exists", error_data)

    data = request.get_json()

    try:
        course = Course(course_id, **data)
        db.session.add(course)
        db.session.commit()
    except Exception as e:
        # failed to add, return 500
        print(e)
        return error("course", course_id, "internal_server_error_create")
    # success, return 200
    return jsonify(
        {
            "code": 201,
            "data": course.json(),
            "message": f"Course successfully created for course {course_id}",
        }
    )


# Update Course
@course_routes.route("/courses/<string:course_id>", methods=["PUT"])
def update_course(course_id):
    course = Course.query.filter(Course.course_id == course_id).first()
    if not course:
        return error("course", course_id, "no_records_by_identifier")

    data = request.get_json()
    try:
        for key in data.keys():
            setattr(course, key, data[key])
        db.session.commit()
    except Exception as e:
        print(e)
        return error("course", course_id, "internal_server_error_update")
    return jsonify(
        {
            "code": 200,
            "data": course.json(),
            "message": f"Successfully updated course {course_id}.",
        }
    )


# Get Skills of Course
@course_routes.route("/courses/<string:course_id>/skills")
def get_skills_of_course(course_id):
    course = Course.query.filter_by(course_id=course_id).first()
    if not course:
        return error("course", course_id, "no_records_by_identifier")
    return jsonify(
        {
            "code": 200,
            "data": {
                "course_id": course_id,
                "skills": [skill.json() for skill in course.skills],
            },
        }
    )


# Get Staffs that COMPLETED this course
@course_routes.route("/courses/<string:course_id>/staffs")
def get_staffs_of_course(course_id):
    course = Course.query.filter_by(course_id=course_id).first()
    if not course:
        return error("course", course_id, "no_records_by_identifier")
    return jsonify(
        {
            "code": 200,
            "data": {
                "course_id": course_id,
                "staffs": [staff.json() for staff in course.staffs],
            },
        }
    )


# Get Learning Journeys of Course
@course_routes.route("/courses/<string:course_id>/learning_journeys")
def get_learning_journeys_of_course(course_id):
    course = Course.query.filter_by(course_id=course_id).first()
    if not course:
        return error("course", course_id, "no_records_by_identifier")
    return jsonify(
        {
            "code": 200,
            "data": {
                "course_id": course_id,
                "learning_journeys": [
                    learning_journey.json()
                    for learning_journey in course.learning_journeys
                ],
            },
        }
    )
