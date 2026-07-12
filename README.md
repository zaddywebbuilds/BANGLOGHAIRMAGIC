# BANGLOG HAIR MAGIC — Website

Premium one-page sales website for BANGLOG HAIR MAGIC natural haircare brand.

---

## Files

```
BANGLOG HAIR MAGIC/
├── index.html          ← All page content and structure
├── styles.css          ← All styling, colours, layout, responsive rules
├── script.js           ← Navigation, animations, cart, FAQ, WhatsApp ordering
├── README.md           ← This file
└── [product images]    ← All brand images (already in the root folder)
```

---

## Before You Go Live — Replace These Placeholders

Search the files for these strings and replace them:

| Placeholder | Replace with |
|---|---|
| `WHATSAPP_NUMBER` | Full international number e.g. `2348012345678` (no + or spaces) |
| `INSTAGRAM_URL` | Full Instagram profile URL |
| `TIKTOK_URL` | Full TikTok profile URL |
| `SHOP_URL` | Your shop or order page URL |
| `EMAIL_ADDRESS` | Your business email address |
| `BUSINESS_ADDRESS` | Your physical or mailing address |
| `DELIVERY_INFORMATION` | Your delivery terms, areas and timeframes |
| `REPLACE_WITH_YOUR_DOMAIN` | Your website domain e.g. `https://bangloghairmagic.com` |
| `PRIVACY_POLICY_URL` | Link to your privacy policy page |
| `TERMS_URL` | Link to your terms and conditions |
| `RETURNS_URL` | Link to your returns policy |
| `[Add price]` | Each product's confirmed selling price |

---

## Add Product Prices

In `index.html`, find each product card and replace:

```html
<span class="product-price">[Add price]</span>
```

With the actual price, e.g.:

```html
<span class="product-price">₦8,500</span>
```

---

## WhatsApp Number

In `script.js`, line 4:

```js
const WHATSAPP_NUMBER = 'WHATSAPP_NUMBER';
```

Replace with your number in international format without `+` or spaces:

```js
const WHATSAPP_NUMBER = '2348012345678';
```

---

## Product Details to Complete

The following products need their prices added to `index.html`:

- Root Bloom Oil (100ml) — ingredients already listed on labels
- Clarifying Black Shampoo (500ml)
- Intense Repair Deep Conditioner (250ml)
- Moisture Lock Leave-In Conditioner (250ml)
- Edge & Follicle Revive Butter (250g)
- Anti-Dandruff Therapy Oil (100ml)

---

## Adding New Reviews

Customer reviews are already populated with real WhatsApp screenshots. To add more:

1. Save the screenshot image into the same folder as the other images
2. In `index.html`, copy an existing `.review-card` block
3. Update the `<img>` `src` and `alt` attributes
4. Update the `<blockquote>` text with the customer quote
5. Update the `<footer>` with the product name

---

## Deployment

### GitHub Pages
1. Create a new GitHub repository
2. Upload all files (images + index.html + styles.css + script.js)
3. Go to Settings → Pages → Source: main branch / root
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify (Recommended — free, fast)
1. Go to [netlify.com](https://netlify.com) and sign up free
2. Drag the entire `BANGLOG HAIR MAGIC` folder onto the Netlify deploy area
3. Your site is live instantly with a Netlify URL
4. Add a custom domain in Site Settings → Domain Management

### Standard Web Hosting
Upload all files to your hosting `public_html` folder via FTP or cPanel File Manager.

---

## Editing Content

All content is in `index.html`. The file is structured with clear HTML comments marking each section:

- Announcement Bar
- Header / Navigation
- Hero Section
- Four Principles
- Why Banglog
- Hair Concerns Grid
- Products
- Real Results (Before & After)
- 30-Day Routine
- Outcomes Strip
- Brand Story
- Why Customers Choose Banglog
- Customer Reviews
- FAQ
- Final CTA
- Footer

---

## Editing Colours

All colours are defined at the top of `styles.css` as CSS variables:

```css
:root {
  --coral:      #FF8C72;
  --deep-coral: #E5664A;
  --cream:      #FDF4E8;
  /* ... etc */
}
```

Change a colour value once and it updates everywhere on the site.

---

## Performance Notes

- All images are referenced from the root folder — no external image hosting needed
- Fonts are loaded from Google Fonts (requires internet connection)
- No JavaScript frameworks — loads very fast
- Lazy loading is applied to all below-fold images
- For best performance, convert product images to WebP format using [Squoosh](https://squoosh.app)

---

## Legal Reminders

- All customer review screenshots shown are real WhatsApp messages from real customers
- Before publishing, ensure you have explicit permission from each customer whose message appears
- All before-and-after results shown include the disclaimer that individual results vary
- No medical claims are made anywhere on the site — this is intentional and legally important
- Add your Privacy Policy, Terms & Conditions and Returns Policy before going live

---

## Brand Statement

*"BANGLOG HAIR MAGIC. Because healthy hair starts at the root, and confidence grows with every strand."*
