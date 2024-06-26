import { LitElement } from 'lit';
export declare class W3mSwapPreviewView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    private interval?;
    private detailsOpen;
    private approvalTransaction;
    private swapTransaction;
    private sourceToken;
    private sourceTokenAmount;
    private sourceTokenPriceInUSD;
    private toToken;
    private toTokenAmount;
    private toTokenPriceInUSD;
    private caipNetwork;
    private transactionLoading;
    private balanceSymbol;
    private gasPriceInUSD;
    private inputError;
    private loading;
    constructor();
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    private refreshTransaction;
    private templateSwap;
    private templateDetails;
    private actionButtonLabel;
    private onCancelTransaction;
    private onSendTransaction;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-swap-preview-view': W3mSwapPreviewView;
    }
}
