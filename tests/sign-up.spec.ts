import { test, expect } from './fixtures';
import { createUser } from './helpers/factories';

test.describe('As a new user, I want to sign up with email and verify it so that my account is secure.', () => {

  test('redirects to /check-email after successful sign-up @smoke @US-002', async ({ signUpPage, page }) => {
    const newUser = createUser();
    await signUpPage.signUp(newUser.fullName, newUser.email, newUser.password);
    await expect(page).toHaveURL(/check-email/);
    await expect(signUpPage.confirmEmailHeadline).toBeVisible();
  });

  test('renders all key page elements @US-002', async ({ signUpPage }) => {
    await expect(signUpPage.signUpHeadline).toBeVisible();
    await expect(signUpPage.signUpForm).toBeVisible();
    await expect(signUpPage.signUpSubmitBtn).toBeVisible();
  });

  test('navigates to login page from the sign-up link @US-002', async ({ signUpPage, page }) => {
    await signUpPage.goToLogin();
    await expect(page).toHaveURL(/login/);
  });

  test.describe('edge cases', () => {

    test('shows error when signing up with an existing email @US-002', async ({ signUpPage, page }) => {
      const existingUser = createUser();
      await signUpPage.signUp(existingUser.fullName, existingUser.email, existingUser.password);
      await expect(page).toHaveURL(/check-email/);
      await page.context().clearCookies();
      await signUpPage.goto();
      await signUpPage.signUp(existingUser.fullName, existingUser.email, existingUser.password);
      await expect(signUpPage.emailError).toHaveText(
        'An account with this email already exists. Please log in instead.'
      );
    });

    test('shows required-field errors when form is submitted empty @US-002', async ({ signUpPage }) => {
      await signUpPage.signUpSubmitBtn.click();
      await expect(signUpPage.fullNameError).toBeVisible();
      await expect(signUpPage.emailError).toBeVisible();
      await expect(signUpPage.passwordError).toBeVisible();
    });

    test('shows validation error for an invalid email format @US-002', async ({ signUpPage }) => {
      const user = createUser();
      await signUpPage.signUp(user.fullName, 'not-an-email', user.password);
      await expect(signUpPage.emailError).toContainText('valid email');
    });

    test('shows validation error for a password with no number @US-002', async ({ signUpPage }) => {
      const user = createUser();
      await signUpPage.signUp(user.fullName, user.email, 'PasswordOnly');
      await expect(signUpPage.passwordError).toContainText('number');
    });

    test('shows validation error for a password shorter than 8 characters @US-002', async ({ signUpPage }) => {
      const user = createUser();
      await signUpPage.signUp(user.fullName, user.email, 'Ab1');
      await expect(signUpPage.passwordError).toContainText('8 characters');
    });

    test('shows confirmation-failed banner when redirected back after an expired link @US-002', async ({ page }) => {
      await page.goto('/sign-up?error=confirmation_failed');
      await expect(page.getByTestId('confirmation-failed-error')).toBeVisible();
      await expect(page.getByTestId('confirmation-failed-error')).toContainText('expired');
    });

    test.describe('check-email page', () => {
      let newUser: ReturnType<typeof createUser>;

      test.beforeEach(async ({ signUpPage, page }) => {
        newUser = createUser();
        await signUpPage.signUp(newUser.fullName, newUser.email, newUser.password);
        await expect(page).toHaveURL(/check-email/);
      });

      test('displays the submitted email address @US-002', async ({ signUpPage }) => {
        await expect(signUpPage.checkEmailEmail).toHaveText(newUser.email);
      });

      test('shows a resend confirmation email button @US-002', async ({ signUpPage }) => {
        await expect(signUpPage.resendEmailBtn).toBeVisible();
      });
});
});
});
