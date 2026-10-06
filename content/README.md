# Start here

Each entry has its own folder. Everything belonging to that entry stays together:

```text
content/
  sunday-walk/
    info.yaml     Shared details: date, type, location, photo
    en.md         English title, summary, photo description, and story
    de.md         German version (optional)
    fr.md         French version (optional)
    cover.jpg     Your photo
```

You only need to edit this `content` folder. The website code lives elsewhere.

## Create an entry

1. **Copy the whole `_new-entry` folder** inside `content`.
2. Rename the copy, for example `sunday-walk`. Use lowercase letters and hyphens, without spaces or a leading underscore. Avoid changing the name after publishing: it becomes the entry's web address.
3. Put your photo inside the new folder. Name it `cover.jpg`, or enter its exact filename next to `cover` in `info.yaml`. JPG, PNG, WebP, and AVIF work; export HEIC phone photos as JPG first.
4. Open `info.yaml` in a plain-text editor or with GitHub's pencil button. Fill in the shared details below.
5. Open `en.md`, `de.md`, or `fr.md` and write your text. **Delete any language files you haven't written yet** so starter text won't appear on the website. Keep at least one language file.
6. When ready, change `draft: true` to `draft: false` in `info.yaml`. This publishes all the language files in that folder in the next website update.

The `_new-entry` folder is a starter and never appears on the website. It intentionally contains no photo: add your own to your copy.

## Shared details: info.yaml

These settings apply to every language. Keep the field names, quotes, brackets, and the spaces before `name`, `lat`, and `lng`. Replace the example values.

| Field | What to enter |
| --- | --- |
| `date` | Year-month-day, e.g. `2026-10-06` |
| `template` | `diary` for the diary layout, or `spot` for the favourite-spot layout |
| `kinds` | `[diary]` for burgundy pins, `[spot]` for teal, or `[diary, spot]` for both |
| `cover` | A photo filename from this same folder, e.g. `cover.jpg` |
| `location` → `name` | The name of the place |
| `location` → `lat` | Latitude: the first coordinate |
| `location` → `lng` | Longitude: the second coordinate |
| `draft` | `true` keeps the whole entry off the site; `false` includes it |

To find coordinates, open Google Maps on a computer and right-click the exact spot. Copy the first number to `lat` and the second to `lng`. Use decimal points, not commas, and preserve any minus signs. Replace the starter's example Strasbourg coordinates with your own.

Dates don't schedule publication: `draft: false` includes the entry in the next website update.

## Language files: en.md, de.md, fr.md

Each file has three short details at the top:

```markdown
---
title: "Your headline"
description: "One or two sentences for the map preview."
coverAlt: "A description of the photo for people who cannot see it."
---

Your story begins here.
```

Keep both `---` lines and the quotes. If your text needs quotation marks, use apostrophes inside the existing double quotes. Write normally underneath, leaving a blank line between paragraphs.

The filename selects the language: `en.md` is English, `de.md` is German, and `fr.md` is French. You don't need language settings or translation IDs. Files in the same folder are automatically linked as translations.

Start with any one language. To translate later, copy that file in the same folder, rename it to the other language's filename, and translate its title, description, photo description, and story. The website does not translate automatically. A missing translation simply doesn't appear in that language's map or index.

These writing shortcuts are optional:

```markdown
## A heading

A paragraph with **bold words** and *italic words*.

- A list item
- Another item

[Words to click](https://example.com)
```

Don't save the files with Word. On Windows, check that a filename doesn't accidentally end in `.md.txt` or `.yaml.txt`.

## Instagram and YouTube (optional)

Add either line at the bottom of `info.yaml`, with no spaces at the start:

```yaml
instagram: "https://www.instagram.com/p/YOUR_POST/"
youtube: "VIDEO_ID"
```

Use your real Instagram post link. For YouTube, replace `VIDEO_ID` with the 11-character ID after `youtu.be/` or `watch?v=` in the video's URL, without extra `&...` or `?...` options. These media settings are shared by all translations. Leave them out if you don't need them.

## Upload through GitHub

Once GitHub Pages publishing has been set up for this repository:

1. Prepare your new entry folder on your computer using the steps above.
2. Open the repository on GitHub and open **content**.
3. Choose **Add file → Upload files**, and drag your complete entry folder into the upload area. Check that its files are grouped under your folder's name.
4. Choose **Commit changes** to save to **main**.
5. The website rebuilds automatically. Check **Actions** for a green check, then refresh the site.

To update an existing entry, open its folder in GitHub, open the file, and click the pencil. Save with **Commit changes**. You can also upload changed files into the same entry folder.

If an update fails, the previous published site stays online. Check photo filenames, paired quotes, and indentation in `info.yaml`. Ask the site maintainer if needed.

Drafts stay off the website, but files in a public repository are still readable by others. Keep private material outside the repository.
