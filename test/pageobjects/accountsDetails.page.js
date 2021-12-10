import Page from './page';



class accountsDetails extends Page {

    get accountNumber() { return $('#accountId')};
    get accountType() { return $('#accountType')};
    get balance() { return $('#balance')};




    async verifyAccountDetails (id, type) {
        expect( await this.accountNumber).toHaveText(id);
        expect( await this.accountType).toHaveText(type);

    }


}

export default new accountsDetails();