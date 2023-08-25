import React, { useState, useEffect } from "react";
import Modal, { Props } from "react-modal";
import RegisterPatientForm from "@/components/registerPatientForm";
import Button from "@mui/material/Button";
import HistoryOfPatient from "./historyOfPatient";
import { usePatientContext } from "./";
const HistoryOfPatientModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    Modal.setAppElement("#historyOfPatient");
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
      width: "80%", // Adjust the width as needed
      height: "80%", // Adjust the height as needed
      border: "black",
      borderRadius: "8px",
      padding: 0,
      overflow: "auto",
    },
  };

  return (
    <div className="">
      <div
        id="historyOfPatient"
        className="inline-block"
        onClick={() => setIsOpen(true)}
      >
        {/* <Button variant="outlined" color="info" onClick={}> */}
        History
        {/* </Button> */}
      </div>
      {isClient && (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
          <div className="rounded-lg p-6">
            <HistoryOfPatient />
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

export default HistoryOfPatientModal;
