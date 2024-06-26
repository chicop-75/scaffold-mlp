import { AccountController, BlockchainApiController, ConnectionController, ConnectorController, CoreHelperUtil, EventsController, ModalController, NetworkController, OptionsController, PublicStateController, ThemeController, SnackController, RouterController, EnsController } from '@web3modal/core';
import { setColorTheme, setThemeVariables } from '@web3modal/ui';
import { ConstantsUtil } from '@web3modal/common';
let isInitialized = false;
export class Web3ModalScaffold {
    constructor(options) {
        this.initPromise = undefined;
        this.setIsConnected = isConnected => {
            AccountController.setIsConnected(isConnected);
        };
        this.getIsConnectedState = () => AccountController.state.isConnected;
        this.setCaipAddress = caipAddress => {
            AccountController.setCaipAddress(caipAddress);
        };
        this.setBalance = (balance, balanceSymbol) => {
            AccountController.setBalance(balance, balanceSymbol);
        };
        this.setProfileName = profileName => {
            AccountController.setProfileName(profileName);
        };
        this.setProfileImage = profileImage => {
            AccountController.setProfileImage(profileImage);
        };
        this.resetAccount = () => {
            AccountController.resetAccount();
        };
        this.setCaipNetwork = caipNetwork => {
            NetworkController.setCaipNetwork(caipNetwork);
        };
        this.getCaipNetwork = () => NetworkController.state.caipNetwork;
        this.setRequestedCaipNetworks = requestedCaipNetworks => {
            NetworkController.setRequestedCaipNetworks(requestedCaipNetworks);
        };
        this.getApprovedCaipNetworksData = () => NetworkController.getApprovedCaipNetworksData();
        this.resetNetwork = () => {
            NetworkController.resetNetwork();
        };
        this.setConnectors = connectors => {
            ConnectorController.setConnectors(connectors);
        };
        this.addConnector = connector => {
            ConnectorController.addConnector(connector);
        };
        this.getConnectors = () => ConnectorController.getConnectors();
        this.resetWcConnection = () => {
            ConnectionController.resetWcConnection();
        };
        this.fetchIdentity = request => BlockchainApiController.fetchIdentity(request);
        this.setAddressExplorerUrl = addressExplorerUrl => {
            AccountController.setAddressExplorerUrl(addressExplorerUrl);
        };
        this.setSmartAccountDeployed = isDeployed => {
            AccountController.setSmartAccountDeployed(isDeployed);
        };
        this.setConnectedWalletInfo = connectedWalletInfo => {
            AccountController.setConnectedWalletInfo(connectedWalletInfo);
        };
        this.setSmartAccountEnabledNetworks = smartAccountEnabledNetworks => {
            NetworkController.setSmartAccountEnabledNetworks(smartAccountEnabledNetworks);
        };
        this.setPreferredAccountType = preferredAccountType => {
            AccountController.setPreferredAccountType(preferredAccountType);
        };
        this.getWalletConnectName = address => {
            return EnsController.getNamesForAddress(address);
        };
        this.resolveWalletConnectName = async (name) => {
            const trimmedName = name.replace(ConstantsUtil.WC_NAME_SUFFIX, '');
            const wcNameAddress = await EnsController.resolveName(trimmedName);
            const networkNameAddresses = Object.values(wcNameAddress?.addresses) || [];
            return networkNameAddresses[0]?.address || false;
        };
        this.initControllers(options);
        this.initOrContinue();
    }
    async open(options) {
        await this.initOrContinue();
        ModalController.open(options);
    }
    async close() {
        await this.initOrContinue();
        ModalController.close();
    }
    setLoading(loading) {
        ModalController.setLoading(loading);
    }
    getThemeMode() {
        return ThemeController.state.themeMode;
    }
    getThemeVariables() {
        return ThemeController.state.themeVariables;
    }
    setThemeMode(themeMode) {
        ThemeController.setThemeMode(themeMode);
        setColorTheme(ThemeController.state.themeMode);
    }
    setThemeVariables(themeVariables) {
        ThemeController.setThemeVariables(themeVariables);
        setThemeVariables(ThemeController.state.themeVariables);
    }
    subscribeTheme(callback) {
        return ThemeController.subscribe(callback);
    }
    getWalletInfo() {
        return AccountController.state.connectedWalletInfo;
    }
    subscribeWalletInfo(callback) {
        return AccountController.subscribeKey('connectedWalletInfo', callback);
    }
    getState() {
        return PublicStateController.state;
    }
    subscribeState(callback) {
        return PublicStateController.subscribe(callback);
    }
    showErrorMessage(message) {
        SnackController.showError(message);
    }
    showSuccessMessage(message) {
        SnackController.showSuccess(message);
    }
    getEvent() {
        return { ...EventsController.state };
    }
    subscribeEvents(callback) {
        return EventsController.subscribe(callback);
    }
    replace(route) {
        RouterController.replace(route);
    }
    redirect(route) {
        RouterController.push(route);
    }
    popTransactionStack(cancel) {
        RouterController.popTransactionStack(cancel);
    }
    isOpen() {
        return ModalController.state.open;
    }
    isTransactionStackEmpty() {
        return RouterController.state.transactionStack.length === 0;
    }
    isTransactionShouldReplaceView() {
        return RouterController.state.transactionStack[RouterController.state.transactionStack.length - 1]?.replace;
    }
    async initControllers(options) {
        NetworkController.setClient(options.networkControllerClient);
        NetworkController.setDefaultCaipNetwork(options.defaultChain);
        OptionsController.setProjectId(options.projectId);
        OptionsController.setAllWallets(options.allWallets);
        OptionsController.setIncludeWalletIds(options.includeWalletIds);
        OptionsController.setExcludeWalletIds(options.excludeWalletIds);
        OptionsController.setFeaturedWalletIds(options.featuredWalletIds);
        OptionsController.setTokens(options.tokens);
        OptionsController.setTermsConditionsUrl(options.termsConditionsUrl);
        OptionsController.setPrivacyPolicyUrl(options.privacyPolicyUrl);
        OptionsController.setCustomWallets(options.customWallets);
        OptionsController.setEnableAnalytics(options.enableAnalytics);
        OptionsController.setSdkVersion(options._sdkVersion);
        if (options.metadata) {
            OptionsController.setMetadata(options.metadata);
        }
        if (options.themeMode) {
            ThemeController.setThemeMode(options.themeMode);
        }
        if (options.themeVariables) {
            ThemeController.setThemeVariables(options.themeVariables);
        }
        if (options.enableOnramp) {
            OptionsController.setOnrampEnabled(Boolean(options.enableOnramp));
        }
        if (options.enableWalletFeatures) {
            OptionsController.setWalletFeaturesEnabled(Boolean(options.enableWalletFeatures));
        }
        if (options.allowUnsupportedChain) {
            NetworkController.setAllowUnsupportedChain(options.allowUnsupportedChain);
        }
        if (options.siweControllerClient) {
            const { SIWEController } = await import('@web3modal/siwe');
            SIWEController.setSIWEClient(options.siweControllerClient);
        }
        ConnectionController.setClient(options.connectionControllerClient);
    }
    async initOrContinue() {
        if (!this.initPromise && !isInitialized && CoreHelperUtil.isClient()) {
            isInitialized = true;
            this.initPromise = new Promise(async (resolve) => {
                await Promise.all([import('@web3modal/ui'), import('./modal/w3m-modal/index.js')]);
                const modal = document.createElement('w3m-modal');
                document.body.insertAdjacentElement('beforeend', modal);
                resolve();
            });
        }
        return this.initPromise;
    }
}
//# sourceMappingURL=client.js.map