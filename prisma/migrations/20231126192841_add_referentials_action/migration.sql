-- DropForeignKey
ALTER TABLE "JadwalOperasional" DROP CONSTRAINT "JadwalOperasional_pengelolaLaundryId_fkey";

-- DropForeignKey
ALTER TABLE "Pelanggan" DROP CONSTRAINT "Pelanggan_userId_fkey";

-- DropForeignKey
ALTER TABLE "Pemasukan" DROP CONSTRAINT "Pemasukan_pengelolaLaundryId_fkey";

-- DropForeignKey
ALTER TABLE "PengelolaLaundry" DROP CONSTRAINT "PengelolaLaundry_userId_fkey";

-- DropForeignKey
ALTER TABLE "Penilaian" DROP CONSTRAINT "Penilaian_pengelolaLaundryId_fkey";

-- DropForeignKey
ALTER TABLE "Pesanan" DROP CONSTRAINT "Pesanan_pelangganId_fkey";

-- DropForeignKey
ALTER TABLE "Pesanan" DROP CONSTRAINT "Pesanan_pengelolaLaundryId_fkey";

-- AddForeignKey
ALTER TABLE "Pelanggan" ADD CONSTRAINT "Pelanggan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengelolaLaundry" ADD CONSTRAINT "PengelolaLaundry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_pelangganId_fkey" FOREIGN KEY ("pelangganId") REFERENCES "Pelanggan"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_pengelolaLaundryId_fkey" FOREIGN KEY ("pengelolaLaundryId") REFERENCES "PengelolaLaundry"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JadwalOperasional" ADD CONSTRAINT "JadwalOperasional_pengelolaLaundryId_fkey" FOREIGN KEY ("pengelolaLaundryId") REFERENCES "PengelolaLaundry"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemasukan" ADD CONSTRAINT "Pemasukan_pengelolaLaundryId_fkey" FOREIGN KEY ("pengelolaLaundryId") REFERENCES "PengelolaLaundry"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penilaian" ADD CONSTRAINT "Penilaian_pengelolaLaundryId_fkey" FOREIGN KEY ("pengelolaLaundryId") REFERENCES "PengelolaLaundry"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
