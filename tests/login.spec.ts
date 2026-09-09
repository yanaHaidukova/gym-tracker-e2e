import { test, expect } from './fixtures';
import { createUser } from './helpers/factories';


test.describe('Login page', () => {
    const existingUser = createUser({email: 'annasmithemail25@gmail.com', password: 'track_Your*prog25&&&'});
    const newUser = createUser()

    test('user is successfully logged in @smoke', async({ loginPage, page }) => {
        await loginPage.login(existingUser.email, existingUser.password)
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
