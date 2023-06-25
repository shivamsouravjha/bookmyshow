import express from 'express';
import BookController from '../app/Controller/bookingSlotController';

const BookControllerApi = express.Router();


//Accout login
BookControllerApi.get('/show/slots', (request, response) => {
  const bookController = new BookController(response);
  bookController.showSlot(request);
});

//book slot
BookControllerApi.post('/book/slots', (request, response) => {
  const bookController = new BookController(response);
  bookController.bookSlot(request);
});

export default BookControllerApi;
