import Controller from './Controller';
import * as Exceptions from '../Exceptions/Exceptions'
import BookingService from '../Service/bookingSlotService';
import Validators from '../Validators/Validators';
export default class SlotController extends Controller {
    constructor(response) {
        super(response);
        this.service = new BookingService();
    }

    // showSlot funtion
    showSlot(request) {                     
        try {
            let { value, error } = Validators.showSlot.validate(request.body);
            if (error) {
                throw (new Exceptions.ValidationException(error.details[0].message));
            }
            const showSlot = this.service.showSlot(value);
            showSlot.then(res => {
                this.sendResponse(res);
            })
                .catch(error => {
                    this.handleException(error);
                })
        } catch (error) {
            this.handleException(error)
        }
    }

    //bookSlot function
    showAvailableTickets(request) {      
        try {
            let { value, error } = Validators.showAvailableTickets.validate(request.body);
            if (error) {
                throw (new Exceptions.ValidationException(error.details[0].message));
            }
            const availableTickets = this.service.showAvailableTickets(value);
            availableTickets.then(res => {
                this.sendResponse(res);
            })
                .catch(error => {
                    this.handleException(error);
                })
        } catch (error) {
            this.handleException(error)
        }
    }

    //booTickets function
    bookTickets(request) {        
        try {
            let { value, error } = Validators.bookTickets.validate(request.body);
            if (error) {
                throw (new Exceptions.ValidationException(error.details[0].message));
            }
            const bookTickets = this.service.bookTickets(value);
            bookTickets.then(res => {
                this.sendResponse(res);
            })
                .catch(error => {
                    this.handleException(error);
                })
        } catch (error) {
            this.handleException(error)
        }
    }

    //cancelticket function
    cancelTickets(request) {      
        try {
            let { value, error } = Validators.cancelTickets.validate(request.body);
            if (error) {
                throw (new Exceptions.ValidationException(error.details[0].message));
            }
            const cancelTickets = this.service.cancelTickets(value);
            cancelTickets.then(res => {
                this.sendResponse(res);
            })
                .catch(error => {
                    this.handleException(error);
                })
        } catch (error) {
            this.handleException(error)
        }
    }

    // showTicket fucntion
    showTicket(request) {               
        try {
            let { value, error } = Validators.showTicket.validate(request.body);
            if (error) {
                throw (new Exceptions.ValidationException(error.details[0].message));
            }
            const showTicket = this.service.showTicket(value);
            showTicket.then(res => {
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
