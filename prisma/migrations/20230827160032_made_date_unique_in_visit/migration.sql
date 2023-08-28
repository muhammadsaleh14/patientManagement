/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `visit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "visit_date_key" ON "visit"("date");
