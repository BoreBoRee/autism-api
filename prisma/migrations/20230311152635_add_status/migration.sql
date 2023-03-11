/*
  Warnings:

  - You are about to drop the column `score` on the `screening_comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "screening_comments" DROP COLUMN "score",
ADD COLUMN     "status" VARCHAR;
