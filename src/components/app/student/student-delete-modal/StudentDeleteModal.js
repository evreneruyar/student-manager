import React from "react";
import "./StudentDeleteModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { StudentContext } from "../../../../context/student/StudentContext";

const StudentDeleteModal = ({ student, isDeleteModal, setIsDeleteModal }) => {
  const { deleteStudent } = useContext(StudentContext);
  const [isDeletedLoading, setIsDeletedLoading] = useState(false);

  return (
    <div className={isDeleteModal ? "overlay" : ""}>
      <div className="delete-modal-container">
        <div className="delete-modal">
          <div className="close">
            <FontAwesomeIcon
              icon={faXmark}
              className="btn-close"
              onClick={() => setIsDeleteModal(false)}
            />
          </div>
          <div className="delete-modal-header">
            <FontAwesomeIcon
              icon={isDeletedLoading ? faSpinner : faCircleExclamation}
              spin={isDeletedLoading ? true : undefined}
              size="2xl"
              style={{ color: "#fe0000" }}
            />
            <h3>Are you sure to delete this student?</h3>
          </div>
          <div className="delete-modal-btn">
            <button
              className="btn-modal btn-modal-cancel"
              onClick={() => {
                setIsDeleteModal(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn-modal btn-modal-delete"
              onClick={async () => {
                setIsDeletedLoading(true);
                await deleteStudent(student.id);
                setIsDeletedLoading(false);
                setIsDeleteModal(false);
              }}
              disabled={isDeletedLoading}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDeleteModal;
