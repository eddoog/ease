/*
  Warnings:

  - You are about to drop the column `total` on the `Pemasukan` table. All the data in the column will be lost.
  - You are about to drop the column `timeStamp` on the `Pesanan` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Pesanan` table. All the data in the column will be lost.
  - Added the required column `nominal` to the `Pemasukan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pemasukan" DROP COLUMN "total",
ADD COLUMN     "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nominal" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Pesanan" DROP COLUMN "timeStamp",
DROP COLUMN "total",
ADD COLUMN     "harga" DOUBLE PRECISION,
ADD COLUMN     "waktuPesanan" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "status" SET DEFAULT 'MENUNGGU_KONFIRMASI';

-- CreateTable
CREATE TABLE "Penilaian" (
    "id" SERIAL NOT NULL,
    "nilai" INTEGER NOT NULL,
    "ulasan" TEXT,
    "pengelolaLaundryId" TEXT NOT NULL,

    CONSTRAINT "Penilaian_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Penilaian" ADD CONSTRAINT "Penilaian_pengelolaLaundryId_fkey" FOREIGN KEY ("pengelolaLaundryId") REFERENCES "PengelolaLaundry"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
