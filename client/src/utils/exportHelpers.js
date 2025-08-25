import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Exports any JSON data to an Excel file.
 * 
 * @param {Array} jsonData - Array of objects representing rows.
 * @param {String} fileName - Name of the exported Excel file (without extension).
 * @param {Object} columnsMap - Optional. Keys map to rename JSON object keys to readable column headers.
 */
export const exportJsonToExcel = (jsonData, fileName = "data", columnsMap = null) => {
  if (!jsonData || !jsonData.length) {
    alert("No data to export!");
    return;
  }

  let dataToExport = jsonData;

  // If a columnsMap is provided, remap the keys in jsonData to friendly column names
  if (columnsMap) {
    dataToExport = jsonData.map((row) => {
      const mappedRow = {};
      for (const key in columnsMap) {
        mappedRow[columnsMap[key]] = row[key] || "";
      }
      return mappedRow;
    });
  }

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);

  // Create workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate Excel buffer
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  // Create a blob from buffer
  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Trigger download using file-saver
  saveAs(dataBlob, `${fileName}_${new Date().toISOString().slice(0, 10)}.xlsx`);
};
