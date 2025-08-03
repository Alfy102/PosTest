import { Page, expect } from "playwright/test"
import { PosmanResources } from "../resources/posman.resources"


export class RateCalculatorPage {
    page: Page
    constructor(page: Page) {
        this.page = page
    }
    
    get appRateCalculator() {
        return this.page.locator(PosmanResources.APP_RATE_CALCULATOR)
    }

    get fromCountry() {
        return this.appRateCalculator.locator(PosmanResources.CLASS_CALCULATOR_COLUMN, {hasText: 'From'})
    }
    
    get toCountry() {
        return this.appRateCalculator.locator(PosmanResources.CLASS_CALCULATOR_COLUMN, {hasText: 'To'})
    }

    get toCountrySelection() {
        return this.toCountry.getByRole('combobox', { name: 'country' })
    }
    
    get weight() {
        return this.appRateCalculator.locator(PosmanResources.CLASS_CALCULATOR_COLUMN, {hasText: 'Weight'})
    }

    get fromCountryPostCodeInput() {
        return this.fromCountry.locator('input[type="number"]')
    }

    get fromCountryStateInput() {
        return this.fromCountry.locator('input[type="text"]')
    }

    get toCountryPostCodeInput() {
        return this.toCountry.locator('input[type="number"]')
    }

    get weightInput() {
        return this.weight.locator('input[type="number"]')
    }

    get calculateButton() {
        return this.appRateCalculator.getByText('Calculate')
    }

    get rateQuote(){
        return this.appRateCalculator.locator(PosmanResources.APP_RATE_CALCULATOR_QUOTE)
    }

    /**
     * Intercept API request to wait and get response
     * @param url string
     * @param timeout number
     * @param statusCode number
     */
    async interceptRequest(url: string, timeout: number, statusCode: number) {
        const response = await this.page.waitForResponse(response => response.url().includes(url), { timeout });
        expect(response.status()).toBe(statusCode);
        return await response.json();
    }

    /**
     * Enter from country post code and wait for API request to complete
     * @param postCode string
     */
    async enterFromCountryPostCode(postCode: string) {
        await this.fromCountryPostCodeInput.fill(postCode)
        const intercept = this.interceptRequest(PosmanResources.API_GET_STATE_BY_POSTCODE, 10000, 200)
        await this.fromCountryPostCodeInput.press('Enter')
        await intercept
        }


    /**
     * Check if the country exists in the list of countries
     * @param country 
     */
    async toCountryExistsInList(country: string) {
        const options = this.page.getByRole('listbox')
        const listBoxSnapshot = await options.ariaSnapshot()
        expect(listBoxSnapshot, { message: `Country ${country} not found in list of countries` }).toContain(country)
    }

    /**
     * Set the country selection by list box
     * @param country string
     */
    async setToCountrySelectionByListBox(country: string) {
        await this.toCountrySelection.click()
        await this.toCountryExistsInList(country)
        await this.page.getByRole('option', { name: country }).click()
        
    }

    /**
     * Set the country selection by text input
     * @param country string
     */
    async setToCountrySelectionByTextInput(country: string) {
        await this.toCountrySelection.fill(country)
        await expect(async () => {
            await this.toCountryExistsInList(country)
        }).toPass({
            timeout: 1000,
            intervals: [100, 200, 300, 400, 500]
        })
        await this.page.getByRole('option', { name: country }).click()
    }

    /**
     * Enter weight to be calculated
     * @param weight number
     */
    async enterWeight(weight: number) {
        await this.weightInput.fill(weight.toString())
    }
}

