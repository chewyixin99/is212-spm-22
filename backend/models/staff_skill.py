from extensions import db

# Helper association table

# fmt: off


Staff_Skill = db.Table('staff_skill',
                        db.Column('staff_id', db.Integer, db.ForeignKey("staff.staff_id"), primary_key=True),
                        db.Column('skill_id', db.Integer, db.ForeignKey("skill.skill_id"), primary_key=True))
