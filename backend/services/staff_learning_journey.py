from __main__ import app, db
from flask import jsonify

# Helper association table

staff_learning_journey = db.Table('staff_learning_journey',
    db.Column('staff_id', db.Integer, db.ForeignKey('staff.staff_id'), primary_key=True),
    db.Column('learning_journey_id', db.Integer, db.ForeignKey('learning_journey.learning_journey_id'), primary_key=True)
)