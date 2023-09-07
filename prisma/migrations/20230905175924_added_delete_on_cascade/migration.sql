-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatientDetails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "details" TEXT NOT NULL,
    "detailHeading" TEXT NOT NULL,
    "visitId" INTEGER NOT NULL,
    CONSTRAINT "PatientDetails_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "visit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PatientDetails" ("detailHeading", "details", "id", "visitId") SELECT "detailHeading", "details", "id", "visitId" FROM "PatientDetails";
DROP TABLE "PatientDetails";
ALTER TABLE "new_PatientDetails" RENAME TO "PatientDetails";
CREATE INDEX "patientDetailsId" ON "PatientDetails"("id");
CREATE TABLE "new_Prescriptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prescription" TEXT NOT NULL,
    "visitId" INTEGER NOT NULL,
    CONSTRAINT "Prescriptions_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "visit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Prescriptions" ("id", "prescription", "visitId") SELECT "id", "prescription", "visitId" FROM "Prescriptions";
DROP TABLE "Prescriptions";
ALTER TABLE "new_Prescriptions" RENAME TO "Prescriptions";
CREATE TABLE "new_visit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "patientId" INTEGER NOT NULL,
    CONSTRAINT "visit_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_visit" ("date", "id", "patientId") SELECT "date", "id", "patientId" FROM "visit";
DROP TABLE "visit";
ALTER TABLE "new_visit" RENAME TO "visit";
CREATE UNIQUE INDEX "visit_date_key" ON "visit"("date");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
