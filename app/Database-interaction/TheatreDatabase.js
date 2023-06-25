import TheatreSchema from "../Model/theatre";
import SlotSchema from "../Model/slot"
import ShowSchema from "../Model/shows"
export default class AccountRepository {

    async addTheatre(obj) {
        const { name, numberOfSeats } = obj
        const theatreModel = new TheatreSchema({
            occupiedSeats: [],
            name,
            numberOfSeats,
        })
        let theatreDetails;
        try {
            theatreDetails = await theatreModel.save();
        } catch (error) {
            console.log(error)
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
        let showDetails,slotDetails;
        try {
            showDetails = await showSchema.save();
            let shows = []
            for (let i = 0; i < theatres.length; i++) {
                const slot = new SlotSchema({
                    theatre:theatres[i],
                    movie:showDetails._id,
                    slots,
                })
                shows.push(slot);
            }
            slotDetails =  await SlotSchema.insertMany(shows);
            console.log(slotDetails)
        } catch (error) {
            console.log(error)
            return "error at adding"
        }
        return { "success": true, "userId": slotDetails._id };
    }
}