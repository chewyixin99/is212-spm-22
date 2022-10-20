// import logo from './logo.svg';
import React from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

// Component imports
import LearningJourneyPage from './components/learningJourney/LearningJourney'
import MyLearningJourney from './components/learningJourney/MyLearningJourney'
import NewLearningJourney from './components/learningJourney/NewLearningJourney'
import Course from './components/course/Course'
import Skill from './components/skills/Skills'
import Role from './components/roles/Roles'

// Page imports
import NotFound from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import AdminOutlet from './pages/admin/AdminOutlet'
import AdminHomePage from './pages/admin/AdminHomePage'
import AdminRolesPage from './pages/admin/AdminRolesPage'
import AdminNewRole from './pages/admin/AdminNewRole'
import AdminSkillsPage from './pages/admin/AdminSkillsPage'
import AdminNewSkill from './pages/admin/AdminNewSkill'
import AdminNewSkillPreview from './pages/admin/AdminNewSkillPreview'
import AdminEditSkill from './pages/admin/AdminEditSkill'
import StaffOutlet from './pages/staff/StaffOutlet'
import StaffHomePage from './pages/staff/StaffHomePage'
import ManagerOutlet from './pages/manager/ManagerOutlet'
import ManagerHomePage from './pages/manager/ManagerHomePage'

function App() {
  return (
    <>
      {/* https://www.youtube.com/watch?v=Ul3y1LXxzdU&ab_channel=WebDevSimplified */}
      <Routes>
        {/* Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* component StaffOutlet contains its own context (data, navbar),
        and all its nested routes will have access to it */}
        <Route path="/staff" element={<StaffOutlet />}>
          {/* all types of users will share these routes as all users are staff */}
          {/* shows all learning journey for this staff */}
          <Route index element={<StaffHomePage />} />
          <Route path="learning-journey">
            {/* shows all learning journey for this staff */}
            <Route index element={<LearningJourneyPage />} />
            {/* shows a specific learning journey for this staff */}
            <Route path=":id" element={<MyLearningJourney />} />
            {/* create new learning journey for this staff */}
            <Route path="new" element={<NewLearningJourney />} />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminOutlet />}>
          <Route index element={<AdminHomePage />} />
          <Route path="roles" element={<AdminRolesPage />} />
          <Route path="newrole" element={<AdminNewRole />} />
          <Route path="skills" element={<AdminSkillsPage />} />
          <Route path="newskill" >
            <Route index element={<AdminNewSkill />} />
            <Route path="preview" element={<AdminNewSkillPreview />} />
          </Route>

          <Route path="courses">
            <Route path=":course_id" element={<Course />} />
          </Route>
          <Route path="skills">
            <Route path=":skill_id" >
              <Route index element={<Skill />} />
              <Route path="edit" element={<AdminEditSkill />} />
            </Route>
          </Route>
          
          <Route path="roles">
            <Route path=":role_id" element={<Role />} />
          </Route>
        </Route>

        <Route path="/manager" element={<ManagerOutlet />}>
          <Route index element={<ManagerHomePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
