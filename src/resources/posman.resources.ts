

export class PosmanResources {
    // PageRateCalculator Locators
    public static readonly APP_RATE_CALCULATOR = 'app-rate-calculator-v2' as const;
    public static readonly CLASS_CALCULATOR_COLUMN = '.calculator-col' as const;
    public static readonly CLASS_COUNTRY_LIST_ITEM = '.country-list-item' as const;
    public static readonly APP_RATE_CALCULATOR_QUOTE = '.bg-white' as const;

    // API Endpoints
    public static readonly API_GET_STATE_BY_POSTCODE = 'https://www-api.pos.com.my/api/getStateByPostcode' as const;
}
