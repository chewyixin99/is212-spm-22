import unittest

from models.course import Course
from models.learning_journey import Learning_Journey
from models.role import Role
from models.skill import Skill
from models.staff import Staff


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
            learning_journey_id="130001_1",
            learning_journey_name="Product Manager 1",
            role_id=1,
            staff_id=130001,
        )

        self.assertEqual(
            lj1.to_dict(),
            {
                "learning_journey_id": "130001_1",
                "learning_journey_name": "Product Manager 1",
                "role_id": 1,
                "staff_id": 130001,
            },
        )


class TestRole(unittest.TestCase):
    def test_role(self):
        r1 = Role(
            role_name="Product Manager",
            role_desc="product manager lor",
            role_dept="Business Support",
            status="Active",
        )

        self.assertEqual(
            r1.to_dict(),
            {
                "role_id": None,
                "role_name": "Product Manager",
                "role_desc": "product manager lor",
                "role_dept": "Business Support",
                "status": "Active",
            },
        )


class TestSkill(unittest.TestCase):
    def test_skill(self):
        sk1 = Skill(
            skill_name="Python",
            skill_desc="General-purpose Programming language",
            status="Active",
        )

        self.assertEqual(
            sk1.to_dict(),
            {
                "skill_id": None,
                "skill_name": "Python",
                "skill_desc": "General-purpose Programming language",
                "status": "Active",
            },
        )


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


if __name__ == "__main__":
    unittest.main()
