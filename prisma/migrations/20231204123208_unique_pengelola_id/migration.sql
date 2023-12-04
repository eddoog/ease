/*
  Warnings:

  - A unique constraint covering the columns `[pengelolaLaundryId]` on the table `JadwalOperasional` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JadwalOperasional_pengelolaLaundryId_key" ON "JadwalOperasional"("pengelolaLaundryId");
