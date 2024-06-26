var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ConnectorController, CoreHelperUtil } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref.js';
import styles from './styles.js';
import { SnackController, RouterController, EventsController } from '@web3modal/core';
let W3mEmailLoginWidget = class W3mEmailLoginWidget extends LitElement {
    constructor() {
        super();
        this.unsubscribe = [];
        this.formRef = createRef();
        this.connectors = ConnectorController.state.connectors;
        this.email = '';
        this.loading = false;
        this.error = '';
        this.unsubscribe.push(ConnectorController.subscribeKey('connectors', val => (this.connectors = val)));
    }
    disconnectedCallback() {
        this.unsubscribe.forEach(unsubscribe => unsubscribe());
    }
    firstUpdated() {
        this.formRef.value?.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                this.onSubmitEmail(event);
            }
        });
    }
    render() {
        const connector = this.connectors.find(c => c.type === 'AUTH');
        const multipleConnectors = this.connectors.length > 1;
        if (!connector?.email) {
            return null;
        }
        return html `
      <form ${ref(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
        <wui-email-input
          @focus=${this.onFocusEvent.bind(this)}
          .disabled=${this.loading}
          @inputChange=${this.onEmailInputChange.bind(this)}
          .errorMessage=${this.error}
        >
        </wui-email-input>

        ${this.submitButtonTemplate()}${this.loadingTemplate()}
        <input type="submit" hidden />
      </form>

      ${connector.socials || !multipleConnectors
            ? null
            : html `<wui-flex .padding=${['xxs', '0', '0', '0']}>
            <wui-separator text="or"></wui-separator>
          </wui-flex>`}
    `;
    }
    submitButtonTemplate() {
        const showSubmit = !this.loading && this.email.length > 3;
        return showSubmit
            ? html `
          <wui-icon-link
            size="sm"
            icon="chevronRight"
            iconcolor="accent-100"
            @click=${this.onSubmitEmail.bind(this)}
          >
          </wui-icon-link>
        `
            : null;
    }
    loadingTemplate() {
        return this.loading
            ? html `<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`
            : null;
    }
    onEmailInputChange(event) {
        this.email = event.detail.trim();
        this.error = '';
    }
    async onSubmitEmail(event) {
        try {
            if (this.loading) {
                return;
            }
            this.loading = true;
            event.preventDefault();
            const authConnector = ConnectorController.getAuthConnector();
            if (!authConnector) {
                throw new Error('w3m-email-login-widget: Auth connector not found');
            }
            const { action } = await authConnector.provider.connectEmail({ email: this.email });
            EventsController.sendEvent({ type: 'track', event: 'EMAIL_SUBMITTED' });
            if (action === 'VERIFY_OTP') {
                EventsController.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_SENT' });
                RouterController.push('EmailVerifyOtp', { email: this.email });
            }
            else if (action === 'VERIFY_DEVICE') {
                RouterController.push('EmailVerifyDevice', { email: this.email });
            }
        }
        catch (error) {
            const parsedError = CoreHelperUtil.parseError(error);
            if (parsedError?.includes('Invalid email')) {
                this.error = 'Invalid email. Try again.';
            }
            else {
                SnackController.showError(error);
            }
        }
        finally {
            this.loading = false;
        }
    }
    onFocusEvent() {
        EventsController.sendEvent({ type: 'track', event: 'EMAIL_LOGIN_SELECTED' });
    }
};
W3mEmailLoginWidget.styles = styles;
__decorate([
    state()
], W3mEmailLoginWidget.prototype, "connectors", void 0);
__decorate([
    state()
], W3mEmailLoginWidget.prototype, "email", void 0);
__decorate([
    state()
], W3mEmailLoginWidget.prototype, "loading", void 0);
__decorate([
    state()
], W3mEmailLoginWidget.prototype, "error", void 0);
W3mEmailLoginWidget = __decorate([
    customElement('w3m-email-login-widget')
], W3mEmailLoginWidget);
export { W3mEmailLoginWidget };
//# sourceMappingURL=index.js.map