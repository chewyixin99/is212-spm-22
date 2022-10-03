from __main__ import app, db
from flask import jsonify

# Helper association table

skill_course = db.Table('skill_course',
    db.Column('skill_id', db.Integer, db.ForeignKey('skill.skill_id'), primary_key=True),
    db.Column('course_id', db.String, db.ForeignKey('course.course_id'), primary_key=True)
)