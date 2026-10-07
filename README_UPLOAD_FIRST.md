# ROMULAS Portfolio — Complete Package V3

Included:
- Home
- Digital Solutions
- Custom Systems & PWA (NEW Vesper-inspired single-viewport operational hero)
- Website Development
- Automation & Integration
- Digital Marketing (NEW cinematic streaming-style single-viewport hero)

## Standard navigation labels
Every included page uses the same primary menu content/order:
Home
Digital Solutions
Muay Thai
Portfolio
About
Let's Build

The visual style may differ page by page, but the labels are standardized.

## Current routes
/
digital-solutions/
systems/
websites/
automation/
marketing/

## Contact
All project/contact CTAs use WhatsApp:
+65 8170 5022

Messages are prefilled according to page/service.

## Upload
1. Keep the GitHub repository and GitHub Pages setting.
2. Delete the current website files/folders if you want a clean replacement.
3. Extract this ZIP.
4. Open `romulas-portfolio-complete-v3`.
5. Upload EVERYTHING INSIDE that folder to the ROOT of `RomulasOh/portfolio`.
6. GitHub Pages remains `main` + `/(root)`.

## Still pending
- Muay Thai & Boxing
- Portfolio / Case Studies
- About
- Optional dedicated Contact page


Additional page folder:
- muaythai


## V6
- Added `/muay-thai/` as the final Muay Thai route.
- Cyberpunk pink/blue/red design.
- No face photography; uses a custom anonymous vector fighter.


## V9 changes
- Corrected Muay Thai wording to match the actual training offer.
- Removed the meaningless anonymous/pixel face panel and replaced it with a real training-photo panel using the supplied Muay Thai image.
- Added `/about/` using the uploaded grid/node design idea, adapted to ROMULAS.
- Updated About navigation links to `/about/`.


## V11
- Fixed `BOXING` hero lettering so each letter has clear spacing.
- Kept the Muay Thai hero photo/layout unchanged.
- Removed the personal portrait from `/about/`.
- Added a new abstract non-person About hero visual.


## V12 update
- Muay Thai hero typography updated to match the reference more closely.
- White headline switched to a condensed poster-style display.
- Pink BOXING headline updated with a handwritten brush feel and cleaner spacing.


## V14 fixes
- Fixed Digital Marketing long-form content not appearing (JavaScript syntax/reveal issue).
- Fixed Custom Systems & PWA long-form content not appearing (JavaScript syntax/reveal issue).
- Added fail-safe reveal CSS so content remains visible if JavaScript fails.
- Removed duplicate Muay Thai pricing notice from the top of the Rates section; note remains once at the bottom.


## V17
- Portfolio hero video installed at `/work/assets/portfolio-hero.mp4`.
- Video web-optimized and audio removed.

## V19
- Portfolio `/work/` upgraded with cinematic entrance choreography, staggered mobile menu, parallax and smoother section reveals.
- Existing hero MP4 retained.


## V23 — mobile navigation fixes
- Home: added missing phone hamburger navigation.
- Home: mobile menu contains Home, Digital Solutions, Muay Thai, Portfolio, About and Let's Build.
- Digital Solutions: fixed mobile menu/overlay being permanently visible.
- Digital Solutions: hidden state is now enforced with `[hidden]{display:none!important}`.
- Both menu scripts explicitly reset to closed state.
- JavaScript syntax validation passed.


## V24 — Home hero portrait crop
- Replaced the Home hero's old full-body professional image with the supplied close-up professional portrait.
- Replaced the desktop cursor-reveal Muay Thai image with the supplied close-up Muay Thai portrait.
- Hero now focuses mainly on the face/upper body while retaining the left-side space for the headline.
- Mobile Home hero uses the professional close-up portrait.
- The lower Muay Thai section was left unchanged.


## V25 — Home hero matched-image reveal
- Uses the new formal portrait and new Muay Thai portrait.
- Both source images are exactly `1122 × 1402`.
- Both desktop layers use the exact same CSS `background-size` and `background-position`.
- This removes the weird zoom/jump when the cursor reveal changes between them.
- Portrait is shifted farther right to leave more space for the headline.
- Mobile Home hero uses the formal portrait.

## V26 — Home hero right-anchored portraits
- Both desktop hero images now start from the right edge using `background-position: right center`.
- Both images keep the same `background-size: auto 114%`.
- Mobile hero also uses right-aligned image positioning.
- This removes repeated percentage-position tuning between the formal and Muay Thai portraits.


## V28 — Home pinned scroll story
Replaced the old static `BUILD SYSTEMS. BUILD PEOPLE.` section with a sticky, scroll-driven narrative.

Desktop:
- Section spans ~3.9 viewport heights.
- Visual stays pinned while copy changes through 4 chapters.
- System grid, workflow lines, circular training motif and final pulse reveal progressively.
- Bottom progress rail can also be clicked to jump between chapters.

Chapters:
00 FOUNDATION
01 BUILD SYSTEMS
02 BUILD PEOPLE
03 SAME MINDSET

Visual:
- Uses `images/home-scroll-discipline-v28.webp`, generated specifically for this section.
- Subject is concentrated on the right and left side stays dark for copy.

Mobile:
- Falls back to a single static final chapter so it remains smooth and readable.
