import TheatreSchema from "../Model/theatre";
import SlotSchema from "../Model/slot"
import ShowSchema from "../Model/shows"
export default class AccountRepository {

    async addTheatre(obj) {
        const { name, numberOfSeats } = obj
        const theatreModel = new TheatreSchema({
            name,
            numberOfSeats,
        })
        let theatreDetails;
        try {
            theatreDetails = await theatreModel.save();
        } catch (error) {
            return "error adding theatre at movie "
        }
        return { "success": true, "message": "Movie slots added in theatre" };
    }

    async showTheatre() {
        const theatreModel = await TheatreSchema.find().limit(100)
        return theatreModel
    }

    async createShow(obj) {
        const { name, theatres } = obj
        const showSchema = new ShowSchema({
            theatres,
            name,
        })
        try {
            let showDetails = showDetails = await showSchema.save();
            return showDetails
        } catch (error) {
            throw new Error("error adding movie slots")
        }
    }

    async findTheatre(obj) {
        const { theatreId } = obj
        let theatre = await TheatreSchema.findOne({ _id: theatreId })
        return theatre
    }

    async addSlot(obj) {
        const { shows } = obj
        try {
            await SlotSchema.insertMany( shows );
        } catch (error) {
            console.log(error)
            throw new Error("error adding movie slots")
        }
        return { "success": true, "message": "Movie added successfully" };
    }
}