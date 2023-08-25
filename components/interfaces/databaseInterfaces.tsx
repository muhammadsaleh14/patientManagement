export interface Doctor {
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
  details: PatientDetails[];
  prescriptions: Prescriptions[];
}

export interface PatientDetails {
  id: number;
  details: string;
  detailHeading: string;
  patientId: number;
  patient: Patient;
  date: string;
}

export interface Prescriptions {
  id: number;
  prescription: string;
  date: Date;
  patientId: number;
  patient: Patient;
}
