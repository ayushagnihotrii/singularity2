// ============================================================
// Google Apps Script — Paste this in Google Apps Script Editor
// ============================================================
// Sheet Name: Singularity02
//
// SETUP:
// 1. Open your Google Sheet "Singularity02"
// 2. Go to Extensions > Apps Script
// 3. Delete all existing code and paste this entire script
// 4. Click Deploy > New deployment > Web app
// 5. Execute as: Me | Who has access: Anyone
// 6. Deploy and copy the Web App URL
// 7. Paste URL in index.html where it says YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
// ============================================================

// ⚠️ CHANGE THIS if your sheet tab name is different
var SHEET_NAME = "Sheet1";

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // If the sheet tab doesn't exist, fall back to first sheet
    if (!sheet) {
      sheet = ss.getSheets()[0];
    }

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
        "Referrer"
      ]);

      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, 10);
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
      data.referrer || "N/A"
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 10);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Data logged" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing — visit the URL in browser to check)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      message: "Location Tracker is running! Send POST requests to log data."
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
