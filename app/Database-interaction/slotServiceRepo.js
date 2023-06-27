import SlotSchema from "../Model/slot";
import ShowSchema from "../Model/shows";
import TicketSchema from "../Model/ticket"
import mongoose from "mongoose";
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
        return await slots.save();
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
        const { ticketId } = obj;
        const ticket = await TicketSchema.findOne({ _id: ticketId })
        return ticket
    }

    async findSlotForMovie(ticket) {
        const slot = await SlotSchema.findOne({ theatre: ticket.theatre, movie: ticket.movie })
        return slot
    }

    async cancelTickets(obj) {
        const { slot, ticket } = obj
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await this.udpateSlot(slot);
            await ticket.save();
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
