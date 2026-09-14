# CipherCapital website — final package

## Deploy
Copy the contents of this folder into the root of `randysimpey/ciphercapital-hub`.

Structure:
- `index.html` — English homepage
- `nl/index.html` — Dutch homepage
- `privacy.html` / `nl/privacy.html`
- `terms.html` / `nl/terms.html`
- `assets/styles.css`
- `assets/logo.svg`
- `assets/favicon.svg`
- `robots.txt`
- `sitemap.xml`

## Important
The package intentionally avoids fake customer counts, fake testimonials and fake security certifications.

Before production use, verify that the backend really matches the privacy/security statements, especially temporary repository storage, logs, backups and third-party processing.

The existing Stripe checkout links were retained:
- Pro: https://buy.stripe.com/5kQ28q4cz7HMgnMaoF1sQ00
- Business: https://buy.stripe.com/3cI9AS5gD3rw9Zo68p1sQ01

The homepage no longer contains a fake `VIDEO_ID` YouTube embed. It links directly to the channel until a real video ID is selected.

The supplied founder portrait is included at `assets/randy-portrait.png` and is already wired into both EN and NL About sections.


## Branding
The original CipherCapital logo from the repository is restored. The website palette has been adapted to the logo's navy/white identity with a restrained warm accent.
