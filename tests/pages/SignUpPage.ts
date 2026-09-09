import { type Locator, type Page } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class SignUpPage {
    readonly page: Page;
    readonly signUpForm: Locator;
    readonly fullName: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signUpSubmitBtn: Locator;
    readonly emailError: Locator;
    readonly loginLink: Locator;
    readonly signUpHeadline: Locator;
    readonly confirmEmailHeadline: Locator;
    readonly fullNameError: Locator;
    readonly passwordError: Locator;
    readonly formError: Locator;
    readonly confirmationFailedError: Locator;
    readonly checkEmailEmail: Locator;
    readonly resendEmailBtn: Locator;
    readonly backToSignUpLink: Locator;


constructor(page: Page) {
    this.page = page;
    this.signUpForm = page.getByTestId('sign-up-form');
    this.fullName = page.getByTestId('full-name-input');
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.signUpSubmitBtn = page.getByTestId('sign-up-submit');
    this.emailError = page.getByTestId('email-error');
    this.loginLink = page.getByTestId('login-link');
    this.signUpHeadline = page.getByRole('heading', { name: 'Begin your', exact: false });
    this.confirmEmailHeadline = page.getByTestId('check-email-heading');
    this.fullNameError = page.getByTestId('full-name-error');
    this.passwordError = page.getByTestId('password-error');
    this.formError = page.getByTestId('form-error');
    this.confirmationFailedError = page.getByTestId('confirmation-failed-error');
    this.checkEmailEmail = page.getByTestId('check-email-email');
    this.resendEmailBtn = page.getByTestId('resend-email-btn');
    this.backToSignUpLink = page.getByTestId('back-to-signup-link');
}

async goto() {
    await this.page.goto('/sign-up')
}

async signUp(fullName: string, emailInput: string, passwordInput: string) {
    await this.fullName.fill(fullName);
    await this.emailInput.fill(emailInput);
    await this.passwordInput.fill(passwordInput);
    await this.signUpSubmitBtn.click()
}

async goToLogin(): Promise<LoginPage> {
  await this.loginLink.click();
  return new LoginPage(this.page);
}

}