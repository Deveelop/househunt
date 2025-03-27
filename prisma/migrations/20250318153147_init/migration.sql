/*
  Warnings:

  - Changed the type of `userContact` on the `SecureRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SecureRequest" DROP COLUMN "userContact",
ADD COLUMN     "userContact" DOUBLE PRECISION NOT NULL;
