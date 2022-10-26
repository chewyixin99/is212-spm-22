from extensions import db

# Helper association table

# fmt: off


class Staff_Skill(db.Model):
    __tablename__ = 'staff_skill'

    staff_id = db.Column(db.Integer, db.ForeignKey("staff.staff_id"), primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey("skill.skill_id"), primary_key=True)
    staff = db.relationship("Staff", back_populates="skills")
    skill = db.relationship("Skill", back_populates="staffs")

    def json(self):
        return {
            "staff_id": self.staff_id,
            "skill_id": self.skill_id
        }
