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
  prescriptions: Prescriptions[];
}

export interface PatientDetails {
  id: number;
  details: string;
  detailHeading: string;
  dateId: number;
  date: Visit;
}

export interface Prescriptions {
  id: number;
  prescription: string;
  dateId: number;
  date: Visit;
}
