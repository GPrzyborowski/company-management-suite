-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HostDevice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceName" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdById" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" DATETIME,
    "revokedAt" DATETIME,
    CONSTRAINT "HostDevice_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HostDevice" ("activatedAt", "createdAt", "createdById", "deviceName", "id", "isActive", "revokedAt") SELECT "activatedAt", "createdAt", "createdById", "deviceName", "id", "isActive", "revokedAt" FROM "HostDevice";
DROP TABLE "HostDevice";
ALTER TABLE "new_HostDevice" RENAME TO "HostDevice";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
