import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
const schema = mongoose.Schema;

const TicketSchema = new schema({
    seatNumber: [{ type: String }],
    theatre: {type :mongoose.Types.ObjectId,required:true,ref:'Theatre'},
    movie: {type :mongoose.Types.ObjectId,required:true,ref:'Show'},
    slot: { type: String },
    active: {type : Boolean},
}, {
    versionKey: false
});

TicketSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Ticket', TicketSchema);