from extensions import db
from flask import Blueprint, jsonify, request
from models.course import Course
from models.learning_journey import Learning_Journey
from services.utils import error

learning_journey_routes = Blueprint("learning_journeys", __name__)


# Get all Learning Journeys
@learning_journey_routes.route("/learning_journeys")
def get_all_learning_journeys():
    learning_journey_list = Learning_Journey.query.all()
    if len(learning_journey_list):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "learning_journeys": [
                        learning_journey.json()
                        for learning_journey in learning_journey_list
                    ]
                },
            }
        )
    return error("learning_journey", None, "no_records")


# Get Learning Journeys by Id (NOTE: This is staff_id not learning_journey_id)
@learning_journey_routes.route("/learning_journeys/<int:staff_id>")
def get_learning_journey_by_id(staff_id):
    staff_learning_journeys = Learning_Journey.query.filter(
        Learning_Journey.staff_id == staff_id
    ).all()
    if staff_learning_journeys:
        return jsonify(
            {
                "code": 200,
                "data": [
                    learning_journey.json()
                    for learning_journey in staff_learning_journeys
                ],
            }
        )
    return error("learning_journey", staff_id, "no_records_under_table")


# Get Learning Journey by Learning Journey ID
@learning_journey_routes.route("/learning_journeys/<string:learning_journey_id>/")
def get_learning_journey_by_lj_id(learning_journey_id):
    learning_journey = Learning_Journey.query.filter_by(
        learning_journey_id=learning_journey_id
    ).first()
    if not learning_journey:
        return error(
            "learning_journey", learning_journey_id, "no_records_by_identifier"
        )
    return jsonify(
        {
            "code": 200,
            "data": {
                "learning_journey": learning_journey.json(),
                "courses": [course.json() for course in learning_journey.courses],
            },
        }
    )


# Get Courses of Learning Journey
@learning_journey_routes.route(
    "/learning_journeys/<string:learning_journey_id>/courses"
)
def get_courses_of_learning_journey(learning_journey_id):
    learning_journey = Learning_Journey.query.filter_by(
        learning_journey_id=learning_journey_id
    ).first()
    if not learning_journey:
        return error(
            "learning_journey", learning_journey_id, "no_records_by_identifier"
        )
    return jsonify(
        {
            "code": 200,
            "data": {
                "learning_journey": learning_journey_id,
                "courses": [course.json() for course in learning_journey.courses],
            },
        }
    )


# Update Course in Learning Journey
@learning_journey_routes.route(
    "/learning_journeys/<string:learning_journey_id>/update", methods=["PUT"]
)
def update_course_in_learning_journey(learning_journey_id):
    learning_journey = Learning_Journey.query.filter_by(
        learning_journey_id=learning_journey_id
    ).first()
    if not learning_journey:
        return error(
            "learning_journey", learning_journey_id, "no_records_by_identifier"
        )

    data = request.get_json()
    remove_courses = []
    add_courses = []

    learning_journey.learning_journey_name = data["learning_journey_name"]

    for r in data["remove"]:
        to_remove = Course.query.filter_by(course_id=r).first()
        if to_remove is None:
            return error("course", r, "no_records_by_identifier")
        remove_courses.append(to_remove)

    for a in data["add"]:
        to_add = Course.query.filter_by(course_id=a).first()
        if to_add is None:
            return error("course", a, "no_records_by_identifier")
        add_courses.append(to_add)

    try:
        for c in remove_courses:
            if c not in learning_journey.courses:
                return error("learning_journey", c, "not_inside")
            learning_journey.courses.remove(c)
        for c in add_courses:
            if c in learning_journey.courses:
                return error("learning_journey", c, "already_inside")
            learning_journey.courses.append(c)
        db.session.commit()
    except Exception as e:
        print(e)
        return error(
            "learning_journey", learning_journey_id, "internal_server_error_update"
        )

    return jsonify(
        {
            "code": 200,
            "data": {
                "learning_journey": learning_journey_id,
                "courses": [course.json() for course in learning_journey.courses],
                "message": f"Successfully updated courses from the Learning Journey {learning_journey_id}.",
            },
        }
    )


# Create Learning Journey
@learning_journey_routes.route(
    "/learning_journeys/<string:learning_journey_id>", methods=["POST"]
)
def create_learning_journey(learning_journey_id):
    if Learning_Journey.query.filter_by(
        learning_journey_id=learning_journey_id
    ).first():
        # exist, return 400
        error_data = {"learning_journey_id": learning_journey_id}
        return error("learning_journey", learning_journey_id, "exists", error_data)

    data = request.get_json()

    try:
        learning_journey = Learning_Journey(
            learning_journey_id,
            data["learning_journey_name"],
            data["role_id"],
            data["staff_id"],
        )
        for course_id in data["courses"]:
            course = Course.query.filter_by(course_id=course_id).first()
            learning_journey.courses.append(course)

        db.session.add(learning_journey)
        db.session.commit()
    except Exception as e:
        # failed to add, return 500
        print(e)
        return error(
            "learning_journey", learning_journey_id, "internal_server_error_create"
        )
    # success, return 200
    return jsonify(
        {
            "code": 201,
            "data": learning_journey.json(),
            "message": f"Learning Journey successfully created for learning_journey_id {learning_journey_id}",
        }
    )


# Delete Role
@learning_journey_routes.route(
    "/learning_journeys/<string:learning_journey_id>", methods=["DELETE"]
)
def delete_learning_journey(learning_journey_id):
    learning_journey = Learning_Journey.query.filter_by(
        learning_journey_id=learning_journey_id
    ).first()
    if not (learning_journey):
        return error(
            "learning_journey", learning_journey_id, "no_records_by_identifier"
        )

    try:
        db.session.delete(learning_journey)
        db.session.commit()
    except Exception as e:
        print(e)
        return error(
            "learning_journey", learning_journey_id, "internal_server_error_delete"
        )

    return jsonify(
        {
            "code": 201,
            "learning_journey_id": learning_journey_id,
            "message": f"Successfully deleted learning journey {learning_journey_id}.",
        }
    )


# def corsify_actual_response(response):
#     header = response.headers
#     header["Access-Control-Allow-Origin"] = "*"
#     return response
