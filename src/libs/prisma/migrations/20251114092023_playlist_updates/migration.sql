-- CreateTable
CREATE TABLE "steam_playlist_update" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "playlistId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "steam_playlist_update_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "steam_playlist_update_profileId_idx" ON "steam_playlist_update"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "steam_playlist_update_playlistId_profileId_key" ON "steam_playlist_update"("playlistId", "profileId");

-- AddForeignKey
ALTER TABLE "steam_playlist_update" ADD CONSTRAINT "steam_playlist_update_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "steam_playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steam_playlist_update" ADD CONSTRAINT "steam_playlist_update_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "steam_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
