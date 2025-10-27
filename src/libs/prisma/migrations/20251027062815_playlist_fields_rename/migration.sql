/*
  Warnings:

  - You are about to drop the column `ownerProfileId` on the `steam_playlist` table. All the data in the column will be lost.
  - You are about to drop the column `playlistGameId` on the `steam_playlist_game_rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gameId,profileId]` on the table `steam_playlist_game_rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `steam_playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `steam_playlist_game_rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."steam_playlist" DROP CONSTRAINT "steam_playlist_ownerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."steam_playlist_game_rating" DROP CONSTRAINT "steam_playlist_game_rating_playlistGameId_fkey";

-- DropIndex
DROP INDEX "public"."steam_playlist_ownerProfileId_idx";

-- DropIndex
DROP INDEX "public"."steam_playlist_game_rating_playlistGameId_profileId_key";

-- AlterTable
ALTER TABLE "steam_playlist"
RENAME COLUMN "ownerProfileId" TO "ownerId";

-- AlterTable
ALTER TABLE "steam_playlist_game_rating"
RENAME COLUMN "playlistGameId" TO "gameId";

-- CreateIndex
CREATE INDEX "steam_playlist_ownerId_idx" ON "steam_playlist"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "steam_playlist_game_rating_gameId_profileId_key" ON "steam_playlist_game_rating"("gameId", "profileId");

-- AddForeignKey
ALTER TABLE "steam_playlist" ADD CONSTRAINT "steam_playlist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "steam_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steam_playlist_game_rating" ADD CONSTRAINT "steam_playlist_game_rating_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "steam_playlist_game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
