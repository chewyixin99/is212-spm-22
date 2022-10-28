import unittest

from models.course import Course
from models.learning_journey import Learning_Journey
from models.staff import Staff


class TestStaff(unittest.TestCase):
    def test_staff(self):
        s1 = Staff(
            staff_fname="Jack",
            staff_lname="Sim",
            dept="CEO",
            email="jack.sim@allinone.com.sg",
            type=1,
            status="Active",
        )

        self.assertEqual(
            s1.to_dict(),
            {
                "staff_id": None,
                "staff_fname": "Jack",
                "staff_lname": "Sim",
                "dept": "CEO",
                "email": "jack.sim@allinone.com.sg",
                "type": 1,
                "status": "Active",
            },
        )


class TestCourse(unittest.TestCase):
    def test_course(self):
        c1 = Course(
            course_id="COR002",
            course_name="Lean Six Sigma Green Belt Certification",
            course_desc="Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics",
            course_status="Active",
            course_type="Internal",
            course_category="Core",
        )

        self.assertEqual(
            c1.to_dict(),
            {
                "course_id": "COR002",
                "course_name": "Lean Six Sigma Green Belt Certification",
                "course_desc": "Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics",
                "course_status": "Active",
                "course_type": "Internal",
                "course_category": "Core",
            },
        )


class TestLearningJourney(unittest.TestCase):
    def test_learning_journey(self):
        lj1 = Learning_Journey(
            learning_journey_name="Product Manager 1",
            role_id=1,
            staff_id=140002,
        )

        self.assertEqual(
            lj1.to_dict(),
            {
                "learning_journey_id": None,
                "learning_journey_name": "Product Manager 1",
                "role_id": 1,
                "staff_id": 140002,
            },
        )
