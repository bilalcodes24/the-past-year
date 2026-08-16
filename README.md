THE PAST YEAR — Project Skeleton

Files created:
- `index.html` — Main HTML file (landing, memories, letter, final screen).
- `style.css` — Visual styles and responsive layout.
- `script.js` — Memory data array, DOM generation, scroll reveals, audio handling.
- `assets/music.mp3` — Placeholder audio file (replace with your music file).
- `assets/images/01.jpg`..`05.jpg` — Placeholder image files (replace with your screenshots).

How to add music
- Replace `assets/music.mp3` with your audio file (keep the same name), or update the `src` on the `<audio id="bgAudio">` element in `index.html`.
- Music will start only after the user clicks the `BEGIN` button (required by browser autoplay policy).

How to add images
- Put your screenshots into `assets/images/` and name them `01.jpg` through `32.jpg` (or update the `image` path in the memories array).
- Images are lazy-loaded and will gracefully show a placeholder background if missing.

How to add / edit memories
- Open `script.js` and edit the `memories` array. Each object supports:
  - `number` — the chronological index (1..32).
  - `date` — display date (e.g. "24 AUGUST 2025").
  - `image` — relative path (e.g. `assets/images/01.jpg`).
  - `title` — short title line.
  - `text` — longer description (can be empty).
  - `type` — one of: `normal`, `cute`, `funny`, `important`, `core`.
- The site generates the DOM from this array; do not add static HTML for each memory.

How to change a memory's type
- Change the `type` property for an item in `memories` to one of the supported strings.
- CSS classes exist for `cute`, `funny`, `important`, and `core` for initial styling.

How to preview locally
- Option 1: Double-click `index.html` to open in your browser (works for static content; some browsers restrict `file://` audio playback).
- Option 2: Start a simple local server (recommended). From the project folder run:

```powershell
# Python 3 (works cross-platform)
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

Notes
- The skeleton contains 5 placeholder memories — replace or extend the `memories` array to 32 items.
- The timeline shows 32 markers; it highlights the current memory as you scroll.
- The `core` type includes a subtle blur-to-sharp reveal.
- Respect `prefers-reduced-motion`: animations are disabled if the user requests reduced motion.

If you want, I can now:
- Add the remaining 27 placeholder objects to the `memories` array, or
- Wire up nicer placeholder images, or
- Run a quick local preview command for you.
