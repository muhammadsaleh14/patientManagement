-- CreateTable
CREATE TABLE "Doctor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "profession" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DoctorDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "details" TEXT NOT NULL,
    "doctorId" INTEGER NOT NULL,
    CONSTRAINT "DoctorDetails_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PatientDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "details" TEXT NOT NULL,
    "detailHeading" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "PatientDetails_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Prescriptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prescription" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "patientId" INTEGER NOT NULL,
    CONSTRAINT "Prescriptions_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "doctorId" ON "DoctorDetails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_name_age_gender_key" ON "Patient"("name", "age", "gender");

-- CreateIndex
CREATE INDEX "patientDetailsId" ON "PatientDetails"("id");

-- CreateIndex
CREATE INDEX "prescriptionId" ON "Prescriptions"("id");
