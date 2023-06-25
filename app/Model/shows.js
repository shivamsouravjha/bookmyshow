import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
const schema = mongoose.Schema;

const ShowSchema = new schema({
    theatres: [{type :mongoose.Types.ObjectId,required:true,ref:'Theatre'}],
    name: { type: String },
}, {
    versionKey: false
});

ShowSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Show', ShowSchema);