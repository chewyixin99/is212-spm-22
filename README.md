# is212-g7t3

## Learning Journey Management System

Plans and track staffs' learning journey, which fulfils skills required for job roles

## For developers only!

- STEP 1. Get your packages needed installed:

  - navigate to file directory /spm/backend
  - `$ pip install -r requirements.txt`
  -  or if you want a conda venv, `$ conda env create -f environment.yml`

- STEP 2. Setting up git hooks:

  - navigate to root /spm/ (ENSURE IT IS IN ROOT)
  - `$ pre-commit install`

## Starting the app

- Frontend (Node)

  - navigate to file directory /spm/frontend
  - `$ npm install` followed by `$ npm start`
  - frontend app will be live on port 3000

- Backend (flask)

  - navigate to file directory /spm/backend
  - `$ py app.py run` or `$ python app.py run`
