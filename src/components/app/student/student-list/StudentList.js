import React, { useContext, useState } from "react";
import StudentCard from "../student-card/StudentCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { StudentContext } from "../../../../context/student/StudentContext";
import { AuthContext } from "../../../../context/auth/AuthContext";

const StudentList = () => {
  const { studentList, isLoading } = useContext(StudentContext);
  const { userData } = useContext(AuthContext);

  const [searchStudent, setSearchStudent] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const list = studentList.filter(
    (student) => student.userId === userData.userId
  );

  const handleChange = (e) => {
    setSearchStudent(e.target.value);
    const searchText = e.target.value.trim().toLowerCase();
    if (searchText) {
      const searchResult = list.filter((student) =>
        student.studentName.toLowerCase().includes(searchText)
      );
      setFilteredList(searchResult);
    } else {
      setFilteredList([]);
    }
  };

  return (
    <div className="student-list">
      {filteredList.length ? (
        <h3>Search Results</h3>
      ) : searchStudent.trim() !== "" ? (
        <h3>Search Results</h3>
      ) : (
        <h3>Students</h3>
      )}
      <div className="search-bar">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="lg"
          className="search-icon"
        />
        <input
          className="search-input"
          type="text"
          placeholder="Search student..."
          onChange={handleChange}
          value={searchStudent}
        />
      </div>
      <div className="student-list-container">
        {filteredList.length ? (
          filteredList.map((student, index) => (
            <StudentCard key={index} student={student} />
          ))
        ) : searchStudent.trim() !== "" ? (
          <p>Student not found!</p>
        ) : (
          list.map((student, index) => (
            <StudentCard key={index} student={student} />
          ))
        )}
        {isLoading.get && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default StudentList;
