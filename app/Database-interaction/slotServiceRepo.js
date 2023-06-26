import SlotSchema from "../Model/slot";
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
            const slots = await SlotSchema.find({ movie: movie })
            let show = [];
            for (let i = 0; i < slots.length; i++) {
                let eligibleShows = []
                if (slots[i].slots.includes(slot)) {
                    if (slots[i].occupiedSeats[slots[i].slots.indexOf(slot)].length >= slots[i].numberOfSeats) {
                        slots[i].occupiedSeats.forEach((element, item) => {
                            if (element.length < slots[i].numberOfSeats) {
                                eligibleShows.push({ slotText: slots[i].slots[item], slot: item, theatre: slots[i].theatre })
                            }
                        });
                    } else {
                        eligibleShows.push({ slotText: slots[i].slots[slots[i].slots.indexOf(slot)], slot: slots[i].slots.indexOf(slot), theatre: slots[i].theatre, })
                    }
                } else {
                    slots[i].occupiedSeats.forEach((element, item) => {
                        if (element.length < slots[i].numberOfSeats) {
                            eligibleShows.push({ slotText: slots[i].slots[item], slot: item, theatre: slots[i].theatre })
                        }
                    });

                }
                show.push(...eligibleShows)
            }
            return { 'message': 'Group Joined', 'slots': show };
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
            await slots.save()
            let ticket = new TicketSchema({
                seatNumber: seats,
                theatre: theatre,
                movie: movie,
                slot: slots.slots[movieslot],
                active: true,
            })
            await ticket.save();
            return {
                'message': 'Group Joined', 'ticket': {
                    seatNumber: seats,
                    theatre: slots.theatre.name,
                    movie: slots.movie.name,
                    slot: slots.slots[movieslot],
                    active: true,
                }
            };
        } catch (error) {
            throw error
        }
    }

    async showTickets(obj) {
        const { movieslot, movie, theatre } = obj
        try {
            const slot = await SlotSchema.findOne({ movie: movie, theatre: theatre })
            let seats = [];
            for (var i = 0; i < slot.numberOfSeats; i++) {
                if (!slot.occupiedSeats[movieslot].includes(i + 1))
                    seats.push(i + 1);
            }
            return { 'message': 'Group Joined', 'seats': seats };
        } catch (error) {
            throw error
        }
    }
}
