interface Doctor {
  id: string;
  name: string;
  profession: string;
  details: DoctorDetails[];
}

export interface DoctorDetails {
  id: string;
  details: string;
  doctorId: string;
  doctor: Doctor;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  visits: Visit[];
}

export interface Visit {
  id: string;
  date: string;
  patientId: Patient["id"];
  patientDetails: PatientDetails[];
  prescriptions: Prescription[];
}

export interface PatientDetails {
  id: string;
  details: string;
  detailHeading: string;
  visitId: Visit["id"];
}

export interface Prescription {
  id: string;
  prescription: string;
  dateId: number;
  visitId: Visit["id"];
}

export interface VisitDetailTitle {
  id: string;
  title: string;
  _count: {
    visitDetails: number;
  };
  visitDetails: VisitDetail[];
}

export interface VisitDetail {
  id: string;
  // titleId: number;
  description: string;
  visitDetailTitle: VisitDetailTitle;
  visitId: string;
}
