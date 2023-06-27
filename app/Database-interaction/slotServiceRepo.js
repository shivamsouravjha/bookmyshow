import SlotSchema from "../Model/slot";
import ShowSchema from "../Model/shows";
import TicketSchema from "../Model/ticket"
function arrayDifference(array1, array2, numberOfSeats) {
    var differentArray = false
    array2.forEach((element) => {
        if (array1.includes(element) || element > numberOfSeats) {
            differentArray = true;
        }
    });
    return differentArray
}

export default class SourceRepository {
    async findMovie(movie) {
        let movieData = await ShowSchema.find({
            name: {
                $type: 'string',
                $regex: new RegExp(movie, 'i'),
            },
        })
        return movieData
    }

    async findSlotByTheatre(movieId) {
        const slots = await SlotSchema.find({
            movie: movieId,
        }).populate('theatre');
        return slots
    }

    async bookTickets(obj) {
        const { movieslot, seats, movie, theatre, slots } = obj
        try {
            let ticket = new TicketSchema({
                seatNumber: seats,
                theatre: theatre,
                movie: movie,
                slot: slots.slots[movieslot],
                active: true,
            })
            await ticket.save();
            return ticket;
        } catch (error) {
            throw error
        }
    }

    async udpateSlot(slots) {
        return await slots.updateOne();
    }

    async showAvailableTickets(obj) {
        const { movie, theatre } = obj
        try {
            const slot = await SlotSchema.findOne({ movie: movie, theatre: theatre })
            return slot
        } catch (error) {
            throw error
        }
    }

    async findTicket(obj) {
        const { ticketid } = obj;
        const ticket = await TicketSchema.findOne({ _id: ticketid })
        return ticket
    }

    async findSlotForMovie(obj) {
        const { ticket } = obj;
        const slot = await SlotSchema.findOne({ theatre: ticket.theatre, movie: ticket.movie })
        return slot
    }

    async cancelTickets(obj) {
        const { slot, ticket } = obj
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await this.udpateSlot(slot);
            await ticket.updateOne();
            await sess.commitTransaction();
            return { 'message': 'Ticket Cancelled Successfully', 'seats': ticket };
        } catch (error) {
            throw error
        }
    }

    async showTicket(obj) {
        const { ticketId } = obj
        try {
            const ticket = await TicketSchema.findOne({ _id: ticketId })
            return { 'message': 'Ticket Details', 'ticket': ticket };
        } catch (error) {
            throw error
        }
    }

    async searchSlot(obj) {
        return SlotSchema.findOne(obj).populate('movie').populate('theatre')
    }
}
