import React, { useContext, useState } from "react";
import { StudentContext } from "../../../../context/student/StudentContext";
import { FormContext } from "../../../../context/student/FormContext";
import { AuthContext } from "../../../../context/auth/AuthContext";

const StudentForm = ({ children }) => {
  const { addNewStudent, isLoading, editStudent } = useContext(StudentContext);
  const { formValues, setFormValues, isEditing } = useContext(FormContext);
  const { userData } = useContext(AuthContext);

  const [errorMessages, setErrorMessages] = useState({
    studentNameError: false,
    instructorNameError: false,
    courseNameError: false,
  });

  const handleFormValuesChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
    setErrorMessages((prevErrorMessages) => ({
      ...prevErrorMessages,
      [`${name}Error`]: value === "" ? true : false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { id, studentName, instructorName, courseName } = formValues;

    if (
      isEditing &&
      studentName.trim() &&
      instructorName.trim() &&
      courseName.trim()
    ) {
      editStudent({ id, studentName, instructorName, courseName });
      setFormValues({
        studentName: "",
        instructorName: "",
        courseName: "",
      });
    }

    setErrorMessages({
      studentNameError: false,
      instructorNameError: false,
      courseNameError: false,
    });

    if (
      !isEditing &&
      studentName.trim() &&
      instructorName.trim() &&
      courseName.trim()
    ) {
      addNewStudent({
        studentName: studentName.trim(),
        instructorName: instructorName.trim(),
        courseName: courseName.trim(),
        userId: userData ? userData.userId : "",
      });
      setFormValues({
        studentName: "",
        instructorName: "",
        courseName: "",
      });
    } else {
      setErrorMessages({
        studentNameError: !studentName.trim(),
        instructorNameError: !instructorName.trim(),
        courseNameError: !courseName.trim(),
      });
    }
  };

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        {children}
        <div className="form-control">
          <input
            type="text"
            placeholder="Student name..."
            name="studentName"
            onChange={handleFormValuesChange}
            value={formValues.studentName}
          />
          {errorMessages.studentNameError && (
            <p className="input-error">Student name cannot be empty!</p>
          )}
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Instructor name..."
            name="instructorName"
            onChange={handleFormValuesChange}
            value={formValues.instructorName}
          />
          {errorMessages.instructorNameError && (
            <p className="input-error">Instructor name cannot be empty!</p>
          )}
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Course name..."
            name="courseName"
            onChange={handleFormValuesChange}
            value={formValues.courseName}
          />
          {errorMessages.courseNameError && (
            <p className="input-error">Course name cannot be empty!</p>
          )}
        </div>
        <button className="btn" disabled={isLoading.add}>
          {isLoading.add ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
