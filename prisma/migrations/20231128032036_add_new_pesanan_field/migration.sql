/*
  Warnings:

  - Added the required column `waktuPenyelesaian` to the `Pesanan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pesanan" ADD COLUMN     "waktuPenyelesaian" TIMESTAMP(3) NOT NULL;
