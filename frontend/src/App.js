// import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import LearningJourney from './pages/LearningJourney';
import MyLearningJourney from './pages/MyLearningJourney';
import NewLearningJourney from './pages/NewLearningJourney';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Admin from './pages/admin/Admin';
import Manager from './pages/manager/Manager';
import Staff from './pages/Staff';

function App() {
  return (
    <>
    {/* https://www.youtube.com/watch?v=Ul3y1LXxzdU&ab_channel=WebDevSimplified */}
    <Routes>
      {/* Login */}
      <Route path="/" element={<Navigate to={'/login'} replace />}/>
      <Route path="/login" element={<Login/>}/>

      <Route path="/admin" element={<Admin/>}/>

      <Route path="/manager" element={<Manager/>}/>

      {/* component Staff contains its own context (data, navbar) and all its nested routes will have access to it */}
      <Route path="/staff" element={<Staff/>}>
        {/* all types of users will share these routes as all users are staff */}
        {/* shows all learning journey for this staff */}
        <Route index element={<Home />}></Route>
        <Route path="learning-journey">
          {/* shows all learning journey for this staff */}
          <Route index element={<LearningJourney />}/>
          {/* shows a specific learning journey for this staff */}
          <Route path=":id" element={<MyLearningJourney />}/>
          {/* create new learning journey for this staff */}
          <Route path="new" element={<NewLearningJourney />}/>
        </Route>

      </Route>

      <Route path="*" element={<NotFound />}/>
    </Routes>
    </>

  );
}

export default App;
