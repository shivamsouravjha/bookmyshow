import Joi from '@hapi/joi';

export default {
    createSlot: Joi.object().keys({
        name: Joi.string().required(),
        theatres: Joi.array().required(),
        slots: Joi.array().required(),
    }),
    addTheatre: Joi.object().keys({
        name: Joi.string().required(),
        numberOfSeats: Joi.number().required()
    }),
    showSlot: Joi.object().keys({
        movie: Joi.string().required(),
        slot: Joi.string().required(),
    }),
    showAvailableTickets: Joi.object().keys({
        movieslot: Joi.number(),
        theatre: Joi.string().required(),
        movie: Joi.string().required(),
    }),
    bookTickets: Joi.object().keys({
        movie: Joi.string().required(),
        theatre: Joi.string().required(),
        movieslot: Joi.number().required(),
        seats: Joi.array().required(),
    }),
    cancelTickets: Joi.object().keys({
        ticketid: Joi.string().required(),
    }),
    showTicket: Joi.object().keys({
        ticketid: Joi.string().required(),
    }),
}