# Playlist

This app allows creating &#34;playlists&#34; - lists of Steam games,
which can be shared with friends and rated.

Link - [https://playlist.gillid.pro/](https://playlist.gillid.pro/)

## Tech stack

- Foundation: Next.js with deployment to Vercel
- UI and styling: Tailwind CSS + shadcn/ui + lucide-react + motion
- DB: Prisma (PostgreSQL)
- Auth: better-auth
- Steam API

## Privacy

Steam API provides only publicly available player profile data, for example, nickname, avatar, friendlist, and other things that can be accessed via your steam page according to your privacy settings. This never includes personal data like email, phone number, and so on. This app neither stores nor even has access to your private information.
