CipherCapital — deploy notes
=============================

WHAT TO UPLOAD
Copy the contents of this folder into the root of the ciphercapital-hub
repository, replacing what's there:

  index.html              -> repo root
  privacy.html            -> repo root
  terms.html              -> repo root
  robots.txt              -> repo root
  sitemap.xml             -> repo root
  assets/styles.css       -> repo assets/
  assets/cipher-motion.js -> repo assets/
  assets/logo.png         -> repo assets/  (your original, unchanged)
  assets/favicon.png      -> repo assets/  (your original, unchanged)
  assets/randy-portrait.png -> repo assets/ (your original, unchanged)
  nl/index.html           -> repo nl/
  nl/privacy.html         -> repo nl/
  nl/terms.html           -> repo nl/

Delete the old assets/cipher-motion.js if it had a ?v= query in the HTML —
the new pages reference it without one, so old caches expire naturally.

Commit and push. GitHub Pages redeploys on its own.


WHAT WAS FIXED
--------------
The previous version had lost several things during the rebuild:

1. The YouTube section had no video at all — just a panel saying the video
   "belongs on the channel". A real embed is back, at youtube-nocookie.com,
   starting at 1:30 as intended (?start=90, NOT &t=90s — the watch-page
   timestamp format does not work in an embed and was the original bug).
2. Google Analytics was gone. Restored, with Consent Mode v2.
3. The cookie consent banner was gone. Restored.
4. The Formspree checklist sign-up was gone. Restored.
5. The gear section and the Amazon Associates disclosure were gone. Both
   restored — the disclosure is required by Amazon's operating agreement.
6. The English page had been overwritten with a half-Dutch version. There
   are now two complete pages: English at the root, Dutch under /nl/.
7. sitemap.xml listed only four URLs and omitted the Dutch legal pages.
   It now lists all six, with hreflang pairs.
8. The old build inlined the entire 32KB stylesheet into all six pages as
   a load failsafe. That's replaced by a six-line critical block (dark
   background, text colour, font) plus the external stylesheet — same
   protection against a raw-HTML flash, roughly 190KB less to download.


CHECKED BEFORE SHIPPING
-----------------------
- HTML nesting on all six pages: no unclosed or mismatched tags
- Every internal link and asset path resolves, in both folders
- Every in-page anchor points at an element that exists
- CSS and JS brace balance; JS passes `node --check`
- Stripe links, Amazon tag, GA4 ID, Formspree endpoint all present on both
  language versions


STILL TO DO
-----------
The checklist PDF is the only missing file. Both sign-up sections link to
assets/5-minute-repo-security-checklist.pdf as the no-email fallback. Drop
that PDF into assets/ and the link works; until then it 404s.

One Formspree step: submit the form once yourself from the live site.
Formspree emails you a confirmation link the first time a form receives a
submission, and visitor sign-ups don't come through until you click it.


DESIGN NOTES
------------
The palette is built from the logo, not chosen next to it: #0A1622 is the
exact background colour sampled out of assets/logo.png. #05090E is the
deeper band behind alternating sections, and #5AC8FA is the single accent,
picked to sit with the logo's line art. Red, amber and green appear only
inside the report panel, where they encode severity rather than decorate.

Type is the system stack, so it renders in SF Pro on Apple hardware and
falls back cleanly elsewhere. Headline tracking is tightened (-0.028em) at
display sizes, which is what makes large type read as deliberate.

Motion is scroll-driven and built on one idea: the page should respond to
where you are, not perform at you.
  - the headline reveals line by line on load, once
  - the terminal types its output when it scrolls into view
  - report rows illuminate in sequence as you scroll past them
  - the Cipher Intelligence section pins to the viewport while the node
    graph draws its edges and the copy advances through three steps
  - the portrait drifts slightly against the scroll
  - cards carry a cursor-following light
Everything honours prefers-reduced-motion, and there's a Motion on/off
toggle bottom-right (keyboard shortcut: M) that persists across visits.
