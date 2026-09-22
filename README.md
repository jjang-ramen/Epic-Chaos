# Epic Chaos website

A static website. Serve the repository root to preview it locally; no build step is required.

## Styles

Each page loads these files in order:

1. `theme.css`: the cream, black, and red palette with warm bronze details, fonts, spacing constants, and game class colors.
2. `style.css`: shared foundations, navigation, sections, buttons, cards, footers, and responsive behavior.
3. `home.css` on the homepage, or the page folder's `style.css`: layouts and components unique to that page.

The History page at `/History/` also shares the Armory video cards and player, with its own archive layout in `History/style.css`. Add older recordings there, keeping them separate from current-season progression.

Both video seasons use `Armory/style.css` and `Armory/script.js`. Season 1 lives at `/Armory/`; Season 2 lives at `/Armory/Season-2/`.

The Pictures page at `/Pictures/` contains the guild photo wall and full-size viewer. Originals live in `Pictures/images/` with simple filenames; smaller JPEG previews live in `Pictures/thumbs/` to keep the wall fast. Add photos in `Pictures/index.html`; the script discovers each `.photo` link. Desktop starts with a draggable wall, phones start with the grid, and visitors can switch views. Drag prints or the background, use arrow keys with a focused print to move it, and use Reset wall to restore the layout. Arrangements last only for the current visit.

Keep palette changes in `theme.css`. Add page-specific styles to the relevant folder instead of overriding them globally. Update stylesheet query versions in the HTML when changing styles so returning visitors receive the new files.

## Navigation

Every page uses the same five top-level choices: Home, Guild, Raiding, Memories, and Join the guild. Guild contains people, community, and contact pages; Raiding contains logs, current kills, archives, and raid rules; Memories contains Pictures and History. The footer repeats these groups with direct links. Keep these menus consistent when adding a page. `nav.js` handles disclosure closing, keyboard Escape, and focus behavior; each page script retains its existing mobile toggle.

Palette roles: cream provides paper surfaces, photo frames, summary cards, and the footer; warm black grounds the main page and navigation; red marks actions and raid progress. Subtle bronze details keep the palette warm. Game class colors stay independent of this palette.

## Before publishing

Check all ten pages at desktop and phone widths, the mobile menu, roster filters and search, raid information tabs, video dialogs, and the photo wall and viewer. Confirm local links, assets, and section anchors resolve. The roster loads from public Google Sheets and keeps a fallback when the feed is unavailable.
