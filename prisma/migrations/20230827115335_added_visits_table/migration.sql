/*
  Warnings:

  - You are about to drop the column `date` on the `PatientDetails` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `PatientDetails` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Prescriptions` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Prescriptions` table. All the data in the column will be lost.
  - Added the required column `dateId` to the `PatientDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateId` to the `Prescriptions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "visit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "patientId" INTEGER NOT NULL,
    CONSTRAINT "visit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatientDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "details" TEXT NOT NULL,
    "detailHeading" TEXT NOT NULL,
    "dateId" INTEGER NOT NULL,
    CONSTRAINT "PatientDetails_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "visit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatientDetails" ("detailHeading", "details", "id") SELECT "detailHeading", "details", "id" FROM "PatientDetails";
DROP TABLE "PatientDetails";
ALTER TABLE "new_PatientDetails" RENAME TO "PatientDetails";
CREATE INDEX "patientDetailsId" ON "PatientDetails"("id");
CREATE TABLE "new_Prescriptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prescription" TEXT NOT NULL,
    "dateId" INTEGER NOT NULL,
    CONSTRAINT "Prescriptions_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "visit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prescriptions" ("id", "prescription") SELECT "id", "prescription" FROM "Prescriptions";
DROP TABLE "Prescriptions";
ALTER TABLE "new_Prescriptions" RENAME TO "Prescriptions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
