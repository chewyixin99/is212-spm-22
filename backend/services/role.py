from __main__ import app, db
from flask import jsonify

class Role(db.Model):
    __tablename__ = 'role'

    role_id = db.Column(db.Integer, primary_key = True)
    role_name = db.Column(db.String(50))
    status = db.Column(db.String(50))

    def __init__(self,role_name, status):
        self.role_name = role_name
        self.status = status

    def json(self):
        return {
            "role_id": self.role_id,
            "role_name": self.role_name,
            "status": self.status
        }

#Get All Roles
@app.route("/roles")
def get_all_roles():
    roles_list = Role.query.all()
    if len(roles_list):
        return jsonify(
            {
               "code": 200,
               "data":{
                    "roles": [role.json() for role in roles_list]
               } 
            }
        )
    return jsonify({
        "code": 404,
        "message": "There are no role records."
    }), 404

#Get a Role by role_id
@app.route("/roles/<int:role_id>")
def get_role_by_id(role_id):
    role = Role.query.filter_by(role_id = role_id).first()
    if role:
        return jsonify(
            {
               "code": 200,
               "data": role.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Role cannot be found. Please try again."
        }
    ), 404