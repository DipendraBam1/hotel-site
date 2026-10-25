# Alder House: Submission Notes

Author: Devendra Bam Rajwar | Date: 23/10/2026 | Branch: `main`

## 1. Three most important design decisions

**1. A solid ivory header instead of a transparent one over the hero.**
A transparent header needs an overlay to stay readable on every photo and screen size. A solid ivory bar guarantees contrast for the wordmark, navigation and booking button, and it keeps the hero image uncovered. The cost is a little less drama at the top of the page.

**2. Editorial rows instead of a repeated card grid.**
Rooms are large alternating image-and-text rows. Packages are ruled list rows. Dining is a navy band with a wide image, and wellness uses a tall image set lower than the text. Each section has its own composition, so the page reads as art-directed rather than templated, and the brief's warning about identical rounded cards is avoided. All room images share one 4:3 ratio to keep the catalogue consistent.

**3. Limits built into the controls, with text errors.**
Guest and room counts use steppers that disable at their limits (1 to 6 adults, 1 to 4 rooms), and the check-out date picker blocks dates on or before check-in. Validation still runs on submit for typed input, and every error appears as text with an "Error:" prefix, linked to its field with `aria-describedby`, with focus moved to the first invalid field. This means errors are rare, and when they happen they do not depend on colour alone.

## 2. Self-review

### Limitations

- All data is mock. There is no booking engine, availability logic or pricing rules.
- The enquiry form validates in the browser only and sends nothing.
- Privacy, terms and cancellation text are placeholders, clearly marked as samples.
- There is no skip link, so keyboard users tab through the header on every page load.
- There is no published accessibility statement, and no screen reader was used in testing.
- There are no SEO metadata (description, Open Graph tags, structured data), favicon, sitemap or `robots.txt`.
- There is no custom 404 page, so unknown URLs show Laravel's default error page.
- The gallery lightbox has no touch swipe and does not preload the next image.
- Packages do not set the stay length in the search; they only pre-select the room.
- Layouts were checked at 375, 768 and 1440 px only. No other widths were tested.
- No open bugs were found in the checks listed below.

### What to improve next

1. Laravel booking flow: live availability, pricing rules, server-side validation, payment.
2. Send the enquiry form through a controller with validation, mail and rate limiting.
3. Guest accounts (login, signup, my bookings) using Laravel auth.
4. Admin panel to manage rooms, rates, offers, gallery and content.
5. Real policies, cookie consent and analytics once tracking is introduced.
6. Multi-language and currency support.
7. Responsive image sets (`srcset`) and AVIF/WebP formats.
8. Verified guest reviews from a real source (none are shown, by design).
9. Automated tests for the validation functions.
10. Add a skip link, SEO metadata with Hotel structured data, a favicon, a styled 404 page and an accessibility statement based on real test results.

## 3. Build and test record

Fill in each result from your own runs. Do not leave a line as "pass" unless you checked it.

### Build

| Check | Result | Date |
|---|---|---|
| `npm run build` in `hotel-site` | Pass | 23/10/2026 |
| Build run again in the work folder (`D:\workmess`) | [FILL IN: pending, not yet integrated] | [FILL IN] |
| Console errors or warnings on the built site (`hotel-site`) | None | 23/10/2026 |

### Viewports

| Width | Horizontal scroll | Clipped or overlapping content | Stretched images | Notes |
|---|---|---|---|---|
| 375 px | None found | None found | None found | Pass |
| 768 px | None found | None found | None found | Pass |
| 1440 px | None found | None found | None found | Pass. Search heading visible without long scroll: yes |

### Keyboard

| Check | Result |
|---|---|
| Focus order follows visual order; focus ring always visible | Pass |
| Mobile menu: opens, traps focus, Escape closes, focus returns | Pass |
| Search errors move focus to first invalid field | Pass |
| Footer dialogs and gallery lightbox: Escape closes, focus returns | Pass |
| FAQ opens with Enter and Space | Pass |

### Validation cases

| Case | Expected | Result |
|---|---|---|
| Empty dates, press Search | Two text errors, focus on check-in | Pass |
| Check-out same as or before check-in | "Check-out must be after check-in." | Pass |
| Check-in in the past (typed) | Past-date error | Pass |
| Stay over 30 nights | Nights limit error | Pass |
| 2 adults, 3 rooms | Rooms cannot exceed adults | Pass |
| 6 adults, 1 room | Empty-state message | Pass |
| Valid search, then change a field | Old results disappear | Pass |
| Heritage Villa selected | Shown as unavailable with message | Pass |
| Enquiry: empty submit | Text errors, focus on name | Pass |
| Enquiry: bad email, bad phone, short message | Matching errors | Pass |
| Enquiry: valid submit | "Demonstration only" panel | Pass |

### Known issues

- None found so far, but testing was limited to the checks above.

## 4. Integration notes

The site was built in a separate project and then copied into the assigned folder. Problems met while integrating: [FILL IN, or "none"].

## 5. Screenshots

- `docs/screenshots/desktop.png` (1440 px)
- `docs/screenshots/mobile.png` (375 px)
