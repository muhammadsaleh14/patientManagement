/*
  Warnings:

  - A unique constraint covering the columns `[visitId,detailHeading]` on the table `PatientDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PatientDetails_visitId_detailHeading_key" ON "PatientDetails"("visitId", "detailHeading");
