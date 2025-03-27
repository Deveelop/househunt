/*
  Warnings:

  - You are about to drop the column `description` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "description",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Available';

-- CreateTable
CREATE TABLE "SecureRequest" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userContact" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SecureRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SecureRequest_propertyId_key" ON "SecureRequest"("propertyId");

-- AddForeignKey
ALTER TABLE "SecureRequest" ADD CONSTRAINT "SecureRequest_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
