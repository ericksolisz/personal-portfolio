# Portfolio

Personal portfolio of Erick Solis Zamacona. Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and shadcn/ui (Radix). Static, bilingual (`/en`, `/es`), built for Vercel.

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. It redirects to `/en` or `/es` based on the browser language.

## Where things live

| What | File |
| --- | --- |
| Projects (text, tags, links, media) | `src/content/projects.ts` |
| UI text in English and Spanish | `src/content/i18n.ts` |
| GitHub handle and email | `src/content/site.ts` |
| Tech tag colors | `src/lib/tech.ts` |
| Project media files | `public/projects/<slug>/` |
| Colors and fonts | `src/app/globals.css`, `src/app/[lang]/layout.tsx` |

**Order:** the project marked `featured: true` (Lead Chat App) is always first and shown as the wide card. The rest are sorted newest first by `start`.

**Adding the 5th project:** add one entry to the `projects` array. Write `tagline` and `description` in both `en` and `es`, and use tag keys from `src/lib/tech.ts` (add a new key there if a tech is missing).

## Project media

Each card has an auto-playing slideshow. It can mix images and short video clips:

- Images stay on screen for 4.5 s (change it per slide with `duration`).
- Clips play once, then the slideshow moves on. A project with a single clip loops it.
- Only the visible slide plays, and only while the card is on screen. Hovering or focusing pauses it. On phones you swipe.
- With "reduce motion" turned on, nothing auto-advances and clips show play controls.

```ts
media: [
  { type: "video", src: "/projects/lead-chat-app/demo.mp4", webm: "/projects/lead-chat-app/demo.webm",
    poster: "/projects/lead-chat-app/demo.jpg",
    alt: { en: "Chat answering a property question", es: "Chat respondiendo una pregunta sobre una propiedad" },
    caption: { en: "demo · test chat", es: "demo · chat de prueba" } },
  { type: "image", src: "/projects/lead-chat-app/inbox.png", alt: { en: "...", es: "..." } },
  { type: "image", src: "/projects/lead-chat-app/message-flow.svg", fit: "contain", alt: { en: "...", es: "..." } },
]
```

Keep raw recordings in `media-src/` (ignored by git) and put only the compressed copies in `public/projects/<slug>/`.

Use `fit: "contain"` for diagrams and `cover` (the default) for screenshots. The frame is 16:9, so record or crop at 16:9 (for example 1600×900).

### Use video, not GIFs

A GIF of a screen recording is usually 5–10× larger than the same clip as MP4. Record the screen, keep it 5–15 s, then export with [ffmpeg](https://ffmpeg.org/):

```bash
ffmpeg -i recording.mov -vf "scale=1280:-2,fps=30" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -movflags +faststart demo.mp4
```

```bash
ffmpeg -i recording.mov -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -crf 36 -b:v 0 -an demo.webm
```

```bash
ffmpeg -i demo.mp4 -frames:v 1 -q:v 3 demo.jpg
```

The MP4 is required; it plays everywhere, including iPhone Safari. The WebM is optional and usually smaller. The JPG poster shows while the clip loads. `-an` removes audio, because clips always play muted (iPhones only autoplay muted video). Aim for under ~2 MB per clip.

Files over a few MB make the git repo heavy. If the media grows, move it to Vercel Blob and put the Blob URLs in `src`.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project**, import the repo. It detects Next.js and pnpm on its own; no settings or environment variables are required.
3. Optional: once you have a custom domain, set `NEXT_PUBLIC_SITE_URL` (for example `https://yourdomain.com`) so share previews use it. Without it, the Vercel production URL is used.

Both language pages are prerendered as static HTML at build time. The only server code is the small redirect from `/` to `/en` or `/es` (`src/proxy.ts`).

## Checks

```bash
pnpm lint
```

```bash
pnpm build
```
