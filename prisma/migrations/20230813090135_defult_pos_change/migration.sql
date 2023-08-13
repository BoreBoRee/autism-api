-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role_id" DROP DEFAULT,
ALTER COLUMN "suspend_status" SET DEFAULT 1;
