-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeviceLoginCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codeHash" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "usedAt" DATETIME,
    "deviceId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DeviceLoginCode_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "HostDevice" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DeviceLoginCode" ("codeHash", "createdAt", "deviceId", "expiresAt", "id", "usedAt") SELECT "codeHash", "createdAt", "deviceId", "expiresAt", "id", "usedAt" FROM "DeviceLoginCode";
DROP TABLE "DeviceLoginCode";
ALTER TABLE "new_DeviceLoginCode" RENAME TO "DeviceLoginCode";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
