import AccountRepository from '../Database-interaction/TheatreDatabase.js';
import * as Exceptions from '../Exceptions/Exceptions';
export default class SlotService {
    constructor() {
        this.repository = new AccountRepository();
    }

    //adding theatre
    async addTheatre(args) {
        try {
            let accountInfo = await this.repository.addTheatre(args);
            return accountInfo
        } catch (error) {
            throw error;
        }
    }

     //adding slot
    async addSlot(args) {
        try {
            let accountInfo = await this.repository.addSlot(args);
            return accountInfo
        } catch (error) {
            throw error;
        }
    }
}