import SlotSchema from "../Model/slot";

function arrayDifference(array1, array2,numberOfSeats) {
    var differentArray  = false
    array2.forEach((element) => {
        console.log(array1.includes(element))
        if (array1.includes(element) || element>numberOfSeats) {
            console.log("Asd")
            differentArray =  true;
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
            const slots = await SlotSchema.findOne({ movie: movie, theatre: theatre })
            let bookedSeats = arrayDifference(slots.occupiedSeats[movieslot], seats,slots.numberOfSeats)
            console.log(bookedSeats,slots.occupiedSeats[movieslot], seats)
            if (bookedSeats) {
                throw new Error('Seat already booked.');   
            }
            slots.occupiedSeats[movieslot].push(...seats)
            let f = await slots.save()
            // let theatre, show = [];
            // for (let i = 0; i < slots.length; i++) {
            //     let eligibleShows = []
            //     theatre = await TheatreSchema.find({ _id: slots[i].theatre })

            //     if (slots[i].slots.includes(slot)) {
            //         for (let j = 0; j < theatre.length; j++) {
            //             console.log(theatre, "DSdsds")
            //             console.log(theatre[j].occupiedSeats[slots[i].slots.indexOf(slot)].length)
            //             console.log(theatre[j].numberOfSeats, "sf")
            //             if (theatre[j].occupiedSeats[slots[i].slots.indexOf(slot)].length >= theatre[j].numberOfSeats) {
            //                 console.log(theatre[i])
            //             } else {
            //                 console.log(theatre, "DSdsds")

            //                 eligibleShows.push({ slot: slots[i].slots[slots[i].slots.indexOf(slot)], theatre: theatre[i]._id, })
            //             }
            //         }
            //     } else {
            //         console.log(theatre, "DSdsds")
            //         for (let j = 0; j < theatre.length; j++) {
            //             theatre[j].occupiedSeats.forEach((element) => {
            //                 if (element.length < theatre[j].numberOfSeats) {
            //                     eligibleShows.push({ slot: slots[i].slots[i], theatre: theatre[i]._id, })
            //                 }
            //             });
            //         }
            //     }

            //     show.push(...eligibleShows)
            // }
            return { 'message': 'Group Joined', 'slots': f };
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
