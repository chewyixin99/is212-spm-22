from extensions import db
from models.staff_course import Staff_Course
from models.staff_skill import Staff_Skill

# fmt: off


class Staff(db.Model):
    __tablename__ = "staff"

    staff_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    staff_fname = db.Column(db.String(50))
    staff_lname = db.Column(db.String(50))
    dept = db.Column(db.String(50))
    email = db.Column(db.String(50))
    type = db.Column(db.Integer)
    status = db.Column(db.String(50))
    courses = db.relationship("Course", secondary=Staff_Course, backref="staff")
    skills = db.relationship("Skill", secondary=Staff_Skill, backref="staff")

    def __init__(self, email, staff_fname, staff_lname, dept, type, status):
        self.staff_fname = staff_fname
        self.staff_lname = staff_lname
        self.dept = dept
        self.email = email
        self.type = type
        self.status = status

    def json(self):
        return {
            "staff_id": self.staff_id,
            "staff_fname": self.staff_fname,
            "staff_lname": self.staff_lname,
            "dept": self.dept,
            "email": self.email,
            "type": self.type,
            "status": self.status
        }

    def to_dict(self):
        columns = self.__mapper__.column_attrs.keys()
        result = {}
        for column in columns:
            result[column] = getattr(self, column)
        return result
