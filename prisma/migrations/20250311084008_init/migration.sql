/*
  Warnings:

  - You are about to drop the column `caretakerContact` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `landlordContact` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `lawyerContact` on the `Property` table. All the data in the column will be lost.
  - Added the required column `contact` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `houseType` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stateNig` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "caretakerContact",
DROP COLUMN "landlordContact",
DROP COLUMN "lawyerContact",
ADD COLUMN     "contact" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "houseType" SET NOT NULL,
ALTER COLUMN "stateNig" SET NOT NULL;
