import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import axios from "axios";
import AutoCloseAlert from "./ui/autoCloseAlert";

const RegisterPatientForm = ({
  setSearchTerm,
  setIsOpen,
}: {
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [alert, setAlert] = useState<{
    title: string;
    severity: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const tempName = name;
    setIsOpen(false);
    await axios
      .post("/api/patients", { name, age, gender })
      .then(() => {
        setName("");
        setAge("");
        setGender("male");
        setAlert({
          title: "Patient created successfully",
          severity: "success",
          message: "",
        });
        setSearchTerm(tempName);
      })
      .catch((error) => {
        setAlert({
          title: "Error Creating patient",
          severity: "error",
          message: error,
        });
      });
  };
  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <div className="m-4">
      {alert && (
        <AutoCloseAlert
          title={alert.title}
          severity={alert.severity}
          message={alert.message}
          onClose={clearAlert}
        />
      )}

      <form onSubmit={handleSubmit}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register Patient
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Age"
            type="number"
            variant="outlined"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <RadioGroup
            aria-label="gender"
            name="gender"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <Button
            className="text-black bg-blue-500"
            type="submit"
            variant="contained"
            // className="text-black"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default RegisterPatientForm;
