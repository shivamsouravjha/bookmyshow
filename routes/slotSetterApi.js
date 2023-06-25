import express from 'express';
import SlotController from '../app/Controller/slotSetterController';

const SlotSetterApi = express.Router();

//Slot Create
SlotSetterApi.post('/slot/create', (request, response) => {
  const slotController = new SlotController(response);
  slotController.addSlot(request);
});

//Theatre Add
SlotSetterApi.post('/theatre/add', (request, response) => {
  const slotController = new SlotController(response);
  slotController.addTheatre(request);
});


export default SlotSetterApi;
