# Owner’s Circle Producer Studio

Live dashboard: https://www.ownerscircle.club/dashboard
Public website: https://www.ownerscircle.club

Recovered from the October 13 source backup. The producer dashboard replaces browser-local records with authenticated, private Vercel Blob storage. Existing local browser records are not deleted; a recovery export appears when they are detected.

## Ando’s workflow

1. Add a guest in Prospects, with story notes, stage, owner, and follow-up date.
2. Log the recording in Episodes shot.
3. Submit it with episode number, title, and drop date (Eastern time).
4. Complete the checklist: editor video, Opus, best clips, caption/thumbnail review, Nuelink scheduling, full episode scheduling, published-link verification.
5. Mark it published only after every task is complete.
6. Connect the Owners Circle brand under Analytics → Connect Nuelink. It reads channels and the latest 30 days of post results across published, failed, retrying, skipped, and sent statuses. At most 100 records per status are fetched; a partial-results notice appears when more exist. No Nuelink posts are created or modified.

New episodes default to Ando as producer. The existing dashboard password remains the sign-in method; this is a shared team workspace, not separate per-person accounts.

## Runtime configuration

- DASHBOARD_PASSWORD: existing production sign-in password; also signs expiring sessions.
- BLOB_READ_WRITE_TOKEN: private store connected to the existing Vercel project.
- NUELINK_API_KEY and NUELINK_BRAND_ID: optional environment configuration; otherwise the dashboard connection form stores the key in a private server-only blob.
- Existing RESEND_API_KEY is retained for existing public forms.

Without Blob credentials, development uses an ignored local file. Production fails closed instead of pretending records were saved locally. Writes use ETag conflict detection; refresh and retry if another person saved first.

## Validation

Production build and TypeScript checks passed. Zero npm audit findings after dependency patches. Verified login, forged-cookie rejection, recording → submission → checklist flow, readback, duplicate-number rejection, incomplete-publication rejection, concurrent edit conflict detection, and private Blob consistent reads/conditional writes. Desktop and 390px mobile layouts inspected. Nuelink is implemented against its published API but requires the owner’s connection before live data can be verified.

## Development

npm install
npm run dev
npm run build

Never commit .env files, .vercel configuration, or .studio-dev.json.
