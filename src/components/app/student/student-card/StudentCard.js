import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import StudentDeleteModal from "../student-delete-modal/StudentDeleteModal";
import { FormContext } from "../../../../context/student/FormContext";

const StudentCard = ({ student }) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { setFormValues, setIsEditing } = useContext(FormContext);

  return (
    <>
      {isDeleteModal && (
        <StudentDeleteModal
          student={student}
          isDeleteModal={isDeleteModal}
          setIsDeleteModal={setIsDeleteModal}
        />
      )}
      <div className="student-card">
        <FontAwesomeIcon
          icon={faDeleteLeft}
          className="btn-delete"
          onClick={() => {
            setIsDeleteModal(true);
          }}
        />
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="btn-edit"
          onClick={() => {
            setIsEditing(true);
            setFormValues({ ...student });
          }}
        />
        <ul>
          <li>{student.studentName}</li>
          <li>{student.instructorName}</li>
          <li>{student.courseName}</li>
        </ul>
      </div>
    </>
  );
};

export default StudentCard;
