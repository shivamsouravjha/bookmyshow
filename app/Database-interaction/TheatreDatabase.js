import TheatreSchema from "../Model/theatre";
import SlotSchema from "../Model/slot"
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
        const { name, numberOfSeats } = obj
        const theatreModel = new SlotSchema({
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
}