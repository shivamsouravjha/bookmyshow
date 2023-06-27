import AccountRepository from '../Database-interaction/TheatreDatabase.js';
import * as Exceptions from '../Exceptions/Exceptions';
export default class SlotService {
    constructor() {
        this.repository = new AccountRepository();
    }

    //adding theatre
    async addTheatre(args) {
        try {
            let theatreInfo = await this.repository.addTheatre(args);
            return theatreInfo
        } catch (error) {
            throw error;
        }
    }

    //showing theatre
    async showTheatre() {
        try {
            let theatreInfo = await this.repository.showTheatre();
            let eligibleTheatres = []
            for (let i = 0; i < theatreInfo.length; i++) {
                eligibleTheatres.push({ theatreId: theatreInfo[i]._id, name: theatreInfo[i].name })
            }
            if (eligibleTheatres.length == 0) {
                throw new Error("No theatres found")
            }
            return { "success": true, "theatres": eligibleTheatres };
        } catch (error) {
            throw error;
        }
    }

    //adding slot
    async addSlot(args) {
        try {
            let slotInfo = await this.repository.addSlot(args);
            return slotInfo
        } catch (error) {
            throw error;
        }
    }
}