import { test as base, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';


type Fixtures = {
  loginPage: LoginPage;
  signUpPage: SignUpPage;
};


export const test = base.extend<Fixtures>({

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.loginForm).toBeVisible()
    await use(loginPage);
  },

  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.goto(); 
    await expect(page.getByRole('heading', {name: 'Begin your', exact: false})).toBeVisible();
    await use(signUpPage);
  }

});


export { expect } from '@playwright/test';
