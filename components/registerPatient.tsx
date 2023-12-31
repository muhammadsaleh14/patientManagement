import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Modal from "react-modal";
import RegisterPatientForm from "@/components/registerPatientForm";
import Button from "@mui/material/Button";
const RegisterPatient = ({
  setSearchTerm,
}: {
  setSearchTerm: Dispatch<SetStateAction<string>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    Modal.setAppElement("#addNewPatient");
  }, []);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
      width: "50%", // Adjust the width as needed
      height: "80%", // Adjust the height as needed
      border: "none",
      borderRadius: "8px",
      padding: 0,
      overflow: "auto",
    },
  };

  return (
    <div>
      <div
        id="addNewPatient"
        className="inline-block"
        onClick={() => setIsOpen(true)}
      >
        <Button className="bg-indigo-300">Add new Patient +</Button>
      </div>
      {isClient && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
          <div className="rounded-lg p-6">
            <RegisterPatientForm
              setSearchTerm={setSearchTerm}
              setIsOpen={setIsOpen}
            />
            <Button
              onClick={() => setIsOpen(false)}
              variant="outlined"
              color="primary"
              className="m-auto w-full"
            >
              Close Modal
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RegisterPatient;
