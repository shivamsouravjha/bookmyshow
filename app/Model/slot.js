import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
const schema = mongoose.Schema;

const SlotSchema = new schema({
    theatre: {type :mongoose.Types.ObjectId,required:true,ref:'Theatre'},
    movie: {type :mongoose.Types.ObjectId,required:true,ref:'Show'},
    slots: [{ type: String }],
}, {
    versionKey: false
});

SlotSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Slot', SlotSchema);