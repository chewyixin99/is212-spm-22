import os
from pathlib import Path
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from extensions import db
from services.course import course_routes
from services.learning_journey import learning_journey_routes
from services.role import role_routes
from services.skill import skill_routes
from services.staff import staff_routes

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.debug = True

    db_pw = os.environ.get("DATABASE_PASSWORD")
    if (db_pw == None): 
        db_pw = ""

    is_production = int(os.environ.get("IS_PRODUCTION"))
    if (not is_production):
        production_db = 'mysql+mysqlconnector://root:' + db_pw + '@localhost:3306/spm'
    else:
        production_db = os.environ.get("CLEARDB_DATABASE_URL")

    app.config['SQLALCHEMY_DATABASE_URI'] = production_db
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_size': 100,'pool_recycle': 280}
    
    db.init_app(app)
    CORS(app)

    @app.route("/")
    def home():
        return "<h1>G7T3 Backend</h1>"

    app.register_blueprint(course_routes)
    app.register_blueprint(learning_journey_routes)
    app.register_blueprint(role_routes)
    app.register_blueprint(skill_routes)
    app.register_blueprint(staff_routes)

    return app

# For app to run on dev, won't affect local testing
app = create_app()

# Run the application
if __name__ == '__main__':
    # Local
    app = create_app()
    app.run(host='0.0.0.0', port=5001, debug=True)
