import Page from './page';
import homePage from './homePage.page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class billPay extends Page {
    /**
     * define selectors using getter methods
     */
    get payForm () { return $('//table[@class="form2"]') }
    get name () { return $('//input[@name="payee.name"]') }
    get street () { return $('//input[@name="payee.address.street"]') }
    get city () { return $('//input[@name="payee.address.city"]') }
    get state () { return $('//input[@name="payee.address.state"]') }
    get zipCode () { return $('//input[@name="payee.address.zipCode"]') }
    get phoneNumber () { return $('//input[@name="payee.phoneNumber"]') }
    get accountNumber () { return $('//input[@name="payee.accountNumber"]') }
    get verifyAccount () { return $('//input[@name="verifyAccount"]') }
    get amount () { return $('//input[@name="amount"]') }
    get fromAccountId () { return $('//select[@name="fromAccountId"]') }
    get sendPaymentButton() { return $('//input[@type="submit"]') };
    get postPaymentTitle() { return $('//h1[@class="title" and text() = "Bill Payment Complete"]')}




    async billPayment(name, street, city, state, zipCode, phoneNumber, accountNumber, amount, fromAccountId) {
        await homePage.billPayLink.click()
        await expect(this.payForm).toBeExisting();
        await this.name.setValue(name);
        await this.street.setValue(street);
        await this.city.setValue(city);
        await this.state.setValue(state);
        await this.zipCode.setValue(zipCode);
        await this.phoneNumber.setValue(phoneNumber);
        await this.accountNumber.setValue(accountNumber);
        await this.verifyAccount.setValue(accountNumber);
        await this.amount.setValue(amount);
        await this.fromAccountId.selectByVisibleText(fromAccountId);
        await this.sendPaymentButton.click();
    }

    async verifySuccessfulTransaction(fromAccountId, amount) {
        await expect(this.postPaymentTitle).toBeDisplayed('Bill Payment Complete');
        await expect(browser).toHaveTitle('ParaBank | Bill Payment Complete')
        const myCheckPoint1 = $('//span[@id = "fromAccountId"]')
        await expect(myCheckPoint1).toHaveText(fromAccountId);
        const myCheckPoint2 = $('//span[@id = "amount"]')
        await expect(myCheckPoint2).toHaveTextContaining(amount)
    }
}

export default new billPay();
