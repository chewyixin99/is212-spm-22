from extensions import db
from flask import Blueprint, jsonify, request
from models.course import Course
from models.learning_journey_course import learning_journey_course
from models.skill_course import skill_course

# from services.learning_journey import Learning_Journey

course_routes = Blueprint("courses", __name__)

# Get All Courses
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
    return jsonify({"code": 404, "message": "There are no role records."}), 404


@course_routes.route("/courses/<string:course_id>")
def get_course_by_id(course_id):
    course = Course.query.filter(Course.course_id == course_id).first()
    if course:
        return jsonify({"code": 200, "data": course.json()})
    return (
        jsonify({"code": 404, "message": "Course cannot be found. Please try again."}),
        404,
    )


@course_routes.route("/courses/<string:course_id>", methods=["POST"])
def create_course(course_id):
    if Course.query.filter_by(course_id=course_id).first():
        # exist, return 400
        return jsonify(
            {
                "code": 400,
                "data": {"course_id": course_id},
                "message": f"Course for this course_id: {course_id} already exists.",
            }
        )

    data = request.get_json()

    try:
        course = Course(course_id, **data)
        db.session.add(course)
        db.session.commit()
    except Exception as e:
        # failed to add, return 500
        print(e)
        return jsonify(
            {
                "code": 500,
                "data": {"course_id": course_id},
                "message": f"An error occured while creating the course record.",
            }
        )
    # success, return 200
    return jsonify(
        {
            "code": 201,
            "data": course.json(),
            "message": f"Course successfully created for course {course_id}",
        }
    )


@course_routes.route("/courses/<string:course_id>", methods=["PUT"])
def update_course(course_id):
    course = Course.query.filter(Course.course_id == course_id).first()
    if not course:
        return jsonify(
            {
                "code": 404,
                "message": f"Unable to update course {course_id}, course does not exist.",
            }
        )

    data = request.get_json()
    try:
        for key in data.keys():
            setattr(course, key, data[key])
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify(
            {
                "code": 500,
                "data": {"course_id": course_id},
                "message": "An error occured while updating the course.",
            }
        )
    return jsonify(
        {
            "code": 200,
            "data": course.json(),
            "message": f"Successfully updated course {course_id}.",
        }
    )


@course_routes.route("/courses/<string:course_id>/skills")
def get_skills_of_course(course_id):
    course = Course.query.filter_by(course_id=course_id).first()
    if not course:
        return jsonify(
            {"code": 404, "message": "Course cannot be found. Please try again."}
        )
    return jsonify(
        {
            "code": 200,
            "data": {
                "course_id": course_id,
                "skills": [skill.json() for skill in course.skills],
            },
        }
    )


# @app.route("/courses/<string:course_id>/staffs") #for testing
# def get_staffs_of_course(course_id):
#     course = Course.query.filter_by(course_id = course_id).first()
#     if not course:
#         return jsonify({
#             "code": 404,
#             "message": "Course cannot be found. Please try again."
#         })
#     return jsonify({
#         "code": 200,
#         "data": {
#             "course_id": course_id,
#             "skills": [staff.json() for staff in course.staffs]
#         }
#     })
