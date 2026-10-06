# ROMULAS — Portfolio / Selected Work

Dedicated route:
`/work/`

This page adapts the supplied cinematic hero idea to ROMULAS:
- static HTML / CSS / vanilla JS to match the rest of the existing site
- optional local video background
- premium full-screen hero
- selected case studies
- systems / website / digital experience categories
- WhatsApp project CTAs

## Optional hero video
Generate the video using `VIDEO_PROMPT.txt` and save it as:

`work/assets/portfolio-hero.mp4`

The page already includes a designed fallback background, so it works even before the MP4 is added.


## V17 hero video
- Added the supplied cinematic technology video as the live Portfolio hero background.
- Saved as `work/assets/portfolio-hero.mp4`.
- Removed the audio track for a lighter website asset.
- MP4 is H.264 + fast-start optimized for browser playback.
- Existing static poster remains as the fallback.


## V18 — video playback fix
- Switched the hero video to a direct `src` attribute.
- Added explicit muted autoplay + `video.play()` handling.
- Added a retry for GitHub Pages/cache delays.
- Video is layered above the SVG fallback and fades in only when actually ready.
- Added `video-test.html` so the MP4 can be tested directly after deployment.
