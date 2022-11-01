from extensions import db
from flask import jsonify

# Helper association table

learning_journey_course = db.Table(
    "learning_journey_course",
    db.Column(
        "learning_journey_id",
        db.String,
        db.ForeignKey("learning_journey.learning_journey_id"),
        primary_key=True,
    ),
    db.Column(
        "course_id", db.String, db.ForeignKey("course.course_id"), primary_key=True
    ),
)
