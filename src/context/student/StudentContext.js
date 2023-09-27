import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const StudentContext = createContext();

const StudentProvider = ({ children }) => {
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState({
    add: false,
    get: false,
  });

  const addNewStudent = async ({
    studentName,
    instructorName,
    courseName,
    userId,
  }) => {
    setIsLoading((prevIsLoading) => ({ ...prevIsLoading, add: true }));
    const newStudent = { studentName, instructorName, courseName, userId };
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/students`,
      newStudent
    );
    if (response.status === 201) {
      setStudentList((previousStudentList) => [
        ...previousStudentList,
        response.data,
      ]);
    }
    setIsLoading((prevIsLoading) => ({ ...prevIsLoading, add: false }));
  };

  const deleteStudent = async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/students/${id}`
    );
    if (response.status === 200) {
      setStudentList((previousStudentList) =>
        previousStudentList.filter((student) => student.id !== id)
      );
    }
  };

  const editStudent = async ({
    id,
    studentName,
    instructorName,
    courseName,
  }) => {
    setIsLoading((prevIsLoading) => ({ ...prevIsLoading, add: true }));
    const editedStudent = { studentName, instructorName, courseName };

    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/students/${id}`,
      editedStudent
    );
    if (response.status === 200) {
      setStudentList((previousStudentList) =>
        previousStudentList.map((student) =>
          student.id === id ? { ...student, ...editedStudent } : student
        )
      );
    }
    setIsLoading((prevIsLoading) => ({ ...prevIsLoading, add: false }));
  };

  useEffect(() => {
    const controller = new AbortController();

    const getStudentList = async () => {
      try {
        setIsLoading((prevIsLoading) => ({ ...prevIsLoading, get: true }));
        const response = await axios(
          `${process.env.REACT_APP_BACKEND_URL}/students`,
          { signal: controller.signal }
        );
        setStudentList(response.data);
        setIsLoading((prevIsLoading) => ({ ...prevIsLoading, get: false }));
      } catch (error) {
        setIsLoading((prevIsLoading) => ({ ...prevIsLoading, get: false }));
        if (error.name === "AxiosError") {
          console.log(error.message);
        } else {
          console.log("Something went wrong!", error.message);
        }
      }
    };
    getStudentList();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <StudentContext.Provider
      value={{
        studentList,
        addNewStudent,
        deleteStudent,
        isLoading,
        editStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
