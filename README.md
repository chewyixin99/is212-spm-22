# is212-g7t3

## Learning Journey Management System

Plans and track staffs' learning journey, which fulfils skills required for job roles

---
## Starting the app

### Frontend (Node)

  - navigate to file directory `/spm/frontend`
  - `$ npm install` followed by `$ npm start`
  - frontend app will be live on port 3000

### Backend (flask)

  - navigate to file directory `/spm/backend`
  - `$ py app.py run` or `$ python app.py run`

---
## For developers only!

### Things you need before development

1. Get your packages needed installed:

  - navigate to file directory `/spm/backend`
  - `$ pip install -r requirements.txt`
  -  or if you want a conda venv, `$ conda env create -f environment.yml`

2. Setting up git hooks:

  - navigate to `/spm/` (ENSURE IT IS IN ROOT)
    - `$ pre-commit install`

### How to perform Unit Testing

#### Back-end

1. Start up `MAMP (for MacOSX)` / `WAMP (for Windows)`
2. Go to `MySQL WorkBench` or `localhost/phpMyAdmin`
3. Import `testspm.sql` from `/spm/backend` and run queries to initiate `testDB`
4. `$ py app.py run` or `$ python app.py run`
5. On `/spm/backend/app.py`, change `"@localhost:3306/SPM"` to `"@localhost:3306/testSPM"`
6. On the left toolbar of VSCode, locate Testing and import the `unit_test.py` and `integration_test.py` found in the `unitTest` folder (i.e `/spm/backend/unitTest`)
7. Click the play button for `unit_test.py`. All tests should run successfully with a green tick.
8. Click the play button for `implementation_test.py`. All tests should run successfully with a green tick.

#### Front-end
1. Navigate to file directory `/spm/frontend`
2. Run command `$ npm test`
3. All tests should run successfully.
