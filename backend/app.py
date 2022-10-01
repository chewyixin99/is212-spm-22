from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.debug = True

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root' + \
                                        '@localhost:3306/spm'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,'pool_recycle': 280}

db = SQLAlchemy(app)
CORS(app)

class Staff(db.Model):
    __tablename__ = 'staff'

    staff_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    staff_fname = db.Column(db.String(50))
    staff_lname = db.Column(db.String(50))
    dept = db.Column(db.String(50))
    email = db.Column(db.String(50))
    type = db.Column(db.Integer)

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


class Role(db.Model):
    __tablename__ = 'role'

    role_id = db.Column(db.Integer, primary_key = True)
    role_name = db.Column(db.String(50))

    def __init__(self,role_name):
        self.role_name = role_name

    def json(self):
        return {"role_id": self.role_id,
                "role_name": self.role_name}

# class Registration(db.Model):
#     __tablename__ = 'registration'

#     reg_id = db.Column(db.Integer, primary_key = True)
#     course_id = db.Column(db.String(20), db.ForeignKey('course_id'))
#     staff_id = db.Column(db.Integer, db.ForeignKey('staff_id'))
#     reg_status = db.Column(db.String(20))
#     completion_status = db.Column(db.String(20))

#db.create_all()


#####################################
############### Staff ###############
#####################################

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




#####################################
############### Roles ###############
#####################################

#Get All Roles
@app.route("/roles")
def get_all_roles():
    roles_list = Role.query.all()
    if len(roles_list):
        return jsonify(
            {
               "code": 200,
               "data":{
                    "roles": [role.json() for role in roles_list]
               } 
            }
        )
    return jsonify({
        "code": 404,
        "message": "There are no role records."
    }), 404

#Get a Role by role_id
@app.route("/roles/<int:role_id>")
def get_role_by_id(role_id):
    role = Role.query.filter_by(role_id = role_id).first()
    if role:
        return jsonify(
            {
               "code": 200,
               "data": role.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Role cannot be found. Please try again."
        }
    ), 404



#####################################
############## Courses ##############
#####################################

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



# Run the application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
