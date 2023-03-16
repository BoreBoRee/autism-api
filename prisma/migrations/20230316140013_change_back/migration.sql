/*
  Warnings:

  - You are about to drop the column `child_id` on the `screening_comments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `screening_comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "screening_comments" DROP CONSTRAINT "screening_comments_user_id_fkey";

-- AlterTable
ALTER TABLE "screening_comments" DROP COLUMN "child_id",
DROP COLUMN "user_id",
ADD COLUMN     "screening_id" BIGINT;

-- AddForeignKey
ALTER TABLE "screening_comments" ADD CONSTRAINT "screening_comments_screening_id_fkey" FOREIGN KEY ("screening_id") REFERENCES "screenings"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
