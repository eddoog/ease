/*
  Warnings:

  - The primary key for the `JadwalOperasional` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `JadwalOperasional` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JadwalOperasional" DROP CONSTRAINT "JadwalOperasional_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "JadwalOperasional_pkey" PRIMARY KEY ("pengelolaLaundryId", "hari");
