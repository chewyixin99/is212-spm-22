from __main__ import app, db
from flask import jsonify

from .staff_learning_journey import *

class Staff(db.Model):
    __tablename__ = 'staff'

    staff_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    staff_fname = db.Column(db.String(50))
    staff_lname = db.Column(db.String(50))
    dept = db.Column(db.String(50))
    email = db.Column(db.String(50))
    type = db.Column(db.Integer)
    learning_journeys = db.relationship('Learning_Journey', secondary = staff_learning_journey, backref = 'staffs')

    def __init__(self, staff_fname, staff_lname, dept, email, type):
        self.staff_fname = staff_fname
        self.staff_lname = staff_lname
        self.dept = dept
        self.email = email
        self.type = type

    def json(self):
        return {"staff_id": self.staff_id,
                "staff_fname": self.staff_fname,
                "staff_lname": self.staff_lname,
                "dept": self.dept,
                "email": self.email,
                "type": self.type}
                

#Get All Staffs
@app.route("/staffs")
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
@app.route("/staffs/<int:staff_id>")
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