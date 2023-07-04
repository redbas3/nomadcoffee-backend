/*
  Warnings:

  - You are about to drop the column `name` on the `Coffee` table. All the data in the column will be lost.
  - Added the required column `coffeename` to the `Coffee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coffee" DROP COLUMN "name",
ADD COLUMN     "coffeename" TEXT NOT NULL;
