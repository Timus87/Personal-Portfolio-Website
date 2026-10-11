# AI Marketing Consultant Website

A responsive, static multi-page marketing site built with semantic HTML, CSS and small vanilla JavaScript modules. It runs on Node.js without installing dependencies.

## Run locally

1. Install Node.js 20 or newer.
2. From this directory, run `node server.mjs`.
3. Open `http://localhost:3000`.

The server serves static files and directory index pages, so URLs such as `/about/`, `/services/`, `/blog/` and `/contact/` work without a build step.

## Deploy

The `vercel.json` configuration selects Vercel's static “Other” preset and serves the repository root, where `index.html` lives. This is important because the `public/` folder is only for image assets and does not contain the homepage. Push changes to the connected deployment branch to trigger a new deployment. Set the production domain in canonical URLs, Open Graph URLs, `robots.txt` and `sitemap.xml`.

## Personalize before launch

Update the centralized values in `site-config.js`:

- `[YOUR PHONE]`, `[YOUR LOCATION]` (the email address is already configured)
- Professional photo path (`photo`)
- Booking URL (`bookingUrl`)
- Real LinkedIn, Facebook and Instagram URLs

Replace the profile-photo placeholder and testimonial placeholder only with approved real material. Update the blog publication dates and copy to match your editorial plan. Replace `[YOUR DOMAIN]` in page metadata, structured data, `robots.txt` and `sitemap.xml`. Review the privacy and terms templates for the actual business and jurisdiction.

## Integrations

- **Consultation booking:** add a real scheduling URL to `site-config.js`. Every consultation CTA then opens that destination. Until configured, CTAs lead to the contact page and booking panel, which offers the inquiry form.
- **Contact form:** submissions use FormSubmit’s AJAX endpoint to deliver form entries to `sumit.karmacharya87@gmail.com`; replies go to the visitor’s email. The first real submission triggers a one-time activation message from FormSubmit. Confirm that message to activate delivery; FormSubmit says submissions made before confirmation are retained and forwarded after activation. Check spam if the activation message is missing.
- **Environment variables:** no API key or server-side email credentials are required for FormSubmit. Its endpoint is configured on the contact form.

## Structure

```text
about/index.html                 About page
blog/index.html                  Blog listing
blog/*/index.html                Individual articles
contact/index.html               Contact form and booking panel
services/index.html              Services overview
services/meta-ads/index.html     Meta Ads service
services/digital-marketing/index.html  Digital Marketing service
services/email-marketing/index.html    Email Marketing service
privacy/index.html, terms/index.html
public/                           Brand and hero SVGs
site-config.js                    Central personal and integration placeholders
site.js                           Shared navigation, footer and form behavior
styles.css                        Responsive design system
server.mjs                        Dependency-free local static server
```

This is a deliberately lightweight static site served locally by a small Node server. Contact form delivery is handled by FormSubmit. It does not include a CMS or scheduler credentials. Content can be edited directly in the HTML and a CMS can be added later.
