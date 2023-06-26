import Controller from './Controller';
import * as Exceptions from '../Exceptions/Exceptions'
import BookingService from '../Service/bookingSlotService';
export default class SlotController extends Controller {
    constructor(response) {
        super(response);
        this.service = new BookingService();
    }

    showSlot(request) {                 //showSlot
        try {
            const addUser = this.service.showSlot(request.body);
            addUser.then(res => {
                this.sendResponse(res);
            })
                .catch(error => {
                    this.handleException(error);
                })
        } catch (error) {
            this.handleException(error)
        }
    }

    showAvailableTickets(request) {                 //bookSlot
        try {
            const addUser = this.service.showAvailableTickets(request.body);
            addUser.then(res => {
                this.sendResponse(res);
            })
                .catch(error => {
                    this.handleException(error);
                })
        } catch (error) {
            this.handleException(error)
        }
    }

    bookTickets(request) {                 //bookSlot
        try {
            const addUser = this.service.bookTickets(request.body);
            addUser.then(res => {
                this.sendResponse(res);
            })
                .catch(error => {
                    this.handleException(error);
                })
        } catch (error) {
            this.handleException(error)
        }
    }

    cancelTickets(request) {                 //cancelticket
        try {
            const addUser = this.service.cancelTickets(request.body);
            addUser.then(res => {
                this.sendResponse(res);
            })
                .catch(error => {
                    this.handleException(error);
                })
        } catch (error) {
            this.handleException(error)
        }
    }

    showTicket(request) {                 //showTicket
        try {
            const addUser = this.service.showTicket(request.body);
            addUser.then(res => {
                this.sendResponse(res);
            })
                .catch(error => {
                    this.handleException(error);
                })
        } catch (error) {
            this.handleException(error)
        }
    }
}