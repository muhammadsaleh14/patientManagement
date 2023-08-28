/*
  Warnings:

  - You are about to drop the column `dateId` on the `Prescriptions` table. All the data in the column will be lost.
  - You are about to drop the column `dateId` on the `PatientDetails` table. All the data in the column will be lost.
  - Added the required column `visitId` to the `Prescriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitId` to the `PatientDetails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prescriptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prescription" TEXT NOT NULL,
    "visitId" INTEGER NOT NULL,
    CONSTRAINT "Prescriptions_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "visit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prescriptions" ("id", "prescription") SELECT "id", "prescription" FROM "Prescriptions";
DROP TABLE "Prescriptions";
ALTER TABLE "new_Prescriptions" RENAME TO "Prescriptions";
CREATE TABLE "new_PatientDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "details" TEXT NOT NULL,
    "detailHeading" TEXT NOT NULL,
    "visitId" INTEGER NOT NULL,
    CONSTRAINT "PatientDetails_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "visit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatientDetails" ("detailHeading", "details", "id") SELECT "detailHeading", "details", "id" FROM "PatientDetails";
DROP TABLE "PatientDetails";
ALTER TABLE "new_PatientDetails" RENAME TO "PatientDetails";
CREATE INDEX "patientDetailsId" ON "PatientDetails"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
