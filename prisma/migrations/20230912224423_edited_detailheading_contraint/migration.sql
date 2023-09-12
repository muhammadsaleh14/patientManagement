/*
  Warnings:

  - A unique constraint covering the columns `[detailHeading,visitId]` on the table `PatientDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PatientDetails_detailHeading_key";

-- CreateIndex
CREATE UNIQUE INDEX "PatientDetails_detailHeading_visitId_key" ON "PatientDetails"("detailHeading", "visitId");
