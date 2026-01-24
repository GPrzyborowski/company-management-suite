-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LoginCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codeHash" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "usedAt" DATETIME,
    "employeeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LoginCode_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LoginCode" ("codeHash", "createdAt", "employeeId", "expiresAt", "id", "usedAt") SELECT "codeHash", "createdAt", "employeeId", "expiresAt", "id", "usedAt" FROM "LoginCode";
DROP TABLE "LoginCode";
ALTER TABLE "new_LoginCode" RENAME TO "LoginCode";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
