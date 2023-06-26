import express from 'express';
import BookController from '../app/Controller/bookingSlotController';

const BookControllerApi = express.Router();


//Accout login
BookControllerApi.get('/show/slots', (request, response) => {
  const bookController = new BookController(response);
  bookController.showSlot(request);
});

//show available slot
BookControllerApi.post('/show/tickets', (request, response) => {
  const bookController = new BookController(response);
  bookController.showAvailableTickets(request);
});

//book slot
BookControllerApi.post('/book/tickets', (request, response) => {
  const bookController = new BookController(response);
  bookController.bookTickets(request);
});

//cancel slot
BookControllerApi.post('/cancel/tickets', (request, response) => {
  const bookController = new BookController(response);
  bookController.cancelTickets(request);
});

//show booked ticket
BookControllerApi.get('/show/tickets', (request, response) => {
  const bookController = new BookController(response);
  bookController.showTicket(request);
});
export default BookControllerApi;
