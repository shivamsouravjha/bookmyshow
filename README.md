# BookMyShow

This is a Movie Ticket Booking System that allows users to create theaters, add movies with showtimes, book tickets, and manage their bookings.

## Features

- [Create a theater with a name and seating capacity](https://github.com/shivamsouravjha/bookmyshow/blob/main/CURLS/addTheatres.txt).
- [Preview all theatres to add movie slots](https://github.com/shivamsouravjha/bookmyshow/blob/main/CURLS/viewTheatres.txt)
- [Add movies to theaters with movie name and available showtimes at theatre fetched from above](https://github.com/shivamsouravjha/bookmyshow/blob/main/CURLS/addingMovies.txt).
- [View all theaters that show a certain movie(searched with name).](https://github.com/shivamsouravjha/bookmyshow/blob/main/CURLS/showSlot.txt)
- [Show all available tickets at any theatre for any movie at any certain slot.](https://github.com/shivamsouravjha/bookmyshow/blob/main/CURLS/showAvailableTickets.txt)
- [Book tickets for a desired slot.](https://github.com/shivamsouravjha/bookmyshow/blob/main/CURLS/bookingTicket.txt)
- [View booked tickets and their details.](https://github.com/shivamsouravjha/bookmyshow/blob/main/CURLS/showTicket.txt)
- [Cancel booked tickets.](https://github.com/shivamsouravjha/bookmyshow/blob/main/CURLS/cancelTicket.txt)

## FLow:

 ```
create a theatre -> fetch theatre names to add movie in slots -> show movie at a theatre in a slot
                                                                             | 
                                                                             V 
 view ticket  <- book a ticket  <- Show all available tickets  <-  Search for movies by name and slots 
                      |
                      V
                      Cancel ticket

```


## Environment variables needed to run it

name=<name of user>
password=<password of user>
db=<name of database>

## Prerequisites

- Node.js (version v19.7.0)
- MongoDB (version ^7.3.1)

