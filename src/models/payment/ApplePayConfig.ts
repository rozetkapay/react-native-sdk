export type ApplePayConfig = ApplePayConfig.Test | ApplePayConfig.Production;

export namespace ApplePayConfig {
    export interface Base {
        merchantIdentifier: string;
        merchantName: string;
        currencyCode?: string;
        countryCode?: string;
    }

    export interface Test extends Base {
        type: 'Test';
    }

    export interface Production extends Base {
        type: 'Production';
        supportedNetworks?: string[];
        merchantCapabilities?: string;
    }

    export function test(
        merchantIdentifier: string,
        merchantName: string = 'RozetkaPay Test Merchant',
        currencyCode: string = 'UAH',
        countryCode: string = 'UA'
    ): Test {
        return {
            type: 'Test',
            merchantIdentifier,
            merchantName,
            currencyCode,
            countryCode,
        };
    }

    export function production(
        merchantIdentifier: string,
        merchantName: string,
        supportedNetworks: string[] = ['visa', 'masterCard'],
        merchantCapabilities: string = 'capability3DS',
        currencyCode: string = 'UAH',
        countryCode: string = 'UA'
    ): Production {
        return {
            type: 'Production',
            merchantIdentifier,
            merchantName,
            supportedNetworks,
            merchantCapabilities,
            currencyCode,
            countryCode,
        };
    }
}