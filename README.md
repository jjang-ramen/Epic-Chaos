# Epic Chaos website

A static website. Serve the repository root to preview it locally; no build step is required.

## Styles

Each page loads these files in order:

1. `theme.css`: the shared red-and-black palette, fonts, spacing constants, and game class colors.
2. `style.css`: shared foundations, navigation, sections, buttons, cards, footers, and responsive behavior.
3. `home.css` on the homepage, or the page folder's `style.css`: layouts and components unique to that page.

Both video seasons use `Armory/style.css` and `Armory/script.js`. Season 1 lives at `/Armory/`; Season 2 lives at `/Armory/Season-2/`.

Keep palette changes in `theme.css`. Add page-specific styles to the relevant folder instead of overriding them globally. Update stylesheet query versions in the HTML when changing styles so returning visitors receive the new files.

## Before publishing

Check all eight pages at desktop and phone widths, the mobile menu, roster filters and search, raid information tabs, and video dialogs. Confirm local links, assets, and section anchors resolve. The roster loads from public Google Sheets and keeps a fallback when the feed is unavailable.
