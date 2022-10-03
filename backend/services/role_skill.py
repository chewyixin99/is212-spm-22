from __main__ import app, db
from flask import jsonify

# Helper association table

role_skill = db.Table('role_skill',
    db.Column('role_id', db.Integer, db.ForeignKey('role.role_id'), primary_key=True),
    db.Column('skill_id', db.Integer, db.ForeignKey('skill.skill_id'), primary_key=True)
)