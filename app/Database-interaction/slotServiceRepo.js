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
    async findSlot(obj) {
        const { slot, movie } = obj
        try {
            let movieData = await ShowSchema.find({
                name: {
                    $type: 'string',
                    $regex: new RegExp(movie, 'i'),
                },
            })
            let show = [];

            for (let mov = 0; mov < movieData.length; mov++) {
                const slots = await SlotSchema.find({
                    movie: movieData[mov]._id
                }).populate('theatre');
                for (let i = 0; i < slots.length; i++) {
                    let eligibleShows = []
                    if (slots[i].slots.includes(slot)) {
                        if (slots[i].occupiedSeats[slots[i].slots.indexOf(slot)].length >= slots[i].numberOfSeats) {
                            slots[i].occupiedSeats.forEach((element, item) => {
                                if (element.length < slots[i].numberOfSeats) {
                                    eligibleShows.push({ slotText: slots[i].slots[item], slot: item, theatre: slots[i].theatre._id, theatreName: slots[i].theatre.name, movieId: movieData[mov]._id })
                                }
                            });
                        } else {
                            eligibleShows.push({ slotText: slots[i].slots[slots[i].slots.indexOf(slot)], slot: slots[i].slots.indexOf(slot), theatre: slots[i].theatre._id, theatreName: slots[i].theatre.name, movieId: movieData[mov]._id })
                        }
                    } else {
                        slots[i].occupiedSeats.forEach((element, item) => {
                            if (element.length < slots[i].numberOfSeats) {
                                eligibleShows.push({ slotText: slots[i].slots[item], slot: item, theatre: slots[i].theatre._id, theatreName: slots[i].theatre.name, movieId: movieData[mov]._id })
                            }
                        });

                    }
                    show.push({ name: movieData[mov].name, shows: eligibleShows })
                }
            }
            if (show.length == 0) {
                throw new Error("No slots available, try searching for anohter movie maybe?")
            }
            return { 'message': 'Slots are available', 'slots': show };
        } catch (error) {
            throw error
        }
    }
    async bookTickets(obj) {
        const { movieslot, seats, movie, theatre } = obj
        try {
            const slots = await SlotSchema.findOne({ movie: movie, theatre: theatre }).populate('movie').populate('theatre')
            let bookedSeats = arrayDifference(slots.occupiedSeats[movieslot], seats, slots.numberOfSeats)
            if (bookedSeats) {
                throw new Error('Seat already booked.');
            }
            slots.occupiedSeats[movieslot].push(...seats)
            await slots.updateOne()
            let ticket = new TicketSchema({
                seatNumber: seats,
                theatre: theatre,
                movie: movie,
                slot: slots.slots[movieslot],
                active: true,
            })
            await ticket.save();
            return {
                'message': 'Tickets booked successfully', 'ticket': {
                    seatNumber: seats,
                    theatre: slots.theatre.name,
                    movie: slots.movie.name,
                    slot: slots.slots[movieslot],
                    active: true,
                    id: ticket._id,
                }
            };
        } catch (error) {
            throw error
        }
    }

    async showAvailableTickets(obj) {
        const { movieslot, movie, theatre } = obj
        try {
            const slot = await SlotSchema.findOne({ movie: movie, theatre: theatre })
            let seats = [];
            for (var i = 0; i < slot.numberOfSeats; i++) {
                if (!slot.occupiedSeats[movieslot].includes(i + 1))
                    seats.push(i + 1);
            }
            if (seats.length < 1) {
                throw new Error("No availavble tickets")
            }
            return { 'message': 'Available tickets', 'seats': seats };
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
            await slot.updateOne();
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
}
