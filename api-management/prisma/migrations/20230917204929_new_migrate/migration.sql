/*
  Warnings:

  - Made the column `configuration_uuid` on table `systems` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "systems" DROP CONSTRAINT "systems_configuration_uuid_fkey";

-- AlterTable
ALTER TABLE "systems" ALTER COLUMN "configuration_uuid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "systems" ADD CONSTRAINT "systems_configuration_uuid_fkey" FOREIGN KEY ("configuration_uuid") REFERENCES "configurations"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
