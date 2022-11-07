import json
import unittest
import requests


class TestCourseAPI(unittest.TestCase):
    # URL = "https://g7t3-backend-v2.herokuapp.com"
    URL = "http://localhost:5001/courses"

    # NOTE: Happy Get All Case #
    def test_get_all_courses(self):
        API = self.URL
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(len(response.json()["data"]["courses"][0]), 6)

    # NOTE: Happy Get by ID Case #
    def test_get_course_by_course_id(self):
        API = self.URL + "/TestCourse1"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["course_id"], "TestCourse1")

    # NOTE: Negative Get by ID Case #
    def test_get_course_by_course_id_missing(self):
        API = self.URL + "/TestCourseFail"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Create Case #
    def test_create_new_course(self):
        API = self.URL + "/TestCourse1"
        data = {
            "course_name": "Test Course 1",
            "course_desc": "This is to test course 1",
            "course_status": "Active",
            "course_type": "Test Type",
            "course_category": " Test Category"
        }

        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 201)

    # NOTE: Negative Create Case #
    def test_create_existing_course(self):
        API = self.URL + "/TestCourse1"
        data = {
            "course_name": "Test Course 1",
            "course_desc": "This is to test course 1",
            "course_status": "Active",
            "course_type": "Test Type",
            "course_category": " Test Category"
        }

        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 400)

    # NOTE: Happy Update Case #
    def test_update_course(self):
        API = self.URL + "/TestCourse1"
        data = {
            "course_status": "Retired"
        }

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)

    # NOTE: Negative Update Case #
    def test_update_course_missing(self):
        API = self.URL + "/TestCourseFail"
        data = {
            "course_status": "Retired"
        }

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Get Skills of Course Case #
    def test_get_skills_of_course(self):
        API = self.URL + "/TestCourse1/skills"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["course_id"], "TestCourse1")
        self.assertEqual(len(response.json()["data"]["skills"]), 1)

    # NOTE: Negative Get Skills of Course Case #
    def test_get_skills_of_course_missing(self):
        API = self.URL + "/TestCourseFail/skills"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Get Staffs of Course Case #
    def test_get_staffs_of_course(self):
        API = self.URL + "/TestCourse1/staffs"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["staffs"][0]["staff_id"],171009)
    
    # NOTE: Negative Get Staffs of Course Case #
    def test_get_staffs_of_course_missing(self):
        API = self.URL + "/TestCourseFail/staffs"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Get Staffs of Course Case #
    def test_get_learning_journeys_of_course(self):
        API = self.URL + "/TestCourse1/learning_journeys"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["learning_journeys"][0]["learning_journey_id"],"171009_4")
    
    # NOTE: Negative Get Staffs of Course Case #
    def test_get_learning_journeys_of_course_missing(self):
        API = self.URL + "/TestCourseFail/learning_journeys"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)
class TestLearningJourneyAPI(unittest.TestCase):
    URL = "http://localhost:5001/learning_journeys"

    def test_get_all_learning_journeys(self):
        API = self.URL

        response = requests.get(API)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["data"]["learning_journeys"][0]), 4)

    # NOTE: Happy Get Case #
    def test_get_learning_journeys_by_staffID(self):
        API = self.URL + "/171009"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual (len(response.json()["data"][0]), 4)

    # NOTE: Negative Get Case #
    def test_get_learning_journeys_by_staffID_missing(self):
        API = self.URL + "/0"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Create Case #
    def test_create_new_learning_journey(self):
        API = self.URL + "/171009_4"
        data = {
            "learning_journey_name": "Test Learning Journey 1",
            "role_id": 4,
            "staff_id": 171009,
            "courses": ["TestCourse1"]
        }

        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 201)
    
    # NOTE: Negative Create Case #
    def test_create_existing_learning_journey(self):
        API = self.URL + "/171009_4"
        data = {
            "learning_journey_name": "Test Learning Journey 1",
            "role_id": 4,
            "staff_id": 171009,
            "courses": ["TestCourse1"]
        }

        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 400)

    # NOTE: Happy Get Case #
    def test_get_courses_of_learning_journey(self):
        API = self.URL + "/171009_4/courses"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
    
    # NOTE: Negative Get Case #
    def test_get_courses_of_learning_journey_missing(self):
        API = self.URL + "/000000_0/courses"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Update Case #
    def test_update_course_in_learning_journey(self):
        API = self.URL + "/171009_4/update"
        data = {
            "learning_journey_name": "Test Learning Journey 1",
            "remove": [],
            "add": ["TestCourse1"]
        }
        
        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)

    # NOTE: Negative Update Case #
    def test_update_course_in_learning_journey_missing(self):
        API = self.URL + "/000000_0/update"
        data = {
            "learning_journey_name": "Test Learning Journey 1",
            "remove": [],
            "add": ["TestCourse1"]
        }

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)
class TestRoleAPI(unittest.TestCase):
    URL = "http://localhost:5001/roles"

    def test_get_all_roles(self):
        API = self.URL
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(len(response.json()["data"]["roles"][0]), 5)

    # NOTE: Happy Get by ID Case #
    def test_get_role_by_role_id(self):
        API = self.URL + "/4"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["role_id"], 4)

    # NOTE: Negative Get by ID Case #
    def test_get_role_by_role_id_missing(self):
        API = self.URL + "/0"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Get by Name Case #
    def test_get_role_by_role_name(self):
        API = self.URL + "/Test Role 1"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["role_name"], "Test Role 1")

    # NOTE: Negative Get by Name Case #
    def test_get_role_by_role_name(self):
        API = self.URL + "/Test Role Missing"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Create Case #
    def test_create_role(self):
        API = self.URL + "/Test Role 1"
        data = {
            "role_desc": "This is to test create role 1.",
            "role_dept": "Tech",
            "status": "Active"
        }

        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 201)

    # NOTE: Negative Create Case #
    def test_create_existing_role(self):
        API = self.URL + "/Test Role 1"
        data = {
            "role_desc": "This is to test create existing role 1.",
            "role_dept": "Tech",
            "status": "Active"
        }

        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 400)

    # NOTE: Happy Update Case #
    def test_update_role(self):
        API = self.URL + "/4"
        data = {
            "status": "Retired"
        }

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)

    # NOTE: Negative Update Case #
    def test_update_role_fail(self):
        API = self.URL + "/0"
        data = {
            "status": "Retired"
        }

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Get Case #
    def test_get_skills_of_role(self):
        API = self.URL + "/4"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["role_id"], 4)

    # NOTE: Negative Get Case #
    def test_get_skills_of_role_missing(self):
        API = self.URL + "/0"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Update Case #
    def test_update_skills_of_role(self):
        API = self.URL + "/4/skills"
        data = {
                "remove": [],
                "add": [7]      
            }

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["role"]["role_id"], 4)

    # NOTE: Negative Update Case #
    def test_update_skills_of_role_missing(self):
        API = self.URL + "/0/skills"
        data = {
                "remove": [],
                "add": [7]      
            }

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)
class TestSkillAPI(unittest.TestCase):
    URL = "http://localhost:5001/skills"

    def test_get_all_skills(self):
        API = self.URL
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(len(response.json()["data"]["skills"][0]), 4)

    # NOTE: Happy Get by ID Case #
    def test_get_skill_by_skill_id(self):
        API = self.URL + "/1"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["skill_id"], 1)

    # NOTE: Negative Get by ID Case #
    def test_get_skill_by_skill_id_missing(self):
        API = self.URL + "/0"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Get by Name Case #
    def test_get_skill_by_skill_name(self):
        API = self.URL + "/Test Skill 1"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["skill_name"], "Test Skill 1")

    # NOTE: Negative Get by Name Case #
    def test_get_skill_by_skill_name_missing(self):
        API = self.URL + "/Test Skill Missing"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Create Case #
    def test_create_skill(self):
        API = self.URL + "/Test Skill 1"
        data = {
            "skill_desc": "This is to test create skill 1.",
            "status": "Active",
            "courses": ["TestCourse1"]
        }

        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 201)

    # NOTE: Happy Update Case #
    def test_update_skill_status(self):
        API = self.URL + "/7"
        data = {
            "status": "Retired",
            "skill_desc": "This is to test create skill 1.",
            "remove": [],
            "add": []
        }

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)

    # NOTE: Negative Update Case #
    def test_update_skill_status_fail(self):
        API = self.URL + "/0"
        data = {
            "status": "Retired",
            "skill_desc": "This is to test create skill 0.",
            "remove": [],
            "add": []
        }

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Negative Create Case #
    def test_create_existing_skill(self):
        API = self.URL + "/Test Skill 1"
        data = {
            "skill_desc": "This is to test create skill 1.",
            "status": "Active",
            "courses": []
        }

        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 400)

    # NOTE: Happy Update Case #
    def test_update_courses_of_skill(self):
        API = self.URL + "/7"
        data = {
                "status": "Active",
                "skill_desc": "This is to test create skill 1.",
                "remove":[] ,
                "add": ["TestCourse1"]
            }

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)

    # NOTE: Happy Get Case #
    def test_get_roles_of_skills(self):
        API = self.URL + "/7/roles"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["skill_id"], 7)

    # NOTE: Negative Get Case #
    def test_get_roles_of_skills_missing(self):
        API = self.URL + "/0/roles"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Get Case #
    def test_get_courses_of_skills(self):
        API = self.URL + "/7/courses"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["skill_id"], 7)

    # NOTE: Negative Get Case #
    def test_get_courses_of_skills_missing(self):
        API = self.URL + "/0/courses"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Get Case #
    def test_get_staffs_of_skills(self):
        API = self.URL + "/7/staffs"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["skill_id"], 7)

    # NOTE: Negative Get Case #
    def test_get_staffs_of_skills_missing(self):
        API = self.URL + "/0/staffs"

        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)
class TestStaffAPI(unittest.TestCase):
    URL = "http://localhost:5001/staffs"

    def test_get_all_staffs(self):
        API = self.URL
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(len(response.json()["data"]["staffs"][0]), 7)

    def test_staff_by_staff_id(self):
        API = self.URL + "/171009"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 200)
        self.assertEqual(response.json()["data"]["staff_id"], 171009)

    # NOTE: Negative Get by ID Case #  
    def test_staff_by_staff_id_missing(self):
        API = self.URL + "/0"
        response = requests.get(API)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Create Case #
    def test_create_staff(self):
        API = self.URL + "/teststaff1@mail.com"
        data = {
            "staff_fname": "Test",
            "staff_lname": "Staff 1",
            "dept": "Sales",
            "type": 2,
            "status": "Active"
        }

        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 201)

    # NOTE: Negative Create Case #
    def test_create_existing_staff(self):
        API = self.URL + "/teststaff1@mail.com"
        data = {
            "staff_fname": "Test",
            "staff_lname": "Staff 1",
            "dept": "Sales",
            "type": 2,
            "status": "Active"
        }

        response = requests.post(API, json=data)
        self.assertEqual(response.json()["code"], 400)

    # NOTE: Happy Update Case #
    def test_update_staff(self):
        API = self.URL + "/171009"
        data = {
            "status": "Retired"
        }

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 200)

    # NOTE: Negative Update Case #
    def test_update_staff_fail(self):
        API = self.URL + "/000000"
        data = {
            "status": "Retired"
        }

        response = requests.put(API, json=data)
        self.assertEqual(response.json()["code"], 404)

    # NOTE: Happy Get Case #
    def test_get_courses_of_staff(self):
        API = self.URL+"/171009/courses"

        response = requests.get(API)
        self.assertEqual(response.json()["code"],200)
        self.assertEqual(response.json()["data"]["staff_id"],171009)

    # NOTE: Negative Get Case #
    def test_get_courses_of_staff_misssing(self):
        API = self.URL+"/000000/courses"

        response = requests.get(API)
        self.assertEqual(response.json()["code"],404)

    # NOTE: Happy Get Case #
    def test_get_skills_of_staff(self):
        API = self.URL+"/171009/skills"

        response = requests.get(API)
        self.assertEqual(response.json()["code"],200)
        self.assertEqual(response.json()["data"]["staff_id"],171009)

    # NOTE: Negative Get Case #
    def test_get_skills_of_staff_misssing(self):
        API = self.URL+"/000000/skills"

        response = requests.get(API)
        self.assertEqual(response.json()["code"],404)
if __name__ == "__main__":
    unittest.main()
