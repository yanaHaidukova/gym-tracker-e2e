import { type Locator, type Page } from '@playwright/test';
import { ForgotPasswordPage } from './ForgotPasswordPage';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitBtn: Locator;
  readonly loginForm: Locator;
  readonly formError: Locator;
  readonly forgotPassLink: Locator;
  

constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitBtn = page.getByTestId('login-submit');
    this.loginForm = page.getByTestId('login-form');
    this.formError = page.getByTestId('form-error');
    this.forgotPassLink = page.getByTestId('forgot-password-link');
}

async goto() {
    await this.page.goto('/login')
}

async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitBtn.click();
}

async goToForgotPass(): Promise<ForgotPasswordPage> {
    await this.forgotPassLink.click();
    return new ForgotPasswordPage(this.page);
}

}