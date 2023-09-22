"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
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
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterPatient from "@/components/registerPatient";
import AutoCloseAlert from "@/components/ui/autoCloseAlert";
import { useRouter } from "next/navigation";
import AddBox from "@mui/icons-material/AddBox";
import HistoryOfPatient from "@/components/historyOfPatientModal";
import HistoryOfPatientModal from "@/components/historyOfPatientModal";
import { Patient } from "@/components/interfaces/databaseInterfaces";
import { format, parse } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getPatient, getPatientState } from "../GlobalRedux/store/patientSlice";
import { setPatient } from "@/app/GlobalRedux/store/patientSlice";
import { store } from "../GlobalRedux/store/store";
import SettingsIcon from "@mui/icons-material/Settings";
import { formatDateString } from "../GlobalRedux/utilMethods";
import deleteAlert from "@/components/ui/confirmDelete";
import DeleteDialog from "@/components/ui/deleteDialog";
import AddVisitPermission from "@/components/ui/addVisitPermission";
// export interface Patient {
//   id: number;
//   name: string;
//   age: number;
//   gender: string;
//   details: Array<{
//     details: string;
//     detailHeading: string;
//     date: string;
//   }> | null;
// }

const Page: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [isHovered, setIsHovered] = useState(false);
  const [patientId, setPatientId] = useState<null | number>(null);
  const patient = useSelector(getPatient);
  //? setPatient imported from redux

  // //console.log("patients/page");
  const [alert, setAlert] = useState<{
    title: string;
    severity: "success" | "error";
    message: string;
  } | null>(null);
  async function getCompletePatientForStore(id: number) {
    try {
      console.log(id);
      await store.dispatch(setPatient(id));
    } catch (error) {
      console.error("Error fetching patient:", error);
    }
  }
  function getCurrentDate() {
    // const temp = parse(date, "hh:mm:ss a dd/MM/yyyy", new Date())
    const currentDate = new Date();
    const formattedDate = format(currentDate, "hh:mm:ss a dd/MM/yyyy");
    return formattedDate;
  }
  async function fetchPatients() {
    try {
      const response = await axios.get("/api/patients/table");
      // const patients = response.map((patient) => {
      //   patient.visits.map(
      //     (visit) => (visit.date = formatDateString(visit.date))
      //   );
      // });
      // visit.date = ;
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.age.toString().includes(searchTerm) ||
      patient.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const filteredPatients = patients;
  // console.log(filteredPatients);

  useEffect(() => {
    fetchPatients();
  }, []);

  const deletePatient = (patientId: number) => {
    axios
      .delete("/api/patients/" + patientId)
      .then((response) => {
        setPatients((prevPatients) =>
          prevPatients.filter((p) => p.id !== patientId)
        );
        setAlert({
          title: "Patient deleted",
          severity: "success",
          message: "",
        });
      })
      .catch(() => {
        //console.log("delete patient failed");
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
      <RegisterPatient />
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
              <TableCell className="text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow
                key={patient.id}
                className="bg-slate-500"
                // onMouseEnter={() => setIsHovered(true)}
                // onMouseLeave={() => setIsHovered(false)}
                // onClick={() => axios.get(`/patients/${patient.id}`)}
              >
                <TableCell
                  className={`font-medium w-80 hover:cursor-pointer`}
                  onClick={() => router.push(`/patients/${patient.id}`)}
                >
                  {patient.name}
                </TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell className="">
                  {patient?.visits[0]?.date ?? "Not available"}
                </TableCell>
                <TableCell className="bg-slate-200 p-2  ">
                  <div className="shadow-md rounded-md h-full flex justify-between">
                    <Box className="flex justify-around w-full">
                      <AddVisitPermission
                        onAdd={() => {
                          router.push(
                            `/patients/${patient.id}?visitDate=` +
                              getCurrentDate()
                          );
                        }}
                        title="Adding Visit"
                        text={"Are you sure you want to add a new Visit"}
                      >
                        <Button variant="outlined" color="info">
                          <AddBox />
                        </Button>
                      </AddVisitPermission>
                      <Button
                        variant="outlined"
                        color="info"
                        className="inline-block"
                        onClick={() => {
                          getCompletePatientForStore(patient.id);
                        }}
                      >
                        <HistoryOfPatientModal />
                      </Button>
                      <DeleteDialog
                        title={`Are you sure you want to delete info of ${patient.name}`}
                        text={
                          "The details grouped with this heading will not be deleted, but will appear in the end of the details list"
                        }
                        onDelete={() => {
                          try {
                            deletePatient(patient.id);
                            // //console.log(details);
                          } catch (error) {
                            //console.log(error);
                          }
                        }}
                      >
                        <Button variant="outlined" color="warning">
                          <DeleteIcon />
                        </Button>
                      </DeleteDialog>
                    </Box>
                  </div>
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
