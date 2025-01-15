-- CreateTable
CREATE TABLE "TimeTrials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "track_id" INTEGER NOT NULL,
    "character" TEXT NOT NULL,
    "lap1" TEXT NOT NULL,
    "lap2" TEXT NOT NULL,
    "lap3" TEXT NOT NULL,
    "final_time" TEXT NOT NULL,
    "notes" TEXT
);
