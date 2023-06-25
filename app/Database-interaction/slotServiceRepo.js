import SlotSchema from "../Model/slot";
import TheatreSchema from "../Model/theatre";
import mongoose from 'mongoose';
// mongoose.models = {GroupModel,UserModel}

export default class SourceRepository {
    async findSlot(obj) {
        const { slot, movie } = obj
        try {
            const slots = await SlotSchema.find({ movie: movie })
            let theatre, show = [];
            for (let i = 0; i < slots.length; i++) {
                let eligibleShows = []
                theatre = await TheatreSchema.find({ _id: slots[i].theatre })

                if (slots[i].slots.includes(slot)) {
                    for (let j = 0; j < theatre.length; j++) {
                        console.log(theatre, "DSdsds")
                        console.log(theatre[j].occupiedSeats[slots[i].slots.indexOf(slot)].length)
                        console.log(theatre[j].numberOfSeats, "sf")
                        if (theatre[j].occupiedSeats[slots[i].slots.indexOf(slot)].length >= theatre[j].numberOfSeats) {
                            console.log(theatre[i])
                        } else {
                            eligibleShows.push({ slotText: slots[i].slots[slots[i].slots.indexOf(slot)],slot:slots[i].slots.indexOf(slot), theatre: theatre[i]._id, })
                        }
                    }
                } else {
                    console.log(theatre, "DSdsds")
                    for (let j = 0; j < theatre.length; j++) {
                        console.log(slots[j], theatre[j])
                        theatre[j].occupiedSeats.forEach((element, item) => {
                            console.log(element, item, slots[j])
                            if (element.length < theatre[j].numberOfSeats) {
                                eligibleShows.push({ slotText: slots[j].slots[item], slot: item, theatre: theatre[i]._id, })
                            }
                        });
                    }
                }
                show.push(...eligibleShows)
            }
            return { 'message': 'Group Joined', 'slots': show };
        } catch (error) {
            throw error
        }
    }
    async bookSlots(obj) {
        const { slot, movie } = obj
        try {
            const slots = await SlotSchema.find({ movie: movie })
            let theatre, show = [];
            for (let i = 0; i < slots.length; i++) {
                let eligibleShows = []
                theatre = await TheatreSchema.find({ _id: slots[i].theatre })

                if (slots[i].slots.includes(slot)) {
                    for (let j = 0; j < theatre.length; j++) {
                        console.log(theatre, "DSdsds")
                        console.log(theatre[j].occupiedSeats[slots[i].slots.indexOf(slot)].length)
                        console.log(theatre[j].numberOfSeats, "sf")
                        if (theatre[j].occupiedSeats[slots[i].slots.indexOf(slot)].length >= theatre[j].numberOfSeats) {
                            console.log(theatre[i])
                        } else {
                            console.log(theatre, "DSdsds")

                            eligibleShows.push({ slot: slots[i].slots[slots[i].slots.indexOf(slot)], theatre: theatre[i]._id, })
                        }
                    }
                } else {
                    console.log(theatre, "DSdsds")
                    for (let j = 0; j < theatre.length; j++) {
                        theatre[j].occupiedSeats.forEach((element) => {
                            if (element.length < theatre[j].numberOfSeats) {
                                eligibleShows.push({ slot: slots[i].slots[i], theatre: theatre[i]._id, })
                            }
                        });
                    }
                }

                show.push(...eligibleShows)
            }
            return { 'message': 'Group Joined', 'slots': show };
        } catch (error) {
            throw error
        }
    }
}
