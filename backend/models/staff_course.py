from extensions import db

# Helper association table

staff_course = db.Table(
    "staff_course",
    db.Column(
        "staff_id", db.Integer, db.ForeignKey("staff.staff_id"), primary_key=True
    ),
    db.Column(
        "course_id", db.String, db.ForeignKey("course.course_id"), primary_key=True
    ),
)
