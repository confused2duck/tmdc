# Connect Your Google Sheet as Lead Backend

This landing page now sends leads directly to a Google Sheet through a Google Apps Script webhook. No MongoDB is required for the Vercel deployment.

## 1) Create your Google Sheet

1. Create a new Google Sheet (for example, **DataOS - Leads**).
2. In row 1, add these headers exactly:
   ```
   timestamp | id | name | email | company | phone | message | cta_source
   ```

## 2) Deploy an Apps Script webhook

1. In your sheet, open **Extensions -> Apps Script**.
2. Replace the default code with:

```javascript
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      body.timestamp || new Date().toISOString(),
      body.id || '',
      body.name || '',
      body.email || '',
      body.company || '',
      body.phone || '',
      body.message || '',
      body.cta_source || ''
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Deploy -> New deployment**.
4. Choose **Web app**.
5. Set **Execute as** to `Me` and **Who has access** to `Anyone`.
6. Deploy, approve permissions, and copy the web app URL:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 3) Wire it into Vercel

In your Vercel project environment variables, add:

```
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/AKfycb.../exec"
```

Optional:

- Add `CORS_ORIGINS` if you want to restrict submissions to specific origins.

Every new lead submitted via the landing page will now be appended to your sheet. If the webhook is missing or fails, the API returns an error so misconfiguration is visible immediately.

## 4) Verify

- Submit the form on the landing page.
- You should see a new row appear in your Google Sheet within a second.
- The response from `/api/leads` will include `"sheet_synced": true`.

## Google Ads Conversion Tracking

Replace the placeholders in `frontend/public/index.html`:

- `AW-XXXXXXXXX` -> your Google Ads conversion ID.
- `AW-XXXXXXXXX/YYYYYYYYYY` -> `conversion_id/conversion_label`.

The page calls `window.trackLeadConversion(ctaSource)` after a successful submission.
