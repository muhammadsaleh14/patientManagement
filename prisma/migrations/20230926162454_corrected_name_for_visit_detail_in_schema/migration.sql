/*
  Warnings:

  - You are about to drop the `VisitDetailsDescription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VisitDetailsDescription";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "VisitDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "visitId" INTEGER NOT NULL,
    CONSTRAINT "VisitDetail_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "VisitDetailTitle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "VisitDetail_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "visit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
