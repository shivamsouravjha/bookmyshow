import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
const schema = mongoose.Schema;

const TheatreSchema = new schema({
    name: { type: String },
    numberOfSeats: { type: Number },
}, {
    versionKey: false
});

TheatreSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Theatre', TheatreSchema);