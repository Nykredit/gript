module Portfolio {
    export interface IPortfolioService {
        getPortfolio(): Array<any>;
    }

    export class PortfolioService implements IPortfolioService {
        'use strict';
        private data:Array<any>;

        constructor() {
            this.data = [
                {name: 'Daily', balance: 2034.75, type: 'da', remark: 'A daily Account'},
                {name: 'Budget', balance: 9876.65, type: 'ba', remark: 'The Budgets Account'},
                {name: 'Kids', balance: 200348.76, type: 'kids', remark: 'Closed saving Account for kids'},
                {name: 'Custody', balance: 4504587.52, type: 'ca', remark: 'Investment Account'},
                {name: 'Mortgage', balance: -559876.65, type: 'la', remark: 'Mortgage for Vallet Rd. 1034'},
                {name: 'Car', balance: -20348.76, type: 'car', remark: 'Loan for Fiat'},
                {name: 'Bike', balance: -98.56, type: 'bike', remark: 'Financing of Norton 850'},
                {name: 'Savings', balance: 220454.54, type: 'sa', remark: 'Family Savings'}
            ];
        }
        getPortfolio():Array<any> {
            return this.data;
        }
    }

    angular.module('portfolio').factory('portfolioService', [():PortfolioService => {
        return new PortfolioService();
    }]);
}
