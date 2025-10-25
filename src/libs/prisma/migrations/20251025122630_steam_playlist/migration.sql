-- CreateEnum
CREATE TYPE "RatingValue" AS ENUM ('PENDING', 'YES', 'NO', 'MAYBE');

-- CreateTable
CREATE TABLE "steam_profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "steamId64" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "steam_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "steam_playlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerProfileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "steam_playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "steam_playlist_game" (
    "id" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "steamAppId" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "steam_playlist_game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "steam_playlist_game_rating" (
    "id" TEXT NOT NULL,
    "playlistGameId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "value" "RatingValue" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "steam_playlist_game_rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SteamPlaylistToSteamProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SteamPlaylistToSteamProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "steam_profile_userId_key" ON "steam_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "steam_profile_steamId64_key" ON "steam_profile"("steamId64");

-- CreateIndex
CREATE INDEX "steam_playlist_ownerProfileId_idx" ON "steam_playlist"("ownerProfileId");

-- CreateIndex
CREATE INDEX "steam_playlist_game_steamAppId_idx" ON "steam_playlist_game"("steamAppId");

-- CreateIndex
CREATE UNIQUE INDEX "steam_playlist_game_playlistId_steamAppId_key" ON "steam_playlist_game"("playlistId", "steamAppId");

-- CreateIndex
CREATE INDEX "steam_playlist_game_rating_profileId_idx" ON "steam_playlist_game_rating"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "steam_playlist_game_rating_playlistGameId_profileId_key" ON "steam_playlist_game_rating"("playlistGameId", "profileId");

-- CreateIndex
CREATE INDEX "_SteamPlaylistToSteamProfile_B_index" ON "_SteamPlaylistToSteamProfile"("B");

-- AddForeignKey
ALTER TABLE "steam_profile" ADD CONSTRAINT "steam_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steam_playlist" ADD CONSTRAINT "steam_playlist_ownerProfileId_fkey" FOREIGN KEY ("ownerProfileId") REFERENCES "steam_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steam_playlist_game" ADD CONSTRAINT "steam_playlist_game_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "steam_playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steam_playlist_game_rating" ADD CONSTRAINT "steam_playlist_game_rating_playlistGameId_fkey" FOREIGN KEY ("playlistGameId") REFERENCES "steam_playlist_game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steam_playlist_game_rating" ADD CONSTRAINT "steam_playlist_game_rating_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "steam_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SteamPlaylistToSteamProfile" ADD CONSTRAINT "_SteamPlaylistToSteamProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "steam_playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SteamPlaylistToSteamProfile" ADD CONSTRAINT "_SteamPlaylistToSteamProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "steam_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
