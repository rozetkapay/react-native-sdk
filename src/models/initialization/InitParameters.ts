export type InitParams = {
    mode: RozetkaPaySdkMode;
    enableLogging: boolean;
};

export enum RozetkaPaySdkMode {
    Production = 'Production',
    Development = 'Development',
}
