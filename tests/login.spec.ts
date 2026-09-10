import { test, expect } from './fixtures';
import { createUser } from './helpers/factories';


test.describe('Login page', () => {
    const newUser = createUser()

    test.only('user is successfully logged in @smoke', async({ loginPage, signUpPage, page }) => {
        await signUpPage.signUp(newUser.fullName, newUser.email, newUser.password)
        await expect(page).toHaveURL(/check-email/);
        await page.context().clearCookies();
        await loginPage.goto()
        await loginPage.login(newUser.email, newUser.password)
        await expect(page).toHaveURL(/exercises/)
    })

    test('non-existing user cannot login', async ({ loginPage }) => {
        await loginPage.login(newUser.email, newUser.password)
        await expect(loginPage.formError).toHaveText('Incorrect email or password. Please try again.')
    })

    test('navigates to forgot password', async ({ loginPage, page }) => {
        await loginPage.goToForgotPass();
        await expect(page).toHaveURL(/forgot-password/)
    })
});
