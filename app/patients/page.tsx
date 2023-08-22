"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { createContext, useEffect, useState } from "react";
import {
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterPatient from "@/components/registerPatient";
import AutoCloseAlert from "@/components/ui/autoCloseAlert";
import { useRouter } from "next/navigation";

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  details: Array<{
    details: string;
    detailHeading: string;
    date: string;
  }> | null;
}

export const usePatientContext = () => React.useContext(PatientContext);
const PatientContext = createContext<{
  patients: Patient[];
  fetchPatients: () => void;
} | null>(null);
const Page: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [alert, setAlert] = useState<{
    title: string;
    severity: "success" | "error";
    message: string;
  } | null>(null);
  async function fetchPatients() {
    try {
      const response = await axios.get("/api/patients/table");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }
  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.age.toString().includes(searchTerm) ||
      patient.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const deletePatient = (patient: Patient) => {
    axios
      .delete("/api/patients/" + patient.id)
      .then((response) => {
        setPatients((prevPatients) =>
          prevPatients.filter((p) => p.id !== patient.id)
        );
        setAlert({
          title: "Patient deleted",
          severity: "success",
          message: "",
        });
      })
      .catch(() => {
        console.log("delete patient failed");
        setAlert({
          title: "Deleting patient failed",
          severity: "error",
          message: "",
        });
      });
  };
  const router = useRouter();
  return (
    <div className="m-5">
      {alert && (
        <AutoCloseAlert
          title={alert.title}
          severity={alert?.severity}
          message={alert?.message}
          onClose={() => setAlert(null)}
        />
      )}

      <h1>Patients</h1>
      <PatientContext.Provider value={{ patients, fetchPatients }}>
        <RegisterPatient />
      </PatientContext.Provider>
      {/* Add your RegisterPatient component here */}
      <TextField
        id="standard-search"
        label="Search field"
        type="search"
        variant="standard"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="w-80">Full Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell className="">Last Visit</TableCell>
              <TableCell className="">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow
                key={patient.id}
                className=""
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                // onClick={() => axios.get(`/patients/${patient.id}`)}
              >
                <TableCell
                  className={`font-medium w-80 hover:cursor-pointer ${
                    isHovered ? "bg-blue-300 text-blue-600 text-xl" : ""
                  }`}
                  onClick={() => router.push(`/patients/${patient.id}`)}
                >
                  {patient.name}
                </TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell className="">
                  {patient.details ? patient.details[0].date : "Not available"}
                </TableCell>
                <TableCell className="">
                  <Button
                    onClick={() => deletePatient(patient)}
                    variant="outlined"
                    color="warning"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Page;
