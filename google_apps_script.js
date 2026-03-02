// ============================================================
// Google Apps Script — Paste this in Google Apps Script Editor
// ============================================================
// This script receives location data via POST request and
// writes it to the active Google Sheet.
//
// SETUP INSTRUCTIONS:
// 1. Go to https://sheets.google.com and create a new spreadsheet
// 2. Name it "Location Tracker" (or anything you like)
// 3. Go to Extensions > Apps Script
// 4. Delete any existing code and paste this entire script
// 5. Click "Deploy" > "New deployment"
// 6. Select type: "Web app"
// 7. Set "Execute as": Me
// 8. Set "Who has access": Anyone
// 9. Click "Deploy" and copy the Web App URL
// 10. Paste that URL in index.html where it says YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
// ============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Latitude",
        "Longitude",
        "Accuracy",
        "Google Maps Link",
        "User Agent",
        "Platform",
        "Language",
        "Screen Resolution",
        "Referrer",
        "IP Address"
      ]);

      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, 11);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1a73e8");
      headerRange.setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);

    // Append the data row
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.latitude || "N/A",
      data.longitude || "N/A",
      data.accuracy || "N/A",
      data.googleMapsLink || "N/A",
      data.userAgent || "N/A",
      data.platform || "N/A",
      data.language || "N/A",
      data.screenResolution || "N/A",
      data.referrer || "N/A",
      getIPAddress() || "N/A"
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 11);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Data logged" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      message: "Location Tracker is running! Send POST requests to log data."
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Note: Google Apps Script cannot directly get the client IP address.
// This is a placeholder. The IP will show as "N/A".
function getIPAddress() {
  return null;
}
