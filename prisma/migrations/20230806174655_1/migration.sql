/*
  Warnings:

  - Added the required column `date` to the `PatientDetails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatientDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "details" TEXT NOT NULL,
    "detailHeading" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "PatientDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PatientDetails" ("detailHeading", "details", "id") SELECT "detailHeading", "details", "id" FROM "PatientDetails";
DROP TABLE "PatientDetails";
ALTER TABLE "new_PatientDetails" RENAME TO "PatientDetails";
CREATE INDEX "patientId" ON "PatientDetails"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
