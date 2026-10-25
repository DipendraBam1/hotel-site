# Alder House: Premium Hotel Website

Frontend assignment for ArikarTech (Day 2). A homepage for a fictional five-star hotel, built as a React interface inside a single Laravel application.

**Alder House** is a fictional twelve-room hotel above Bhimtal lake, Uttarakhand. All content, rates, contact details and policies are placeholders created for this exercise.

## Stack and versions

| Tool | Version |
|---|---|
| Laravel | 13.37.0 |
| Vite | 8.3.4 (with `laravel-vite-plugin` 3.2.0 and `@vitejs/plugin-react` 6.1.2) |
| React | 19.3.1 (`react-dom` 19.3.1) |
| PHP | 8.5.0 |
| Node | 24.14.1 |
| Styling | Tailwind CSS 4.3.3 (`@tailwindcss/vite`) with design tokens in `@theme` |
| Fonts | Cormorant Garamond 500, Inter 400 and 500 (self-hosted via Fontsource) |

## Setup and run

```bash
composer install
npm install
cp .env.example .env        # skip if .env already exists
php artisan key:generate    # skip if APP_KEY is already set
```

Development (two terminals):

```bash
npm run dev
php artisan serve
```

Open **http://localhost:8000**. (`localhost:5173` is only the Vite asset server.)

Production build:

```bash
npm run build
php artisan serve
```

Make sure `public/hot` does not exist when testing the built version.

## What is on the page

Header with accessible mobile menu, hero, availability search (validated, demonstration results), rooms and suites, packages, dining, wellness, property story, photo gallery with lightbox, FAQ, enquiry form (demonstration only), location with static map placeholder, footer with policy dialogs, and a sticky mobile booking bar.

## Architecture

Laravel is the application and owns routing. Blade provides one page shell (`resources/views/welcome.blade.php`) containing `<div id="app">` and the `@vite` tags. React mounts there and handles all interactive UI and client-side state. There is no second server.

```
resources/
├── css/app.css              Tailwind import + design tokens (@theme) + base rules
├── js/
│   ├── app.jsx              Mounts <App/>; holds shared state (selected room)
│   ├── data/                Mock content, kept apart from presentation
│   │   ├── hotel.js         Name, address, nav, story, guest info, FAQs, policies
│   │   ├── rooms.js
│   │   ├── offers.js
│   │   ├── experiences.js
│   │   └── gallery.js
│   ├── utils/
│   │   ├── validateSearch.js    Pure validation + date helpers for the search
│   │   └── validateEnquiry.js   Pure validation for the enquiry form
│   └── components/          One component per responsibility
└── views/
    └── welcome.blade.php    Page shell
```

**Components:** HotelHeader, MobileNavigation, HotelHero, AvailabilitySearch (DateField, GuestSelector, SearchResults), RoomsSection (RoomCard), OffersSection, ExperienceSection, PropertyStory, GallerySection, FaqSection, EnquirySection (FormField), LocationInfo, HotelFooter, StickyBookBar.

**State:** each form owns its own state. The only state shared between sections is `selectedRoomId` in `app.jsx`, so a room card or package can pre-select a room in the search.

**Validation** lives in pure functions in `utils/`, separate from the components, so the same rules can be mirrored in a Laravel form request later.

### Replacing mock data with Laravel data

Each section reads from a module in `resources/js/data/`. To go live, a controller would return the same shapes through Inertia props or a JSON endpoint, and `app.jsx` would pass them down as props instead of importing the files. The components themselves do not need to change.

## Demonstration behaviour

Nothing is sent or stored. The availability results and the enquiry confirmation are both clearly labelled "Demonstration data" / "Demonstration only". Heritage Villa is always unavailable in the demo so the unavailable state can be seen.

## Image credits

All photographs are from free-to-use sources, resized to under about 200 KB each.

## Project history

The site was first built in a separate Laravel project (Laravel 13.37.0, Vite 8.3.4) and then later will integrate into the assigned work folder, which ran Laravel 13.35.0 and Vite 8.3.4. The Vite version matches; the Laravel difference is a minor release. See `docs/SUBMISSION.md` for any integration issues.

## Documents

Design decisions, self-review and the build and test record are in [`docs/SUBMISSION.md`](docs/SUBMISSION.md). Screenshots are in `docs/screenshots/`.
