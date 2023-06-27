import AccountRepository from '../Database-interaction/slotServiceRepo';
import * as Exceptions from '../Exceptions/Exceptions';
export default class BookingService {
    constructor() {
        this.repository = new AccountRepository();
    }

    //showing slots
    async showSlot(args) {
        try {
            const { slot, movie } = args
            let movieData = await this.repository.findMovie(movie);
            let show = [];
            for (let mov = 0; mov < movieData.length; mov++) {
                const slots = await this.repository.findSlotByTheatre(movieData[mov]._id)
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
            throw error;
        }
    }
    //showing tickets
    async showAvailableTickets(args) {
        try {
            const { movieslot, movie, theatre } = args

            let slotInfo = await this.repository.showAvailableTickets({ movie, theatre });
            let seats = [];
            for (var i = 0; i < slotInfo.numberOfSeats; i++) {
                if (!slotInfo.occupiedSeats[movieslot].includes(i + 1))
                    seats.push(i + 1);
            }
            if (seats.length < 1) {
                throw new Error("No availavble tickets")
            }
            return { 'message': 'Available tickets', 'seats': seats };
        } catch (error) {
            throw error;
        }
    }

    //booking slots
    async bookTickets(args) {
        try {
            const { movieslot, seats, movie, theatre } = obj;
            const slots = await this.repository.searchSlot({ movie, theatre })
            let bookedSeats = arrayDifference(slots.occupiedSeats[movieslot], seats, slots.numberOfSeats)
            if (bookedSeats) {
                throw new Error('Seat already booked.');
            }
            slots.occupiedSeats[movieslot].push(...seats)
            await this.repository.udpateSlot(slots)
            let ticketInfo = await this.repository.bookTickets({ movieslot, seats, movie, theatre, slots });
            return {
                'message': 'Tickets booked successfully', 'ticket': {
                    seatNumber: seats,
                    theatre: slots.theatre.name,
                    movie: slots.movie.name,
                    slot: slots.slots[movieslot],
                    active: true,
                    id: ticketInfo._id,
                }
            };
        } catch (error) {
            throw error;
        }
    }

    //cancelling slots
    async cancelTickets(args) {
        try {
            let ticket = await this.repository.findTicket(args);
            if (!ticket.active) {
                throw new Error("Already cancelled ticket")
            }
            let slot = await this.repository.findSlotForMovie(ticket);
            const slotNumber = slot.slots.indexOf(ticket.slot)
            let occupiedSlot = [];
            for (let i = 0; i < slot.occupiedSeats[slotNumber].length; i++) {
                if (!ticket.seatNumber.includes(slot.occupiedSeats[slotNumber][i])) {
                    occupiedSlot.push(slot.occupiedSeats[slotNumber][i])
                }
            }
            slot.occupiedSeats[slotNumber] = occupiedSlot;
            ticket.active = false;
            let accountInfo = await this.repository.cancelTickets({ slot, ticket });
            return accountInfo
        } catch (error) {
            throw error;
        }
    }

    //showing tickets
    async showTicket(args) {
        try {
            let accountInfo = await this.repository.showTicket(args);
            return accountInfo
        } catch (error) {
            throw error;
        }
    }
}