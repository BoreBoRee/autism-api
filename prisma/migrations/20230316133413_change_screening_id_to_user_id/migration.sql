/*
  Warnings:

  - You are about to drop the column `screening_id` on the `screening_comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "screening_comments" DROP CONSTRAINT "screening_comments_screening_id_fkey";

-- AlterTable
ALTER TABLE "screening_comments" DROP COLUMN "screening_id",
ADD COLUMN     "user_id" BIGINT;

-- AlterTable
ALTER TABLE "screenings" ADD COLUMN     "user_id" BIGINT;

-- AddForeignKey
ALTER TABLE "screening_comments" ADD CONSTRAINT "screening_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "screenings"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
