from flask import jsonify
from extensions import db

# Helper association table

skill_course = db.Table('skill_course',
    db.Column('skill_id', db.Integer, db.ForeignKey('skill.skill_id'), primary_key=True),
    db.Column('course_id', db.String(20), db.ForeignKey('course.course_id'), primary_key=True)
)