import Page from './page';
import homePage from './homePage.page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class accountsOverview extends Page {
    
    
    async getBalanceAmt (accountId) {
        const balAmount = '//a[@href="activity.htm?id='+accountId+'"]/parent::td/following-sibling::td[1]'
        return $(balAmount).getText();
    }


    async validateAccountDetails( id, balance) {
        await homePage.accountsOverviewLink.click()
        await expect(browser).toHaveTitle('ParaBank | Accounts Overview');
        const accountBalance  = '//a[@href="activity.htm?id='+id+'"]/parent::td/following-sibling::td[1]';
        await browser.pause(2000)
        await expect($(accountBalance)).toHaveTextContaining(balance);

    }
}

export default new accountsOverview();
