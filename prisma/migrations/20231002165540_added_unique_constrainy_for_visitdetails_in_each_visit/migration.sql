/*
  Warnings:

  - A unique constraint covering the columns `[titleId,visitId]` on the table `VisitDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VisitDetail_titleId_visitId_key" ON "VisitDetail"("titleId", "visitId");
