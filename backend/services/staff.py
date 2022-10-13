from flask import Blueprint, jsonify, request
from extensions import db

staff_routes = Blueprint('staffs', __name__)

#Get All Staffs
@staff_routes.route("/staffs")
def get_all_staffs():
    staffs_list = Staff.query.all()
    if len(staffs_list):
        return jsonify(
            {
               "code": 200,
               "data":{
                    "staffs": [staff.json() for staff in staffs_list]
               } 
            }
        )
    return jsonify({
        "code": 404,
        "message": "There are no staff records."
    }), 404


#Get a Staff by staff_id
@staff_routes.route("/staffs/<int:staff_id>")
def get_staff_by_id(staff_id):
    staff = Staff.query.filter_by(staff_id = staff_id).first()
    if staff:
        return jsonify(
            {
               "code": 200,
               "data": staff.json()
            }
        )
    return jsonify({
        "code": 404,
        "message": "Staff cannot be found. Please try again."
    }), 404

@staff_routes.route("/staffs/<string:email>", methods=["POST"])
def create_staff(email):
    if (Staff.query.filter_by(email=email).first()):
        return jsonify({
            "code": 400,
            "data": {
                "email": email,
            },
            "message": f"Staff for this email: {email} already exists."
        })
    
    data = request.get_json()

    try:
        staff = Staff(email, **data)
        db.session.add(staff)
        db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({
            "code": 500,
            "data": {
                "email": email
            },
            "message": f"An error occured while creating the staff record"
        })
    return jsonify({
        "code": 201,
        "data": staff.json(),
        "message": f"Staff successfully created for staff email: {email}"
    })

@staff_routes.route("/staffs/<int:staff_id>", methods=["PUT"])
def update_staff(staff_id):
    staff = Staff.query.filter(Staff.staff_id == staff_id).first()
    if not staff:
        return jsonify({
            "code": 404,
            "message": f"Unable to update staff {staff_id}, staff does not exist."
        })
    
    data = request.get_json()
    try:
        for key in data.keys():
            setattr(staff, key, data[key])
            db.session.commit()
    except Exception as e:
        print(e)
        return jsonify({
            "code": 500,
            "data": {
                "staff_id": staff_id
            },
            "message": f"An error occured while updating staff with staff_id: {staff_id}"
        })
    return jsonify({
        "code": 200,
        "data": staff.json(),
        "message": f"Successfully updated staff {staff_id}."
    })