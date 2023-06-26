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

## Flow:

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

name=`name of user`

password=`password of user`

db= `name of database`

## Database Design:

* Theatre:
```
   {
    numberOfSeats: number of seats in theatre ,
    name:name of theatre,
    id:Id of theatre
   }

Sample:
{
  "_id": { "$oid": "6497edb49e67a2853e4fccf8" },
  "occupiedSeats": [[], [], []],
  "name": "panwel",
  "numberOfSeats": "45",
  "numberOfSlots": { "$numberInt": "3" }
}
```
* Show Schema:
```
   {
    theatres: array of theatres the movie will be shown ,
    name:name of movie,
    id:Id of theatre
   }
Sample:
{
  "_id": { "$oid": "6499c818758dff3ace4445a9" },
  "theatres": [{ "$oid": "6499c0adad8027ad38db6dda" }],
  "name": "Suryavansham"
}

```
* Slot Schema:
```
   {
    theatre : Theatre ID of the show in  particular slot ,
    movie:Moive ID of the show in  particular slot ,
    id:Id of slot,
    slots: slot in which movie will be shown,
    occupiedSeats:  seats which are occupied in every slot,
    numberOfSeats: numberOfSeats in slot
   }

Sample:
{
  "_id": { "$oid": "6497fbb42567483b61586c09" },
  "theatre": { "$oid": "6497f25b1ef99ae00c7b1bea" },
  "movie": { "$oid": "6497fbb42567483b61586c06" },
  "Slots": []
}

```
* Ticket Schema:
```
  {
    seatNumber: seat numbers of movie,
    theatre: theatre id where movie will be shown,
    movie: movie id,
    slot: slot of movie,
    active:  is ticket active or cancelled,
  }
Sample:
{
  "_id": { "$oid": "64996a7658f1ae1f0cfd37ed" },
  "seatNumber": [],
  "theatre": { "$oid": "64994e7d99dfc7b222e5449b" },
  "movie": { "$oid": "64994edb05e2f580b0df897b" },
  "slot": "4-5",
  "active": true
}
```
## Prerequisites

- Node.js (version v19.7.0)
- MongoDB (version ^7.3.1)

