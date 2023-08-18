/*
  Warnings:

  - A unique constraint covering the columns `[name,age,gender]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Patient_name_age_gender_key" ON "Patient"("name", "age", "gender");
