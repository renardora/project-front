import "./styles/menu.css";

import Auth from "./components/Auth";
import Header from "./components/header";

import SchedulePage from "./components/Schedule.jsx";
import ManagerSchedule from "./components/manager-schedule.jsx";
import ScheduleForAup from "./components/ScheduleForAup.jsx";
import ScheduleForChbr from "./components/ScheduleForChbr.jsx";
import ScheduleForDr from "./components/ScheduleForDr.jsx";

import EmployeeOfTheMonthPage from "./components/EmployeeOfTheMonthPage.jsx";
import RatingOfEmployeesPage from "./components/rating.jsx";

import KingDom from "./components/kingdom.jsx";

import StandartsPage from "./components/Standarts";
import GuidancePage from "./components/guidance.jsx";
import ManagmentPage from "./components/Managment.jsx";
import ExperiencePage from "./components/experience.jsx";
import TrainingPage from "./components/Training.jsx";
import CBRPage from "./components/CBR.jsx";

import CabinetPage from "./components/cabinet.jsx";
import EmployeesPage from "./components/employees.jsx";
import ProfilePage from "./components/Profile.jsx";
import ProfileNewPage from "./components/ProfileNew.jsx";

import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <Header></Header>}
      <Routes>
        <Route path="/" Component={Auth}></Route>

        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager-schedule"
          element={
            <ProtectedRoute>
              <ManagerSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager-schedule/schedule-for-chbr"
          element={
            <ProtectedRoute>
              <ScheduleForChbr />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager-schedule/schedule-for-aup"
          element={
            <ProtectedRoute>
              <ScheduleForAup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/director-schedule"
          element={
            <ProtectedRoute>
              <ScheduleForDr />
            </ProtectedRoute>
          }
        />

        <Route
          path="/top_worker"
          element={
            <ProtectedRoute>
              <EmployeeOfTheMonthPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/top_worker/rating"
          element={
            <ProtectedRoute>
              <RatingOfEmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cabinet"
          element={
            <ProtectedRoute>
              <CabinetPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kingdom"
          element={
            <ProtectedRoute>
              <KingDom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kingdom/standarts"
          element={
            <ProtectedRoute>
              <StandartsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kingdom/standarts/:subSection"
          element={
            <ProtectedRoute>
              <GuidancePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kingdom/managment"
          element={
            <ProtectedRoute>
              <ManagmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kingdom/managment/:subSection"
          element={
            <ProtectedRoute>
              <ExperiencePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kingdom/training"
          element={
            <ProtectedRoute>
              <TrainingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kingdom/training/:subSection"
          element={
            <ProtectedRoute>
              <CBRPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees/add-employee"
          element={
            <ProtectedRoute>
              <ProfileNewPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
