from extensions import db
from flask import Blueprint, jsonify, request
from models.staff import Staff
from services.utils import error

staff_routes = Blueprint("staffs", __name__)


# Get all Staffs
@staff_routes.route("/staffs")
def get_all_staffs():
    staffs_list = Staff.query.all()
    if len(staffs_list):
        return jsonify(
            {"code": 200, "data": {"staffs": [staff.json() for staff in staffs_list]}}
        )
    return error("staff", None, "no_records")


# Get Staff by Staff_id
@staff_routes.route("/staffs/<int:staff_id>")
def get_staff_by_id(staff_id):
    staff = Staff.query.filter_by(staff_id=staff_id).first()
    if staff:
        return jsonify({"code": 200, "data": staff.json()})
    return error("staff", staff_id, "no_records_by_identifier")


# Create Staff
@staff_routes.route("/staffs/<string:email>", methods=["POST"])
def create_staff(email):
    if Staff.query.filter_by(email=email).first():
        error_data = {"email": email}
        return error("staff", email, "exists", error_data)

    data = request.get_json()

    try:
        staff = Staff(email, **data)
        db.session.add(staff)
        db.session.commit()
    except Exception as e:
        print(e)
        return error("staff", email, "internal_server_error_create")
    return jsonify(
        {
            "code": 201,
            "data": staff.json(),
            "message": f"Staff successfully created for staff email: {email}",
        }
    )


# Update Staff
@staff_routes.route("/staffs/<int:staff_id>", methods=["PUT"])
def update_staff(staff_id):
    staff = Staff.query.filter(Staff.staff_id == staff_id).first()
    if not staff:
        return error("staff", staff_id, "no_records_by_identifier")

    data = request.get_json()
    try:
        for key in data.keys():
            setattr(staff, key, data[key])
            db.session.commit()
    except Exception as e:
        print(e)
        return error("staff", staff_id, "internal_server_error_update")
    return jsonify(
        {
            "code": 200,
            "data": staff.json(),
            "message": f"Successfully updated staff {staff_id}.",
        }
    )


# Get COMPLETED Courses of Staff
@staff_routes.route("/staffs/<int:staff_id>/courses")
def get_courses_of_staff(staff_id):
    staff = Staff.query.filter_by(staff_id=staff_id).first()
    if not staff:
        return error("staff", staff_id, "no_records_by_identifier")
    return jsonify(
        {
            "code": 200,
            "data": {
                "staff_id": staff_id,
                "courses": [course.json() for course in staff.courses],
            },
        }
    )


# Get COMPLETED Skills of Staff
@staff_routes.route("/staffs/<int:staff_id>/skills")
def get_skills_of_staff(staff_id):
    staff = Staff.query.filter_by(staff_id=staff_id).first()
    if not staff:
        return error("staff", staff_id, "no_records_by_identifier")
    return jsonify(
        {
            "code": 200,
            "data": {
                "staff_id": staff_id,
                "skills": [skill.json() for skill in staff.skills],
            },
        }
    )
