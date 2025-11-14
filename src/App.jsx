import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import './App.css'
import EduNotifyLanding from './components/EduNotifyLanding'
import EduNotifyLogin from './components/EduNotifyLogin'
import EduNotifySignUp from './components/EduNotifySignUp';
import TeacherLogin from './components/TeacherLogin';
import TeacherSignUp from './components/TeacherSignUp';
import ViewNoticePage from './components/ViewNoticePage'
import NotificationsPage from './components/NotificationsPage'
import ManageNoticePage from './components/ManageNoticePage';
import UploadNoticePage from './components/UploadNoticePage';
import TeacherViewNoticePage from './components/TeacherViewNoticePage';

function App() {


  return (
    <>
      <Router>

        {/* Landing page */}
        <Routes>
          {/* <Route path="/" element={<EduNotifyLanding />} /> */}

          <Route
            path="/"
            element={
              localStorage.getItem("id")
                ? <Navigate to={`/${localStorage.getItem("id")}/teachview`} />

                : localStorage.getItem("email")
                  ? <Navigate to={`/${localStorage.getItem("email")}/viewnotice`} />

                  : <EduNotifyLanding />
            }
          />



          {/* Login page */}

          <Route path="/studentlogin" element={<EduNotifyLogin />} />


          {/* Sign up */}

          <Route path="/studentsignup" element={<EduNotifySignUp />} />


          {/* Login page */}

          <Route path="/teacherlogin" element={<TeacherLogin />} />


          {/* Sign up */}

          <Route path="/teachersignup" element={<TeacherSignUp />} />

          {/* View notice */}

          {/* Students*/}

          <Route path="/:email/viewnotice" element={<ViewNoticePage />} />

          <Route path="/:email/notification" element={<NotificationsPage />} />

          {/* Students*/}
          <Route path="/:id/teachview" element={<TeacherViewNoticePage />} />

          <Route path="/:id/postnotice" element={<UploadNoticePage />} />

          <Route path="/:id/managenotice" element={<ManageNoticePage />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
