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
    //booking slots
    async bookSlots(args) {
        try {
            let accountInfo = await this.repository.bookSlots(args);
            return accountInfo
        } catch (error) {
            throw error;
        }
    }
}