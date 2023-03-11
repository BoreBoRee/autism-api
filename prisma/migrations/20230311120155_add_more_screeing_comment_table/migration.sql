-- AlterTable
ALTER TABLE "screening_comments" ADD COLUMN     "child_id" BIGINT,
ADD COLUMN     "information" VARCHAR,
ADD COLUMN     "screening_score" BIGINT;
