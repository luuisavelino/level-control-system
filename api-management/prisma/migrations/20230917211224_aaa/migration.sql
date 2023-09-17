-- DropForeignKey
ALTER TABLE "systems" DROP CONSTRAINT "systems_configuration_uuid_fkey";

-- AlterTable
ALTER TABLE "systems" ALTER COLUMN "configuration_uuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "systems" ADD CONSTRAINT "systems_configuration_uuid_fkey" FOREIGN KEY ("configuration_uuid") REFERENCES "configurations"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
