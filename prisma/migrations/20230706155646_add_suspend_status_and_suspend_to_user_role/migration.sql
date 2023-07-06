-- AlterTable
ALTER TABLE "users" ADD COLUMN     "suspend_status" BIGINT;

-- CreateTable
CREATE TABLE "suspend" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "suspend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_suspend_status_fkey" FOREIGN KEY ("suspend_status") REFERENCES "suspend"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
