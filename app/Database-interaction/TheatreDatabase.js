import TheatreSchema from "../Model/theatre";
import SlotSchema from "../Model/slot"
import ShowSchema from "../Model/shows"
export default class AccountRepository {

    async addTheatre(obj) {
        const { name, numberOfSeats, numberOfSlots } = obj
        const theatreModel = new TheatreSchema({
            name,
            numberOfSeats,
        })
        let theatreDetails;
        try {
            theatreDetails = await theatreModel.save();
        } catch (error) {
            return "error at adding"
        }
        return { "success": true, "userId": theatreDetails._id };
    }
    async addSlot(obj) {
        const { name, theatres, slots } = obj
        const showSchema = new ShowSchema({
            theatres,
            name,
        })
        let showDetails, slotDetails;
        try {
            showDetails = await showSchema.save();
            let shows = []
            for (let i = 0; i < theatres.length; i++) {
                const occupiedSeats = Array.from({ length: slots.length }, () => []);
                let theatre = await TheatreSchema.findOne({ _id: theatres[i] })
                const slot = new SlotSchema({
                    theatre: theatres[i],
                    movie: showDetails._id,
                    slots,
                    occupiedSeats,
                    numberOfSeats: theatre.numberOfSeats,
                })
                shows.push(slot);
            }

            slotDetails = await SlotSchema.insertMany(shows);
        } catch (error) {
            return "error at adding"
        }
        return { "success": true, "slotDetails": slotDetails };
    }
}