import express from 'express';
import BookController from '../app/Controller/bookingSlotController';

const BookControllerApi = express.Router();


//Accout login
BookControllerApi.get('/show/slots', (request, response) => {
  const bookController = new BookController(response);
  bookController.showSlot(request);
});

export default BookControllerApi;
