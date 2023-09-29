/*
  Warnings:

  - Made the column `description` on table `VisitDetail` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "detailsLayout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "layout" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VisitDetail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "visitId" INTEGER NOT NULL,
    CONSTRAINT "VisitDetail_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "VisitDetailTitle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "VisitDetail_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "visit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_VisitDetail" ("description", "id", "titleId", "visitId") SELECT "description", "id", "titleId", "visitId" FROM "VisitDetail";
DROP TABLE "VisitDetail";
ALTER TABLE "new_VisitDetail" RENAME TO "VisitDetail";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
