-- CreateEnum
CREATE TYPE "role_name" AS ENUM ('USER', 'ENGINEER', 'ADMIN');

-- CreateEnum
CREATE TYPE "control_type" AS ENUM ('PI', 'PD', 'PID');

-- CreateEnum
CREATE TYPE "notification_level" AS ENUM ('INFO', 'WARNING', 'CRITICAL');

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" "role_name" NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "uuid" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "phone_region_code" INTEGER NOT NULL,
    "phone_country_code" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "workers" (
    "uuid" UUID NOT NULL,
    "system_uuid" UUID NOT NULL,

    CONSTRAINT "workers_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "systems" (
    "uuid" UUID NOT NULL,
    "path" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "control_uuid" UUID NOT NULL,
    "scheme_uuid" UUID NOT NULL,
    "configuration_uuid" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "systems_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "controls" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "control_type" NOT NULL,
    "kp" DOUBLE PRECISION NOT NULL,
    "ki" DOUBLE PRECISION NOT NULL,
    "kd" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "controls_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "schemes" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "setpoint" DOUBLE PRECISION NOT NULL,
    "min_level" DOUBLE PRECISION NOT NULL,
    "max_level" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "schemes_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "configurations" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "schedule_uuid" UUID,
    "notification_uuid" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "configurations_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "schedules" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "notifications" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "level" "notification_level" NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "systems_path_key" ON "systems"("path");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workers" ADD CONSTRAINT "workers_system_uuid_fkey" FOREIGN KEY ("system_uuid") REFERENCES "systems"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "systems" ADD CONSTRAINT "systems_control_uuid_fkey" FOREIGN KEY ("control_uuid") REFERENCES "controls"("uuid") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "systems" ADD CONSTRAINT "systems_scheme_uuid_fkey" FOREIGN KEY ("scheme_uuid") REFERENCES "schemes"("uuid") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "systems" ADD CONSTRAINT "systems_configuration_uuid_fkey" FOREIGN KEY ("configuration_uuid") REFERENCES "configurations"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configurations" ADD CONSTRAINT "configurations_schedule_uuid_fkey" FOREIGN KEY ("schedule_uuid") REFERENCES "schedules"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configurations" ADD CONSTRAINT "configurations_notification_uuid_fkey" FOREIGN KEY ("notification_uuid") REFERENCES "notifications"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
