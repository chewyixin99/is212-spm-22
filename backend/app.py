from dotenv import load_dotenv
import os
from pathlib import Path

load_dotenv()

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

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
    

db = SQLAlchemy(app)
CORS(app)

@app.route("/")
def home():
    return "<h1>G7T3 Backend</h1>"

import services.staff
import services.role
import services.course
import services.skill
import services.learning_journey

# Run the application
if __name__ == '__main__':
    # port = int(os.environ.get('PORT', 5001))
    app.run(debug=True)
    # app.run(host='0.0.0.0', port=port, debug=True)
