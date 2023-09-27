import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/shared/header/Header";

import StudentProvider from "./context/student/StudentContext";
import FormProvider from "./context/student/FormContext";

import HomePageView from "./view/app/home-page/HomePageView";
import StudentListView from "./view/app/student-list/StudentListView";
import StudentFormView from "./view/app/student-form/StudentFormView";
import LoginFormView from "./view/auth/login/LoginFormView";
import SignupFormView from "./view/auth/sign-up/SignupFormView";
import NotFoundView from "./view/shared/not-found/NotFoundView";
import AuthProvider from "./context/auth/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header headerTitle={"Student Manager"} />
        <StudentProvider>
          <FormProvider>
            <Routes>
              <Route path="/" element={<HomePageView />} />
              <Route path="/students" element={<StudentListView />} />
              <Route path="/add-student" element={<StudentFormView />} />
              <Route path="/login" element={<LoginFormView />} />
              <Route path="/sign-up" element={<SignupFormView />} />
              <Route path="*" element={<NotFoundView />} />
            </Routes>
          </FormProvider>
        </StudentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
