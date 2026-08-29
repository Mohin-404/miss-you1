# I Miss You 💕 — edit guide

A cute scroll page you can personalize with your own words, GIFs, and photos.

**Made by [@chifuyu_o07](https://www.instagram.com/mohinvaiya/)**

---

## Quick start

1. Open the project folder.
2. Edit **`content.js`** for almost all text (cards, captions, letter, etc.).
3. Drop photos into **`images/`** and GIFs into **`gifs/`** (see below).
4. Open **`index.html`** in your browser (double-click or use Live Server).

---

## Edit card & page text → `content.js`

This is the main file. Open it in any text editor (Notepad, VS Code, etc.).

| Section in file | What it controls |
|-----------------|------------------|
| `pageTitle` | Browser tab title |
| `hero` | Top “i miss you” area |
| `meter` | Miss-o-meter section |
| `things.cards` | **“Things I miss” tap cards** |
| `pics.captions` | Text under each photo |
| `thought` | Sticky note intrusive thought |
| `letter.lines` | Letter paragraphs |
| `finale` | Ending + “say hi” button label |

### “Things I miss” cards

Each item in `things.cards` is one card:

```js
{
  color: "pink",      // card color theme
  tape: "pink",       // tape strip color on corner
  gif: "thing-2",     // matches gifs/thing-2.gif
  text: "you stealing my <strong>hoodies</strong> like it's not theft",
},
```

- **Bold words:** wrap in `<strong>like this</strong>`
- **New line in text:** not supported in cards (keep one line)
- **Add a card:** copy a full `{ ... },` block, use the next number (`thing-7`, etc.), and add `thing-7.gif` in `gifs/`
- **Remove a card:** delete its `{ ... },` block

**Card `color` options:** `cream`, `pink`, `lavender`, `mint`, `blush`, `peach`  
**Tape `tape` options:** `yellow`, `pink`, `lavender`, `green`, `orange`

### Photo captions

Edit the `pics.captions` array — one line per photo, in order:

```js
captions: [
  "— look at our dumb faces 🥹",   // pic1
  "— that one good day ☀️",        // pic2
  // ...
],
```

### Letter & sections with line breaks

Use `<br />` inside the text string:

```js
text: "line one<br />line two",
```

---

## Add your photos → `images/` folder

| Base name | Shows as |
|-----------|----------|
| `pic1` | 1st photo card |
| `pic2` | 2nd |
| `pic3` | 3rd |
| `pic4` | 4th |
| `pic5` | 5th |
| `pic6` | 6th |

**Supported extensions:** `.jpg`, `.jpeg`, `.png`, `.PNG`, `.webp`, `.avif`, `.gif`

Examples: `pic1.png`, `pic2.PNG`, `pic3.jpg`, `pic4.webp` — use any one extension per slot; PNG files work as-is (no rename to `.jpg`).

- If no file is found for a slot, a soft gradient placeholder appears instead.
- Captions are edited in **`content.js`** → `pics.captions`, not in the filename.

---

## Add GIFs → `gifs/` folder

| File | Where it appears |
|------|------------------|
| `hero.gif` | Under “i miss you” |
| `meter-bear.gif` | Miss-o-meter bear |
| `thing-1.gif` … `thing-6.gif` | Thing cards (match `gif` in `content.js`) |
| `thought.gif` | Intrusive thought section |
| `kiss.gif` | Under the letter |
| `waiting.gif` | Finale section |

- Also works: `.webp`, `.png`, `.PNG`, `.jpg`, or `.jpeg` with the **same name** (e.g. `thing-1.png`)
- If a file is missing, an online fallback GIF loads automatically.

---

## Timer & WhatsApp → `script.js`

At the top of **`script.js`**, find `CONFIG`:

```js
missStartTime: new Date('2026-05-19T10:00:00'),  // when you started missing them
whatsappNumber: "919876543210",                   // country code, no + or spaces
whatsappMessage: "hi... i miss u too ♡",
```

The **“say hi ♡”** button opens WhatsApp when `whatsappNumber` is set. Otherwise it shows a sweet message on click.

---

## File overview

```
miss you/
├── content.js    ← edit all text here
├── script.js     ← timer, WhatsApp, GIF loading
├── index.html    ← page structure (rarely need to touch)
├── styles.css    ← colors & layout
├── images/       ← your photos (pic1.png, pic2.jpg, …)
├── gifs/         ← your GIFs
└── README.md     ← this file
```

---

## Credits

**made by @chifuyu_o07**  
Instagram: [https://www.instagram.com/mohinvaiya/](https://www.instagram.com//)
