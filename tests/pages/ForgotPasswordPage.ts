import { type Locator, type Page } from '@playwright/test';

export class ForgotPasswordPage {
  readonly page: Page;
  readonly forgotPassForm: Locator;
  readonly forgotPassEmail: Locator;
  readonly forgotPassSubmitBtn: Locator;
  readonly forgotPassError: Locator;
  readonly forgotPassSuccessMessage: Locator;
  readonly forgotPassBackLoginLink: Locator;
  readonly forgotPassSentEmail: Locator;

  
constructor(page: Page) {
    this.page = page;
    this.forgotPassForm = page.getByTestId('forgot-password-form');
    this.forgotPassEmail = page.getByTestId('forgot-password-email');
    this.forgotPassSubmitBtn = page.getByTestId('forgot-password-submit');
    this.forgotPassError = page.getByTestId('forgot-password-email-error');
    this.forgotPassSuccessMessage = page.getByTestId('forgot-password-success');
    this.forgotPassSentEmail = page.getByTestId('forgot-password-sent-email');
    this.forgotPassBackLoginLink = page.getByTestId('forgot-password-back-to-login')
}

async goto() {
    await this.page.goto('/forgot-password')
}

async forgotPasswordRequest(email: string) {
    await this.forgotPassEmail.fill(email);
    await this.forgotPassSubmitBtn.click();
}

}