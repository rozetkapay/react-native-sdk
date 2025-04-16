export type GooglePayConfig = GooglePayConfig.Test | GooglePayConfig.Production;

export namespace GooglePayConfig {
    export interface Base {
        gateway?: string | null;
        merchantId: string;
        merchantName: string;
    }

    export interface Test extends Base {
        type: 'Test';
    }

    export interface Production extends Base {
        type: 'Production';
    }

    export function test(
        merchantId: string,
        merchantName: string = 'RozetkaPay Test Merchant',
        gateway: string | null = null
    ): Test {
        return {
            type: 'Test',
            merchantId: merchantId,
            merchantName: merchantName,
            gateway: gateway,
        };
    }

    export function production(
        merchantId: string,
        merchantName: string,
    ): Production {
        return {
            type: 'Production',
            merchantId: merchantId,
            merchantName: merchantName,
            gateway: null
        };
    }
}