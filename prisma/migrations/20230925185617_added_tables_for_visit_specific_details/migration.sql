-- CreateTable
CREATE TABLE "VisitDetailTitle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VisitDetailsDescription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "visitId" INTEGER NOT NULL,
    CONSTRAINT "VisitDetailsDescription_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "VisitDetailTitle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "VisitDetailsDescription_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "visit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitDetailTitle_title_key" ON "VisitDetailTitle"("title");
