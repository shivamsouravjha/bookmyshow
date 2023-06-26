import Controller from './Controller';
import * as Exceptions from '../Exceptions/Exceptions'
import SlotService from '../Service/slotService';
import Validators from '../Validators/Validators';
export default class SlotController extends Controller {
    constructor(response) {
        super(response);
        this.service = new SlotService();
    }

    addSlot(request) {                 //createSlot
        try {
            let { value, error } = Validators.createSlot.validate(request.body);
            if (error) {
                throw (new Exceptions.ValidationException(error.details[0].message));
            }
            const addSlot = this.service.addSlot(value);
            addSlot.then(res => {
            this.sendResponse(res);
            })
                .catch(error => {
                    this.handleException(error);
                })
        } catch (error) {
            this.handleException(error)
        }
    }

    addTheatre(request) {                 //addtheatre
        try {
            let { value, error } = Validators.addTheatre.validate(request.body);
            if (error) {
                throw (new Exceptions.ValidationException(error.details[0].message));
            }
            const theatre = this.service.addTheatre(value);
            theatre.then(res => {
                this.sendResponse(res);
            })
                .catch(error => {
                    this.handleException(error);
                })
        } catch (error) {
            this.handleException(error)
        }
    }

    showTheatres() {                 //addtheatre
        try {
            const theatre = this.service.showTheatre();
            theatre.then(res => {
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