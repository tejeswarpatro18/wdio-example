import Page from './page';
import homePage from './homePage.page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class openAccount extends Page {
    /**
     * define selectors using getter methods
     */
    // get landingPageCheck () { return $('//h1[text()="Accounts Overview"]') };
    // get openNewAccountLink() { return $('//a[text()="Open New Account"]')};
    // get billPayLink() { return $('//a[text()="Bill Pay"]')};
    get accountType() { return $('#type')};
    get fromAccountId() { return $('#fromAccountId')};
    get openNewAccountButton() { return $('//input[@type="submit"]') };
    get successMessageAfterAccountOpened () {return $('//p[text()="Congratulations, your account is now open."]')};
    get newAccountId () { return $('#newAccountId')};



    async openNewAccount(type, id) {
        await homePage.openNewAccountLink.click();
        await this.accountType.selectByVisibleText(type);
        expect( await this.accountType).toHaveText(type)
        await browser.pause(2000);
        await this.fromAccountId.selectByIndex(0);
        // expect( await this.fromAccountId).toHaveText(id);
        await this.openNewAccountButton.click();
    }
}

export default new openAccount();
