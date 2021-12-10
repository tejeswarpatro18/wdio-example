import Page from './page';



class homePage extends Page {

    get landingPageCheck () { return $('//h1[text()="Accounts Overview"]') };
    get openNewAccountLink() { return $('//a[text()="Open New Account"]')};
    get billPayLink() { return $('//a[text()="Bill Pay"]')};
    get accountsOverviewLink() { return $('//a[text()="Accounts Overview"]')};



    async verifyAccountDetails (id, type) {
        expect( await this.accountNumber).toHaveText(id);
        expect( await this.accountType).toHaveText(type);

    }


}

export default new homePage();