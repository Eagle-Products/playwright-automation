import { test, expect } from '@playwright/test';
import * as path from 'path';

test('test', async ({ page }) => {
	// Step 1: Navigate to the Ensemble application login page
	await page.goto('https://ensembledev.eagleconsulting.co.in/login');
	// Step 2: Click on "Sign in with Email/User ID"
	await page.getByRole('button', { name: 'Sign in with Email/User Id' }).click();
	await page.getByRole('textbox', { name: 'Email/User Id' }).click();
	await page.getByRole('textbox', { name: 'Email/User Id' }).fill('superuser');
	await page.getByRole('textbox', { name: 'Password' }).click();
	await page.getByRole('textbox', { name: 'Password' }).fill('Eagle@2025');
	await page.waitForTimeout(2000);
	await page.getByRole('button', { name: 'Sign in', exact: true }).click();
	await page.waitForTimeout(10000);
	// Step 3: Go to the Datasource page
	await page.getByRole('navigation').getByRole('button').filter({ hasText: /^$/ }).click();
	await page.getByRole('link', { name: 'Datasource' }).click();
	// Step 4: Add a new datasource
	await page.locator('#add_icon').click();
	await page.getByRole('textbox', { name: 'Name' }).fill('50-FUND-DATA-COMPLEX');
	// Step 5: Select the data frequency
	await page.getByRole('combobox', { name: 'Daily' }).click();
	await page.getByRole('option', { name: 'Monthly' }).click();
	// Step 6: Select the file from the device and upload the file
	await page.getByRole('button', { name: 'Select a file from this device' }).hover();
	const [fileChooser] = await Promise.all([page.waitForEvent('filechooser'), page.getByRole('button', { name: 'Select a file from this device' }).click()]);
	await fileChooser.setFiles(path.resolve(__dirname, '..', 'fund_security_data_2022_to_2025.csv'));
	await page.waitForTimeout(2000);
	// Step 7: Select the primary keys
	await page.getByRole('columnheader', { name: 'Fund ID' }).getByLabel('Primary Key').click();
	await page.getByRole('columnheader', { name: 'Fund ID' }).getByLabel('More').click();
	await page.getByRole('textbox', { name: 'Name' }).click();
	await page.getByRole('checkbox', { name: 'use this field for filtering' }).check();
	await page.waitForTimeout(200);
	await page.getByRole('checkbox', { name: 'and make it mandatory' }).check();
	await page.getByRole('checkbox', { name: 'use this field for grouping' }).check();
	await page.getByRole('checkbox', { name: 'use this field to create composite filter' }).check();
	await page.getByRole('button', { name: 'OK' }).click();
	await page.getByRole('columnheader', { name: 'Fund Name' }).getByLabel('Primary Key').click();
	await page.getByRole('columnheader', { name: 'Fund Name' }).getByLabel('More').click();
	await page.getByRole('textbox', { name: 'Name' }).click();
	await page.getByRole('checkbox', { name: 'use this field for filtering' }).check();
	await page.getByRole('checkbox', { name: 'use this field for grouping' }).check();
	await page.getByRole('button', { name: 'OK' }).click();
	await page.getByRole('columnheader', { name: 'Effective Date' }).getByLabel('Primary Key').click();
	await page.getByRole('columnheader', { name: 'Effective Date' }).getByLabel('More').click();
	await page.getByRole('textbox', { name: 'Name' }).click();
	await page.getByRole('checkbox', { name: 'use this field for filtering' }).check();
	await page.locator('#mui-component-select-column_dateFormat').click();
	await page.getByRole('option', { name: 'YYYY-MM-DD' }).click();
	await page.getByRole('button', { name: 'OK' }).click();
	// Step 8: Go to the enriched fields tab
	await page.getByRole('tab', { name: 'Enriched Fields' }).click();
	await page.getByRole('button', { name: 'Add' }).click();
	// Step 9: Add an enriched field
	await page.getByRole('textbox', { name: 'Name' }).fill('advReturn');
	await page.waitForTimeout(500);
	const editor = page.getByRole('textbox', { name: 'Editor content' });
	await editor.waitFor({ state: 'attached' });
	await page.waitForTimeout(300);
	await editor.focus();
	await page.waitForTimeout(200);
	await editor.press('ControlOrMeta+a');
	await page.waitForTimeout(300);
	await editor.type('function advReturn_fn() {', { delay: 100 });
	await page.waitForTimeout(100);
	await editor.press('Delete'); // Remove auto-added closing brace
	await page.waitForTimeout(100);
	await editor.press('Enter');
	await page.waitForTimeout(100);
	await editor.type(`json.advReturn = json.Return*100;`, { delay: 100 });
	await page.waitForTimeout(100);
	await editor.press('Enter');
	await page.waitForTimeout(100);
	await editor.type('}', { delay: 100 });
	await page.waitForTimeout(100);
	await editor.press('Enter');
	await page.waitForTimeout(100);
	await editor.type('advReturn_fn();', { delay: 100 });
	await page.waitForTimeout(200);
	await page.getByRole('button', { name: 'Ok' }).click();
	// Step 10: Go to the quality checks tab
	await page.getByRole('tab', { name: 'Quality Checks' }).click();
	await page.getByRole('button', { name: 'Add' }).click();
	// Step 11: Add a quality check
	await page.getByRole('textbox', { name: 'Name' }).fill('IsEffectiveDateNotEmpty');
	const editor1 = page.getByRole('textbox', { name: 'Editor content' });
	await editor1.waitFor({ state: 'attached' });
	await page.waitForTimeout(300);
	await editor1.focus();
	await page.waitForTimeout(200);
	await editor1.press('ControlOrMeta+a');
	await page.waitForTimeout(300);
	await editor1.type('function IsEffectiveDateNotEmpty_fn() {', { delay: 100 });
	await page.waitForTimeout(100);
	await editor1.press('Delete'); // Remove auto-added closing brace
	await page.waitForTimeout(100);
	await editor1.press('Enter');
	await page.waitForTimeout(100);
	await editor1.type(`json.IsEffectiveDateNotEmpty = json['Effective Date'] !='';`, { delay: 100 });
	await page.waitForTimeout(100);
	await editor1.press('Enter');
	await page.waitForTimeout(100);
	await editor1.type('}', { delay: 100 });
	await page.waitForTimeout(100);
	await editor1.press('Enter');
	await page.waitForTimeout(100);
	await editor1.type('IsEffectiveDateNotEmpty_fn();', { delay: 100 });
	await page.waitForTimeout(200);
	await page.getByRole('textbox', { name: 'Edit', exact: true }).click();
	await page.getByRole('textbox', { name: 'Edit', exact: true }).fill('Effective date is not empty');
	await page.locator('#mui-component-select-column_type').click();
	await page.getByRole('option', { name: 'Soft' }).click();
	await page.getByRole('button', { name: 'Ok' }).click();
	// Step 12: Click on "Save"
	await page.waitForTimeout(200);
	await page.getByRole('button', { name: 'Save' }).click();
	// Step 13: Wait for the datasource to be saved
	await page.waitForTimeout(5000);
	// Step 14: Verify that the datasource was saved successfully
	await expect(page.getByText('Successfully saved the datasource')).toBeVisible();

	await page.getByText('FUND-DATA-COMPLEX').hover();
	// await page.locator('.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-row.MuiGrid-grid-xs-grow.css-1p364wr').first().hover();
	await page.getByRole('button', { name: 'Delete' }).click();
	await page.getByRole('button', { name: 'Yes' }).click();
	await page.waitForTimeout(5000);
	await expect(page.getByText('Deleted successfully')).toBeVisible();
});
