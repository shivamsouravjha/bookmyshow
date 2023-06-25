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

// //Getting user detail
// AccountApiRouter.post('/account/data/:uid', (request, response) => {
//   const accountController = new AccountController(response);
//   accountController.verifyUsername({_id:request.params.uid});
// });

export default SlotSetterApi;
