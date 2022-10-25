from extensions import db
from models.learning_journey import Learning_Journey
from models.learning_journey_course import learning_journey_course
from models.skill import Skill
from models.skill_course import skill_course
from models.staff_course import Staff_Course

# fmt: off


class Course(db.Model):
    __tablename__ = "course"

    course_id = db.Column(db.String(20), primary_key=True)
    course_name = db.Column(db.String(50))
    course_desc = db.Column(db.String(255))
    course_status = db.Column(db.String(15))
    course_type = db.Column(db.String(10))
    course_category = db.Column(db.String(50))
    staffs = db.relationship("Staff_Course", back_populates="course", viewonly=True)
    skills = db.relationship("Skill", secondary=skill_course, backref="course", viewonly=True)
    learning_journeys = db.relationship("Learning_Journey", secondary=learning_journey_course, backref="course", viewonly=True,)

    def __init__(
        self,
        course_id,
        course_name,
        course_desc,
        course_status,
        course_type,
        course_category,
    ):
        self.course_id = course_id
        self.course_name = course_name
        self.course_desc = course_desc
        self.course_status = course_status
        self.course_type = course_type
        self.course_category = course_category

    def json(self):
        return {
            "course_id": self.course_id,
            "course_name": self.course_name,
            "course_desc": self.course_desc,
            "course_status": self.course_status,
            "course_type": self.course_type,
            "course_category": self.course_category,
        }
