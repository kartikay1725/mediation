import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import { MediationCase } from '@/types/mediationCase';

const filePath = path.join(process.cwd(),'public', 'exports', 'mediation_cases.xlsx');
const SHEET_NAME = 'Cases';

// Ensure directory exists
const ensureDirectoryExists = () => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

async function debugExcelStructure() {
  try {
    if (!fs.existsSync(filePath)) {
      console.log('Excel file does not exist yet');
      return;
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet(SHEET_NAME);
    
    console.log('\n=== EXCEL STRUCTURE DEBUG ===');
    console.log(`File Path: ${filePath}`);
    console.log(`Sheet Name: ${sheet?.name || 'Not Found'}`);
    console.log(`Row Count: ${sheet?.rowCount || 0}`);
    
    sheet?.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber <= 3) {
      console.log(`Row ${rowNumber}:`, row.values);
      }
    });
    console.log('=== END DEBUG ===\n');
  } catch (error) {
    console.error('Debug error:', error);
  }
}

export async function appendCaseToExcel(data: MediationCase): Promise<boolean> {
  try {
    ensureDirectoryExists();
    
    const workbook = new ExcelJS.Workbook();
    let isNewFile = false;

    if (fs.existsSync(filePath)) {
      await workbook.xlsx.readFile(filePath);
    } else {
      //eslint-disable-next-line
      isNewFile = true;
    }

    let sheet = workbook.getWorksheet(SHEET_NAME);
    if (!sheet) {
      sheet = workbook.addWorksheet(SHEET_NAME);
      // Match EXACT headers from your Excel file
      sheet.addRow([
        'caseNo',
        'partiesName',
        "Referral Court's Name",
        "Category/Nature",
        'mediatorName',
        "First Date of Mediation",
        'Status',
        'Next Hearing'
      ]);
    }

    // Add new row with proper column order
    sheet.addRow([
      data.caseNo,
      data.partiesName,
      data.referralCourt,
      data.category,
      data.mediatorName,
      data.firstDate,
      data.status,
      data.nextHearingDate
    ]);

    await workbook.xlsx.writeFile(filePath);
    await debugExcelStructure();
    return true;
  } catch (error) {
    console.error('Error in appendCaseToExcel:', error);
    throw error;
  }
}

export async function searchMediationCases(
  query: string,
  field: keyof MediationCase = 'caseNo'
): Promise<MediationCase[]> {
  try {
    await debugExcelStructure();

    if (!fs.existsSync(filePath)) {
      console.log('Excel file not found');
      return [];
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet(SHEET_NAME);
    
    if (!sheet) {
      console.log('Worksheet not found');
      return [];
    }

    const results: MediationCase[] = [];
    const lowerQuery = query.toLowerCase().trim();

    sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header

      // Map columns based on actual Excel structure
      const caseData: MediationCase = {
        caseNo: row.getCell(1).text?.toString().trim() || '',         // A
        partiesName: row.getCell(2).text?.toString().trim() || '',     // B
        referralCourt: row.getCell(3).text?.toString().trim() || '',   // C
        category: row.getCell(4).text?.toString().trim() || '',        // D
        mediatorName: row.getCell(5).text?.toString().trim() || '',    // E
        firstDate: row.getCell(6).text?.toString().trim() || '',       // F
        status: row.getCell(7).text?.toString().trim() || '',          // G
        nextHearingDate: row.getCell(8).text?.toString().trim() || ''  // H
      };

      console.log(`Checking row ${rowNumber}:`, caseData);

      // Flexible search with null checks
      const fieldValue = caseData[field]?.toLowerCase() || '';
      if (fieldValue.includes(lowerQuery)) {
        console.log(`Match found in row ${rowNumber}`);
        results.push(caseData);
      }
    });

    console.log(`Search completed. Found ${results.length} results`);
    return results;
  } catch (error) {
    console.error('Error in searchMediationCases:', error);
    return [];
  }
}

export async function getAllCases(): Promise<MediationCase[]> {
  return searchMediationCases('', 'caseNo');
}

export async function updateCaseInExcel(updatedCase: MediationCase) {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const sheet = workbook.getWorksheet(SHEET_NAME);
    
    if (!sheet) {
      console.log('Worksheet not found');
      return false;
    }

    let caseUpdated = false;

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row

      const currentCaseNo = row.getCell(1).text?.toString().trim();
      if (currentCaseNo === updatedCase.caseNo) {
        // Update each cell individually with proper column mapping
        row.getCell(1).value = updatedCase.caseNo;         // A: caseNo
        row.getCell(2).value = updatedCase.partiesName;    // B: partiesName
        row.getCell(3).value = updatedCase.referralCourt;  // C: Referral Court's Name
        row.getCell(4).value = updatedCase.category;       // D: Category/Nature
        row.getCell(5).value = updatedCase.mediatorName;   // E: mediatorName
        row.getCell(6).value = updatedCase.firstDate;      // F: First Date of Mediation
        row.getCell(7).value = updatedCase.status;         // G: Status
        row.getCell(8).value = updatedCase.nextHearingDate;// H: Next Hearing
        
        caseUpdated = true;
      }
    });

    if (caseUpdated) {
      await workbook.xlsx.writeFile(filePath);
      console.log(`Case ${updatedCase.caseNo} updated successfully`);
      return true;
    } else {
      console.log(`Case ${updatedCase.caseNo} not found`);
      return false;
    }
  } catch (error) {
    console.error('Error updating case:', error);
    throw error;
  }
}
