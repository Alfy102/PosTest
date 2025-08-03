import { test, expect, Page } from "@playwright/test"
import { RateCalculatorPage } from "../pageObjects/rateCalculator.page"




test.describe('Test Case 1', () => {
    test('Rate Calculator', async ({ page }: { page: Page }) => {
      const rateCalculatorPage = new RateCalculatorPage(page)

      // goto rate calculator page
        await page.goto('/send/ratecalculator')
        await page.waitForLoadState("domcontentloaded")
        await expect(page).toHaveTitle('Parcel Shipment Rate Calculator | Pos Malaysia')

        await expect(rateCalculatorPage.appRateCalculator).toBeVisible()
        await expect(rateCalculatorPage.fromCountry).toBeVisible()
        await expect(rateCalculatorPage.toCountry).toBeVisible()
        await expect(rateCalculatorPage.weight).toBeVisible()

        // Check From Country is set to Malaysia
        await expect(rateCalculatorPage.fromCountry).toContainText('Malaysia')

        // Check To Country is set to Malaysia
        await expect(rateCalculatorPage.toCountrySelection).toHaveValue('Malaysia')

        // Enter Postcode 35600 State Perak
        await rateCalculatorPage.enterFromCountryPostCode('35600')
        await expect(rateCalculatorPage.fromCountryPostCodeInput).toHaveValue('35600')
        await expect(rateCalculatorPage.fromCountryStateInput).toHaveValue('Perak')

        // Set India as To country
        await rateCalculatorPage.setToCountrySelectionByTextInput('India')
        await expect(rateCalculatorPage.toCountrySelection).toHaveValue('India')

        // Enter weight 1000g
        await rateCalculatorPage.enterWeight(1)
        await expect(rateCalculatorPage.weightInput).toHaveValue('1')

        // Click Calculate Button
        await expect(rateCalculatorPage.calculateButton).toBeVisible()
        await expect(rateCalculatorPage.calculateButton).toBeEnabled()
        await rateCalculatorPage.calculateButton.click()

        // Check rate quote is displayed
        await expect(rateCalculatorPage.rateQuote).toContainText('Your Quote')
        await expect(rateCalculatorPage.rateQuote).toContainText('Select a quote to start booking your shipment')

        // Check rate quote has at least one item
        const totalItemsInQuote = await rateCalculatorPage.rateQuote.getByText('Service Type').all()
        expect(totalItemsInQuote.length, {message: 'Quote is empty'}).toBeGreaterThanOrEqual(1)
      })
})

