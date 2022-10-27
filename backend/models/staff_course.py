from extensions import db

# Helper association table

# fmt: off


class Staff_Course(db.Model):
    __tablename__ = 'staff_course'

    staff_id = db.Column(db.Integer, db.ForeignKey("staff.staff_id"), primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("course.course_id"), primary_key=True)
    staff = db.relationship("Staff", back_populates="courses")
    course = db.relationship("Course", back_populates="staffs")

    def json(self):
        return {
            "staff_id": self.staff_id,
            "course_id": self.course_id
        }
