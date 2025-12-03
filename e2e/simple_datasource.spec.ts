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
	await page.getByRole('textbox', { name: 'Name' }).fill('50-FUND-DATA-SIMPLE');
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
	await page.getByRole('columnheader', { name: 'Fund Name' }).getByLabel('Primary Key').click();
	await page.getByRole('columnheader', { name: 'Effective Date' }).getByLabel('Primary Key').click();
	// Step 8: Click on "Save"
	await page.waitForTimeout(200);
	await page.getByRole('button', { name: 'Save' }).click();
	// Step 9: Wait for the datasource to be saved
	await page.waitForTimeout(5000);
	// Step 10: Verify that the datasource was saved successfully
	await expect(page.getByText('Successfully saved the datasource')).toBeVisible();
	await page.getByText('50-FUND-DATA-SIMPLE').hover();
	// await page.locator('.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-row.MuiGrid-grid-xs-grow.css-1p364wr').first().hover();
	await page.getByRole('button', { name: 'Delete' }).click();
	await page.getByRole('button', { name: 'Yes' }).click();
	await page.waitForTimeout(5000);
	await expect(page.getByText('Deleted successfully')).toBeVisible();
});
