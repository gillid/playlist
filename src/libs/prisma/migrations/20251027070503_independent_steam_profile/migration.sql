/*
  Warnings:

  - Added the required column `image` to the `steam_profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `steam_profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."steam_profile" DROP CONSTRAINT "steam_profile_userId_fkey";

-- AlterTable
ALTER TABLE "steam_profile" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "steam_profile" ADD CONSTRAINT "steam_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
