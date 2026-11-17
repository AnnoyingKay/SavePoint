SAVEPOINT
Private videogame library for two people. Plain files, no build step.
Hosted on GitHub Pages (AnnoyingKay/SavePoint). Shares the Firebase project shelf-b5282
with Shelf and Musicbox, and runs inside the Libraries parent page.

FILES
  index.html               the whole app
  sw.js                    keeps the app fresh and offline. The version number lives ONLY here
                           (const VERSION). Settings shows it as "SavePoint version N".
  manifest.webmanifest, icon-*.png, apple-touch-icon.png   home screen install

FIRESTORE RULES
  Not kept in this repo. They live in the Libraries repo only. Changes in this app write to
  the existing games collection and the existing gamesMeta/household documents, so no rules
  change is needed. If a future change needs one, it will be flagged before you upload.

UPDATING
  Upload the files over the old ones (Add file, Upload files, Commit changes).
  Close and reopen the app twice, then check the version number in Settings.

SETTINGS
  Sync across devices: status, Sync now, Export JSON backup, Restore from backup, Sign out.
  Physical or digital: set the format on existing games in bulk.
  Game database tools: Import games from CSV, assign covers, match with RAWG.
  Advanced (collapsed): RAWG key, barcode helper address, Account ID.

CSV IMPORT
  Columns: title, platform, format, region, last_played, check. Only title and platform are
  required. Platform can hold several values separated by ; (for example PS4;PS3). format is
  physical or digital, or empty. Rows with text in "check" start unticked. Nothing is added
  until you tap Import.

DATA NOTES
  games/{id}: title, platform, year, publisher, genres, cover, subscription, subName, notes,
  ownedBy (list of user IDs), format ("physical" or "digital", lowercase, counted by the
  Libraries home page, do not change the spelling), addedBy, addedByName, addedAt, rawgId.
  A game with no ownedBy counts as owned by its addedBy person.
  gamesMeta/household/config/consoles: owned (true/false per console) and counts (devices).

VERSION HISTORY
  6   Debug logger removed, version shown first in Settings, sync card, Advanced, four views.
  7   Owned by, console device counts, filter panel, owner and console sorts, richer backup.
  8   Four new themes (three light, one dark).
  9   App name and cover subtitle change with the theme. Physical or digital format,
      bulk setter, filter, backup and restore.
  10  CSV import with platform questions, "Found a copy" when adding, RAWG fill after import.
