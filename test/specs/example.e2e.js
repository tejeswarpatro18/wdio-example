import LoginPage from '../pageobjects/login.page';
import openAccount from '../pageobjects/openAccount.page';
import accountsDetails from '../pageobjects/accountsDetails.page';
import homePage from '../pageobjects/homePage.page';
import billPay from '../pageobjects/billPay.page';
import accountsOverviewPage from '../pageobjects/accountsOverview.page';

var checkingAccountId, savingsAccountId, checkingAccountBalance, savingsAccoutBalance;
const billPayAmount = 200;

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('john', 'demo');
        await expect(homePage.landingPageCheck).toBeExisting();
    });

    it('should open Checking account', async () => {

        await openAccount.openNewAccount("CHECKING", "12345");
        await expect(openAccount.successMessageAfterAccountOpened).toBeExisting();
        checkingAccountId = await openAccount.newAccountId.getText();

    });

    it('should Verify the new account', async () => {

        await openAccount.newAccountId.click();
        await expect(browser).toHaveUrl('https://parabank.parasoft.com/parabank/activity.htm?id=' + checkingAccountId);
        await accountsDetails.verifyAccountDetails("CHECKING", checkingAccountId);
        checkingAccountBalance = await accountsDetails.balance.getText()
    });

    it('should open SAVINGS account', async () => {

        await openAccount.openNewAccount("SAVINGS", "12345");
        await expect(openAccount.successMessageAfterAccountOpened).toBeExisting();
        savingsAccountId = await openAccount.newAccountId.getText();

    });

    it('should Verify the new account', async () => {

        await openAccount.newAccountId.click();
        await expect(browser).toHaveUrl('https://parabank.parasoft.com/parabank/activity.htm?id=' + savingsAccountId);
        await accountsDetails.verifyAccountDetails("SAVINGS", savingsAccountId);
        savingsAccoutBalance = await accountsDetails.balance.getText()

    });

    it('should Pay the bill', async () => {
      await billPay.billPayment("Bill", "Northern gate", "Berhampur", "Odisha", "344545", "1655652322", checkingAccountId, billPayAmount, savingsAccountId );
      await billPay.verifySuccessfulTransaction(savingsAccountId, "200");
    });

    it('Verify accounts', async () => {
        await accountsOverviewPage.validateAccountDetails(savingsAccountId, "-$100.00")
        await accountsOverviewPage.validateAccountDetails(checkingAccountId, "$300.00")
    });
});


