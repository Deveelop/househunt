/*
  Warnings:

  - You are about to drop the column `description` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Property` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "HouseType" AS ENUM ('SINGLE_ROOM', 'SELF_CONTAINED', 'BEDROOM_AND_PALLOUR', 'MORE_THAN_ONE_BEDROOM_AND_PALLOUR');

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "description",
DROP COLUMN "location",
DROP COLUMN "title",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "caretakerContact" TEXT,
ADD COLUMN     "houseType" TEXT,
ADD COLUMN     "landlordContact" TEXT,
ADD COLUMN     "lawyerContact" TEXT,
ADD COLUMN     "stateNig" TEXT;
