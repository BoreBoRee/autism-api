/*
  Warnings:

  - You are about to drop the column `district_id` on the `children` table. All the data in the column will be lost.
  - You are about to drop the column `sub_district_id` on the `children` table. All the data in the column will be lost.
  - You are about to drop the column `gender_id` on the `screening_details` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "children" DROP CONSTRAINT "children_district_id_fkey";

-- DropForeignKey
ALTER TABLE "children" DROP CONSTRAINT "children_sub_district_id_fkey";

-- AlterTable
ALTER TABLE "children" DROP COLUMN "district_id",
DROP COLUMN "sub_district_id";

-- AlterTable
ALTER TABLE "screening_details" DROP COLUMN "gender_id";
