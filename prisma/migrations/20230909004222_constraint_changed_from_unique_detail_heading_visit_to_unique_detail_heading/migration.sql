/*
  Warnings:

  - A unique constraint covering the columns `[detailHeading]` on the table `PatientDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PatientDetails_visitId_detailHeading_key";

-- CreateIndex
CREATE UNIQUE INDEX "PatientDetails_detailHeading_key" ON "PatientDetails"("detailHeading");
