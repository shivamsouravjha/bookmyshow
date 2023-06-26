import AccountRepository from '../Database-interaction/slotServiceRepo';
import * as Exceptions from '../Exceptions/Exceptions';
export default class BookingService {
    constructor() {
        this.repository = new AccountRepository();
    }

    //showing slots
    async showSlot(args) {
        try {
            let accountInfo = await this.repository.findSlot(args);
            return accountInfo
        } catch (error) {
            throw error;
        }
    }
    //showing tickets
    async showTickets(args) {
        try {
            let accountInfo = await this.repository.showTickets(args);
            return accountInfo
        } catch (error) {
            throw error;
        }
    }

    //booking slots
    async bookTickets(args) {
        try {
            let accountInfo = await this.repository.bookTickets(args);
            return accountInfo
        } catch (error) {
            throw error;
        }
    }
}