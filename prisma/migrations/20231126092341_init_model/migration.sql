-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PELANGGAN', 'PENGELOLA_LAUNDRY');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('MENUNGGU_KONFIRMASI', 'DIPROSES', 'DIKIRIM', 'SELESAI');

-- CreateEnum
CREATE TYPE "Tags" AS ENUM ('SEPATU', 'BAJU', 'SEPRAI', 'JAKET');

-- CreateEnum
CREATE TYPE "Days" AS ENUM ('SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'PELANGGAN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pelanggan" (
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PengelolaLaundry" (
    "userId" TEXT NOT NULL,
    "deskripsi" TEXT
);

-- CreateTable
CREATE TABLE "Pesanan" (
    "id" TEXT NOT NULL,
    "berat" DOUBLE PRECISION,
    "total" INTEGER,
    "status" "Status",
    "timeStamp" TIMESTAMP(3),
    "pelangganId" TEXT NOT NULL,
    "pengelolaLaundryId" TEXT NOT NULL,

    CONSTRAINT "Pesanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JadwalOperasional" (
    "id" SERIAL NOT NULL,
    "hari" "Days" NOT NULL,
    "jamBuka" TEXT NOT NULL,
    "jamTutup" TEXT NOT NULL,
    "pengelolaLaundryId" TEXT NOT NULL,

    CONSTRAINT "JadwalOperasional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pemasukan" (
    "id" SERIAL NOT NULL,
    "total" INTEGER NOT NULL,
    "pengelolaLaundryId" TEXT NOT NULL,

    CONSTRAINT "Pemasukan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Pelanggan_userId_key" ON "Pelanggan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PengelolaLaundry_userId_key" ON "PengelolaLaundry"("userId");

-- AddForeignKey
ALTER TABLE "Pelanggan" ADD CONSTRAINT "Pelanggan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengelolaLaundry" ADD CONSTRAINT "PengelolaLaundry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_pelangganId_fkey" FOREIGN KEY ("pelangganId") REFERENCES "Pelanggan"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_pengelolaLaundryId_fkey" FOREIGN KEY ("pengelolaLaundryId") REFERENCES "PengelolaLaundry"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalOperasional" ADD CONSTRAINT "JadwalOperasional_pengelolaLaundryId_fkey" FOREIGN KEY ("pengelolaLaundryId") REFERENCES "PengelolaLaundry"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemasukan" ADD CONSTRAINT "Pemasukan_pengelolaLaundryId_fkey" FOREIGN KEY ("pengelolaLaundryId") REFERENCES "PengelolaLaundry"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
