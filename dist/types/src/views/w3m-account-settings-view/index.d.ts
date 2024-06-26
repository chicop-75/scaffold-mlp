import { LitElement } from 'lit';
export declare class W3mAccountSettingsView extends LitElement {
    static styles: import("lit").CSSResult;
    private usubscribe;
    private readonly networkImages;
    private address;
    private profileImage;
    private profileName;
    private network;
    private preferredAccountType;
    private disconnecting;
    private loading;
    private switched;
    private text;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private chooseNameButtonTemplate;
    private isAllowedNetworkSwitch;
    private onCopyAddress;
    private togglePreferredAccountBtnTemplate;
    private onChooseName;
    private changePreferredAccountType;
    private onNetworks;
    private onDisconnect;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-account-settings-view': W3mAccountSettingsView;
    }
}
