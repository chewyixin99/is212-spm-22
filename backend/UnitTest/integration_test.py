import unittest

import requests

# URL = "https://g7t3-backend-v2.herokuapp.com"


class TestEmptyTables(unittest.TestCase):
    course_url = "http://localhost:5001/courses"
    learning_journey_url = "http://localhost:5001/learning_journeys"
    role_url = "http://localhost:5001/roles"
    skill_url = "http://localhost:5001/skills"
    staff_url = "http://localhost:5001/staffs"

    def test_get_all_course_empty(self):
        API = self.course_url
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_get_all_roles_empty(self):
        API = self.role_url
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_get_all_skills_empty(self):
        API = self.skill_url
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_get_all_staffs_empty(self):
        API = self.staff_url
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_get_all_learning_journeys_empty(self):
        API = self.learning_journey_url
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)


class TestCreateReadUpdateHappy(unittest.TestCase):
    course_url = "http://localhost:5001/courses"
    role_url = "http://localhost:5001/roles"
    skill_url = "http://localhost:5001/skills"
    staff_url = "http://localhost:5001/staffs"

    # Course
    def test_create_new_course(self):
        API = self.course_url + "/TestCourse1"
        data = {
            "course_name": "Test Course 1",
            "course_desc": "This is to test course 1",
            "course_status": "Active",
            "course_type": "Test Type",
            "course_category": " Test Category",
        }
        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 201)
        self.assertEqual(response.json()["data"]["course_id"], "TestCourse1")

    def test_get_all_courses(self):
        API = self.course_url
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(len(response.json()["data"]["courses"][0]), 6)

    def test_get_course_by_course_id(self):
        API = self.course_url + "/TestCourse1"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["course_id"], "TestCourse1")

    def test_update_course_status(self):
        API = self.course_url + "/TestCourse1"
        data = {"course_status": "Retired"}
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["course_id"], "TestCourse1")
        self.assertEqual(response.json()["data"]["course_status"], "Retired")

    # Role
    def test_create_new_role(self):
        API = self.role_url + "/Test Role 1"
        data = {
            "role_desc": "This is to test create role 1.",
            "role_dept": "Tech",
            "status": "Active",
        }
        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 201)
        self.assertEqual(response.json()["data"]["role_name"], "Test Role 1")

    def test_get_all_roles(self):
        API = self.role_url
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(len(response.json()["data"]["roles"][0]), 5)

    def test_get_role_by_role_id(self):
        API = self.role_url + "/1"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["role_id"], 1)

    def test_get_role_by_role_name(self):
        API = self.role_url + "/Test Role 1"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["role_name"], "Test Role 1")

    def test_update_role_status(self):
        API = self.role_url + "/1"
        data = {"status": "Retired", "skills": []}

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["role_id"], 1)
        self.assertEqual(response.json()["data"]["status"], "Retired")

    # Skill
    def test_create_new_skill(self):
        API = self.skill_url + "/Test Skill 1"
        data = {
            "skill_desc": "This is to test create skill 1.",
            "status": "Active",
            "courses": ["TestCourse1"],
        }
        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 201)
        self.assertEqual(response.json()["data"]["skill_name"], "Test Skill 1")

    def test_get_all_skills(self):
        API = self.skill_url
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(len(response.json()["data"]["skills"][0]), 4)

    def test_get_skill_by_skill_id(self):
        API = self.skill_url + "/1"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["skill_id"], 1)

    def test_get_skill_by_skill_name(self):
        API = self.skill_url + "/Test Skill 1"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["skill_name"], "Test Skill 1")

    def test_update_skill_status(self):
        API = self.skill_url + "/1"
        data = {
            "status": "Retired",
            "skill_desc": "This is to test create skill 1.",
            "remove": [],
            "add": [],
        }
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["skill_id"], 1)
        self.assertEqual(response.json()["data"]["status"], "Retired")

    # Staff
    def test_create_new_staff(self):
        API = self.staff_url + "/teststaff1@mail.com"
        data = {
            "staff_fname": "Test",
            "staff_lname": "Staff 1",
            "dept": "Sales",
            "type": 2,
            "status": "Active",
        }
        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 201)
        self.assertEqual(response.json()["data"]["email"], "teststaff1@mail.com")

    def test_get_all_staffs(self):
        API = self.staff_url
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(len(response.json()["data"]["staffs"][0]), 7)

    def test_staff_by_staff_id(self):
        API = self.staff_url + "/1"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["staff_id"], 1)

    def test_update_staff_status(self):
        API = self.staff_url + "/1"
        data = {"status": "Retired"}
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["staff_id"], 1)
        self.assertEqual(response.json()["data"]["status"], "Retired")


class TestCreateReadUpdateHappyLJ(unittest.TestCase):
    learning_journey_url = "http://localhost:5001/learning_journeys"

    # Learning Journey
    def test_create_new_learning_journey(self):
        API = self.learning_journey_url + "/1_1"
        data = {
            "learning_journey_name": "Test Learning Journey 1",
            "role_id": 1,
            "staff_id": 1,
            "courses": [],
        }
        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 201)
        self.assertEqual(response.json()["data"]["learning_journey_id"], "1_1")

    def test_get_all_learning_journeys(self):
        API = self.learning_journey_url
        response = requests.get(API)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["data"]["learning_journeys"][0]), 4)

    def test_get_learning_journeys_by_staffID(self):
        API = self.learning_journey_url + "/1"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)


class TestCreateReadUpdateNegative(unittest.TestCase):
    course_url = "http://localhost:5001/courses"
    learning_journey_url = "http://localhost:5001/learning_journeys"
    role_url = "http://localhost:5001/roles"
    skill_url = "http://localhost:5001/skills"
    staff_url = "http://localhost:5001/staffs"

    # Course
    def test_create_existing_course(self):
        API = self.course_url + "/TestCourse1"
        data = {
            "course_name": "Test Course 1",
            "course_desc": "This is to test course 1",
            "course_status": "Active",
            "course_type": "Test Type",
            "course_category": " Test Category",
        }
        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 400)
        self.assertEqual(response.json()["data"]["course_id"], "TestCourse1")

    def test_get_course_by_course_id_missing(self):
        API = self.course_url + "/TestCourseFail"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_update_course_status_missing(self):
        API = self.course_url + "/TestCourseFail"
        data = {"course_status": "Retired"}
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)

    # Role
    def test_create_existing_role(self):
        API = self.role_url + "/Test Role 1"
        data = {
            "role_desc": "This is to test create existing role 1.",
            "role_dept": "Tech",
            "status": "Active",
        }
        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 400)
        self.assertEqual(response.json()["data"]["role_name"], "Test Role 1")

    def test_get_role_by_role_id_missing(self):
        API = self.role_url + "/0"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_get_role_by_role_name_missing(self):
        API = self.role_url + "/Test Role Missing"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_update_role_status_missing(self):
        API = self.role_url + "/0"
        data = {"status": "Retired", "skills": []}
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)

    # Skill
    def test_create_existing_skill(self):
        API = self.skill_url + "/Test Skill 1"
        data = {
            "skill_desc": "This is to test create skill 1.",
            "status": "Active",
            "courses": [],
        }
        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 400)
        self.assertEqual(response.json()["data"]["skill_name"], "Test Skill 1")

    def test_get_skill_by_skill_id_missing(self):
        API = self.skill_url + "/0"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_get_skill_by_skill_name_missing(self):
        API = self.skill_url + "/Test Skill Missing"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_update_skill_status_missing(self):
        API = self.skill_url + "/0"
        data = {
            "status": "Retired",
            "skill_desc": "This is to test create skill 0.",
            "remove": [],
            "add": [],
        }
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)

    # Staff
    def test_create_existing_staff(self):
        API = self.staff_url + "/teststaff1@mail.com"
        data = {
            "staff_fname": "Test",
            "staff_lname": "Staff 1",
            "dept": "Sales",
            "type": 2,
            "status": "Active",
        }
        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 400)
        self.assertEqual(response.json()["data"]["email"], "teststaff1@mail.com")

    def test_staff_by_staff_id_missing(self):
        API = self.staff_url + "/0"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_update_staff_status_missing(self):
        API = self.staff_url + "/0"
        data = {"status": "Retired"}
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)

    # Learning Journey
    def test_create_existing_learning_journey(self):
        API = self.learning_journey_url + "/1_1"
        data = {
            "learning_journey_name": "Test Learning Journey 1",
            "role_id": 1,
            "staff_id": 1,
            "courses": ["TestCourse1"],
        }
        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 400)

    def test_get_learning_journeys_by_staffID_missing(self):
        API = self.learning_journey_url + "/0"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)


class TestMappingsHappy(unittest.TestCase):
    course_url = "http://localhost:5001/courses"
    learning_journey_url = "http://localhost:5001/learning_journeys"
    role_url = "http://localhost:5001/roles"
    skill_url = "http://localhost:5001/skills"
    staff_url = "http://localhost:5001/staffs"

    def test_get_skills_of_course(self):
        API = self.course_url + "/TestCourse1/skills"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["course_id"], "TestCourse1")
        self.assertEqual(type(response.json()["data"]["skills"]), type([]))

    def test_get_staffs_of_course(self):
        API = self.course_url + "/TestCourse1/staffs"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["course_id"], "TestCourse1")
        self.assertEqual(type(response.json()["data"]["staffs"]), type([]))

    def test_get_learning_journeys_of_course(self):
        API = self.course_url + "/TestCourse1/learning_journeys"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["course_id"], "TestCourse1")
        self.assertEqual(type(response.json()["data"]["learning_journeys"]), type([]))

    # Role
    def test_get_skills_of_role(self):
        API = self.role_url + "/1/skills"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["role_id"], 1)
        self.assertEqual(type(response.json()["data"]["skills"]), type([]))

    def test_update_skills_of_role(self):
        # Using the dual purpose "Update"
        # API = self.role_url + "/1"
        # data = {
        #     "status": "Active",
        #     "skills": []
        # }

        API = self.role_url + "/1/skills"
        data = {"remove": [1], "add": []}
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["role"]["role_id"], 1)
        self.assertEqual(type(response.json()["data"]["skills"]), type([]))

    # Skill
    def test_get_roles_of_skills(self):
        API = self.skill_url + "/1/roles"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["skill_id"], 1)
        self.assertEqual(type(response.json()["data"]["roles"]), type([]))

    def test_get_courses_of_skills(self):
        API = self.skill_url + "/1/courses"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["skill_id"], 1)
        self.assertEqual(type(response.json()["data"]["courses"]), type([]))

    def test_get_staffs_of_skills(self):
        API = self.skill_url + "/1/staffs"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["skill_id"], 1)
        self.assertEqual(type(response.json()["data"]["staffs"]), type([]))

    def test_update_courses_of_skill(self):
        API = self.skill_url + "/1"
        data = {
            "status": "Active",
            "skill_desc": "This is to test create skill 1.",
            "remove": [],
            "add": ["TestCourse1"],
        }
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["skill_id"], 1)

    # Staff
    def test_get_courses_of_staff(self):
        API = self.staff_url + "/1/courses"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["staff_id"], 1)
        self.assertEqual(type(response.json()["data"]["courses"]), type([]))

    def test_get_skills_of_staff(self):
        API = self.staff_url + "/1/skills"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["staff_id"], 1)
        self.assertEqual(type(response.json()["data"]["skills"]), type([]))

    # Learning Journey
    def test_get_courses_of_learning_journey(self):
        API = self.learning_journey_url + "/1_1/courses"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["learning_journey"], "1_1")
        self.assertEqual(type(response.json()["data"]["courses"]), type([]))

    def test_update_course_of_learning_journey(self):
        API = self.learning_journey_url + "/1_1/update"
        data = {
            "learning_journey_name": "Test Learning Journey 1",
            "remove": [],
            "add": ["TestCourse1"],
        }
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["learning_journey"], "1_1")
        self.assertEqual(type(response.json()["data"]["courses"]), type([]))


class TestMappingsNegative(unittest.TestCase):
    course_url = "http://localhost:5001/courses"
    learning_journey_url = "http://localhost:5001/learning_journeys"
    role_url = "http://localhost:5001/roles"
    skill_url = "http://localhost:5001/skills"
    staff_url = "http://localhost:5001/staffs"

    # Course
    def test_get_skills_of_course_missing(self):
        API = self.course_url + "/TestCourseFail/skills"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_get_staffs_of_course_missing(self):
        API = self.course_url + "/TestCourseFail/staffs"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_get_learning_journeys_of_course_missing(self):
        API = self.course_url + "/TestCourseFail/learning_journeys"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # Role
    def test_get_skills_of_role_missing(self):
        API = self.role_url + "/0"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_update_skills_of_role_missing(self):
        API = self.role_url + "/0/skills"
        data = {"remove": [], "add": [7]}
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)

    # Skill
    def test_get_roles_of_skills_missing(self):
        API = self.skill_url + "/0/roles"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_get_courses_of_skills_missing(self):
        API = self.skill_url + "/0/courses"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_get_staffs_of_skills_missing(self):
        API = self.skill_url + "/0/staffs"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_update_courses_of_skill_missing(self):
        API = self.skill_url + "/0"
        data = {
            "status": "Active",
            "skill_desc": "This is to test create skill 1.",
            "remove": [],
            "add": ["TestCourse1"],
        }
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)

    # Staff
    def test_get_courses_of_staff_missing(self):
        API = self.staff_url + "/000000/courses"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_get_skills_of_staff_missing(self):
        API = self.staff_url + "/000000/skills"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # Learning Journey
    def test_get_courses_of_learning_journey_missing(self):
        API = self.learning_journey_url + "/000000_0/courses"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    def test_update_course_of_learning_journey_missing(self):
        API = self.learning_journey_url + "/000000_0/update"
        data = {
            "learning_journey_name": "Test Learning Journey 1",
            "remove": [],
            "add": ["TestCourse1"],
        }
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)


if __name__ == "__main__":
    unittest.main()
