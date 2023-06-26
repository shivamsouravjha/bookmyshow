import express from 'express';
import BookController from '../app/Controller/bookingSlotController';

const BookControllerApi = express.Router();


//Accout login
BookControllerApi.get('/show/slots', (request, response) => {
  const bookController = new BookController(response);
  bookController.showSlot(request);
});

//show slot
BookControllerApi.post('/show/tickets', (request, response) => {
  const bookController = new BookController(response);
  bookController.showTickets(request);
});

//book slot
BookControllerApi.post('/book/tickets', (request, response) => {
  const bookController = new BookController(response);
  bookController.bookTickets(request);
});

export default BookControllerApi;
