import Joi from '@hapi/joi';

export default {
    createSlot : Joi.object().keys({
        name: Joi.string().required(),
        theatres: Joi.array().required(),
        slots: Joi.array().required(),
    }),
    addTheatre : Joi.object().keys({
        name: Joi.string().required(),
        numberOfSeats: Joi.number().required()
    }),
    groupCreate : Joi.object().keys({
        groupName: Joi.string().required(),
        description: Joi.string().required(),
        genre: Joi.string().required(),
        duration: Joi.string().required(),
        amount: Joi.number().required(),
    }),
    groupJoin : Joi.object().keys({
        amount: Joi.number(),
        groupId: Joi.string().required(),
    }),
    createSource: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().required(),
        unitsPurchase: Joi.number().required(),
        details: Joi.string().required(),
        targetPrice: Joi.number().required(),
        duration: Joi.string().required()
    }), 
}