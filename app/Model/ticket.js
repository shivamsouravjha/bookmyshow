import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
const schema = mongoose.Schema;

const TicketSchema = new schema({
    seatNumber: { type: String },
    name: { type: String },
    slot: { type: Boolean },
    active: {type : Boolean},
}, {
    versionKey: false
});

TicketSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Ticket', TicketSchema);