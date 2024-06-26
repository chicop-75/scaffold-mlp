import type { ConnectionControllerClient, EventsControllerState, NetworkControllerClient, NetworkControllerState, OptionsControllerState, PublicStateControllerState, ThemeControllerState, ThemeMode, ThemeVariables, ModalControllerState, ConnectedWalletInfo, RouterControllerState } from '@web3modal/core';
import { AccountController, BlockchainApiController, ConnectionController, ConnectorController, NetworkController, EnsController } from '@web3modal/core';
import type { SIWEControllerClient } from '@web3modal/siwe';
export interface LibraryOptions {
    projectId: OptionsControllerState['projectId'];
    themeMode?: ThemeMode;
    themeVariables?: ThemeVariables;
    allWallets?: OptionsControllerState['allWallets'];
    includeWalletIds?: OptionsControllerState['includeWalletIds'];
    excludeWalletIds?: OptionsControllerState['excludeWalletIds'];
    featuredWalletIds?: OptionsControllerState['featuredWalletIds'];
    defaultChain?: NetworkControllerState['caipNetwork'];
    tokens?: OptionsControllerState['tokens'];
    termsConditionsUrl?: OptionsControllerState['termsConditionsUrl'];
    privacyPolicyUrl?: OptionsControllerState['privacyPolicyUrl'];
    customWallets?: OptionsControllerState['customWallets'];
    enableAnalytics?: OptionsControllerState['enableAnalytics'];
    metadata?: OptionsControllerState['metadata'];
    enableOnramp?: OptionsControllerState['enableOnramp'];
    enableWalletFeatures?: OptionsControllerState['enableWalletFeatures'];
    allowUnsupportedChain?: NetworkControllerState['allowUnsupportedChain'];
    _sdkVersion: OptionsControllerState['sdkVersion'];
}
export interface ScaffoldOptions extends LibraryOptions {
    networkControllerClient: NetworkControllerClient;
    connectionControllerClient: ConnectionControllerClient;
    siweControllerClient?: SIWEControllerClient;
}
export interface OpenOptions {
    view: 'Account' | 'Connect' | 'Networks' | 'ApproveTransaction' | 'OnRampProviders';
}
export declare class Web3ModalScaffold {
    private initPromise?;
    constructor(options: ScaffoldOptions);
    open(options?: OpenOptions): Promise<void>;
    close(): Promise<void>;
    setLoading(loading: ModalControllerState['loading']): void;
    getThemeMode(): ThemeMode;
    getThemeVariables(): ThemeVariables;
    setThemeMode(themeMode: ThemeControllerState['themeMode']): void;
    setThemeVariables(themeVariables: ThemeControllerState['themeVariables']): void;
    subscribeTheme(callback: (newState: ThemeControllerState) => void): () => void;
    getWalletInfo(): ConnectedWalletInfo;
    subscribeWalletInfo(callback: (newState: ConnectedWalletInfo) => void): () => void;
    getState(): PublicStateControllerState;
    subscribeState(callback: (newState: PublicStateControllerState) => void): () => void;
    showErrorMessage(message: string): void;
    showSuccessMessage(message: string): void;
    getEvent(): {
        timestamp: number;
        data: import("@web3modal/core").Event;
    };
    subscribeEvents(callback: (newEvent: EventsControllerState) => void): () => void;
    protected replace(route: RouterControllerState['view']): void;
    protected redirect(route: RouterControllerState['view']): void;
    protected popTransactionStack(cancel?: boolean): void;
    protected isOpen(): boolean;
    protected isTransactionStackEmpty(): boolean;
    protected isTransactionShouldReplaceView(): boolean | undefined;
    protected setIsConnected: (typeof AccountController)['setIsConnected'];
    protected getIsConnectedState: () => boolean;
    protected setCaipAddress: (typeof AccountController)['setCaipAddress'];
    protected setBalance: (typeof AccountController)['setBalance'];
    protected setProfileName: (typeof AccountController)['setProfileName'];
    protected setProfileImage: (typeof AccountController)['setProfileImage'];
    protected resetAccount: (typeof AccountController)['resetAccount'];
    protected setCaipNetwork: (typeof NetworkController)['setCaipNetwork'];
    protected getCaipNetwork: () => import("@web3modal/core").CaipNetwork | undefined;
    protected setRequestedCaipNetworks: (typeof NetworkController)['setRequestedCaipNetworks'];
    protected getApprovedCaipNetworksData: (typeof NetworkController)['getApprovedCaipNetworksData'];
    protected resetNetwork: (typeof NetworkController)['resetNetwork'];
    protected setConnectors: (typeof ConnectorController)['setConnectors'];
    protected addConnector: (typeof ConnectorController)['addConnector'];
    protected getConnectors: (typeof ConnectorController)['getConnectors'];
    protected resetWcConnection: (typeof ConnectionController)['resetWcConnection'];
    protected fetchIdentity: (typeof BlockchainApiController)['fetchIdentity'];
    protected setAddressExplorerUrl: (typeof AccountController)['setAddressExplorerUrl'];
    protected setSmartAccountDeployed: (typeof AccountController)['setSmartAccountDeployed'];
    protected setConnectedWalletInfo: (typeof AccountController)['setConnectedWalletInfo'];
    protected setSmartAccountEnabledNetworks: (typeof NetworkController)['setSmartAccountEnabledNetworks'];
    protected setPreferredAccountType: (typeof AccountController)['setPreferredAccountType'];
    protected getWalletConnectName: (typeof EnsController)['getNamesForAddress'];
    protected resolveWalletConnectName: (name: string) => Promise<string | false>;
    private initControllers;
    private initOrContinue;
}
