import express from 'express';
import SlotController from '../app/Controller/slotSetterController';

const SlotSetterApi = express.Router();


// //Account Signup
// SlotSetterApi.post('/slot/create', (request,response) => {
//   console.log("sa")
// });

//Accout login
SlotSetterApi.post('/slot/create', (request, response) => {
  const slotController = new SlotController(response);
  slotController.addSlot(request);
});

//Getting group detail of user
SlotSetterApi.post('/theatre/add', (request, response) => {
  const slotController = new SlotController(response);
  slotController.addTheatre(request);
});


export default SlotSetterApi;
