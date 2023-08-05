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
    CONSTRAINT "DoctorDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "Doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PatientDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "details" TEXT NOT NULL,
    "detailHeading" TEXT NOT NULL,
    CONSTRAINT "PatientDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "doctorId" ON "DoctorDetails"("id");

-- CreateIndex
CREATE INDEX "patientId" ON "PatientDetails"("id");
