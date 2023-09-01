interface Doctor {
  id: number;
  name: string;
  profession: string;
  details: DoctorDetails[];
}

export interface DoctorDetails {
  id: number;
  details: string;
  doctorId: number;
  doctor: Doctor;
}

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  visits: Visit[];
}

export interface Visit {
  id: number;
  date: string;
  patientId: number;
  patient: Patient;
  patientDetails: PatientDetails[];
  prescriptions: Prescription[];
}

export interface PatientDetails {
  id: number;
  details: string;
  detailHeading: string;
  dateId: number;
  visitId: Visit["id"];
}

export interface Prescription {
  id: number;
  prescription: string;
  dateId: number;
  visitId: Visit["id"];
}
