import AccountRepository from '../Database-interaction/theatreServiceRepo.js';
import SlotSchema from "../Model/slot"
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
            const { name, theatres, slots } = args
            let showDetails = await this.repository.createShow({ name, theatres })
            let shows = []
            for (let i = 0; i < theatres.length; i++) {
                const occupiedSeats = Array.from({ length: slots.length }, () => []);
                let theatre = await this.repository.findTheatre({ theatreId: theatres[i] })
                const slot = new SlotSchema({
                    theatre: theatres[i],
                    movie: showDetails._id,
                    slots,
                    occupiedSeats,
                    numberOfSeats: theatre.numberOfSeats,
                })
                shows.push(slot);
            }
            let slotInfo = await this.repository.addSlot({shows});
            return slotInfo
        } catch (error) {
            throw error;
        }
    }
}