import { LitElement } from 'lit';
export declare class W3mConnectExternalWidget extends LitElement {
    private unsubscribe;
    private connectors;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1> | null;
    private onConnector;
}
