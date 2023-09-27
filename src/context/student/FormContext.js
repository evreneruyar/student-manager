import React, { createContext, useState } from "react";

export const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    studentName: "",
    instructorName: "",
    courseName: "",
    userId: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <FormContext.Provider
      value={{ formValues, setFormValues, isEditing, setIsEditing }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
