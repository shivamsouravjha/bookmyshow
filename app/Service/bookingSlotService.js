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
    async showAvailableTickets(args) {
        try {
            let accountInfo = await this.repository.showAvailableTickets(args);
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

    //cancelling slots
    async cancelTickets(args) {
        try {
            let ticket = await this.repository.findTicket(args);
            if(!ticket.active){
                throw new Error("Already cancelled ticket")
            }
            let slot = await this.repository.findSlotForMovie(ticket);
            const slotNumber = slot.slots.indexOf(ticket.slot)
            let occupiedSlot = [];
            for (let i = 0; i < slot.occupiedSeats[slotNumber].length; i++) {
                if (!ticket.seatNumber.includes(slot.occupiedSeats[slotNumber][i])) {
                    occupiedSlot.push(slot.occupiedSeats[slotNumber][i])
                }
            }
            slot.occupiedSeats[slotNumber] = occupiedSlot;
            ticket.active = false;
            let accountInfo = await this.repository.cancelTickets({slot,ticket});
            return accountInfo
        } catch (error) {
            throw error;
        }
    }

    //showing tickets
    async showTicket(args) {
        try {
            let accountInfo = await this.repository.showTicket(args);
            return accountInfo
        } catch (error) {
            throw error;
        }
    }
}