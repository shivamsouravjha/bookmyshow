import TheatreSchema from "../Model/theatre";
import SlotSchema from "../Model/slot"
import ShowSchema from "../Model/shows"
export default class AccountRepository {

    async addTheatre(obj) {
        const { name, numberOfSeats, numberOfSlots } = obj
        const occupiedSeats = Array.from({ length: numberOfSlots }, () => []);
        console.log(occupiedSeats)
        const theatreModel = new TheatreSchema({
            occupiedSeats: occupiedSeats,
            name,
            numberOfSeats,
            numberOfSlots,
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
        let showDetails, slotDetails;
        try {
            showDetails = await showSchema.save();
            let shows = []
            for (let i = 0; i < theatres.length; i++) {
                const slot = new SlotSchema({
                    theatre: theatres[i],
                    movie: showDetails._id,
                    slots,
                })
                shows.push(slot);
                const occupiedSeats = Array.from({ length: slots.length }, () => []);

                const filter = { _id: theatres[i] };
                const update = { $set: { occupiedSeats: occupiedSeats, numberOfSlots: slots.length } };

                const result = await TheatreSchema.updateOne(filter, update);
                console.log(result)
            }

            slotDetails = await SlotSchema.insertMany(shows);
        } catch (error) {
            console.log(error)
            return "error at adding"
        }
        return { "success": true, "slotDetails": slotDetails };
    }
}