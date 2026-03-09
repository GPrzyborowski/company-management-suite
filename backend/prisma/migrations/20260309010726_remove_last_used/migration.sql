/*
  Warnings:

  - You are about to drop the column `lastUsedAt` on the `HostDevice` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HostDevice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deviceName" TEXT,
    "deviceCode" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdById" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" DATETIME,
    "revokedAt" DATETIME,
    CONSTRAINT "HostDevice_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HostDevice" ("activatedAt", "createdAt", "createdById", "deviceCode", "deviceName", "id", "isActive", "revokedAt") SELECT "activatedAt", "createdAt", "createdById", "deviceCode", "deviceName", "id", "isActive", "revokedAt" FROM "HostDevice";
DROP TABLE "HostDevice";
ALTER TABLE "new_HostDevice" RENAME TO "HostDevice";
CREATE UNIQUE INDEX "HostDevice_deviceCode_key" ON "HostDevice"("deviceCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
