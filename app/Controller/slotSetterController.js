import Controller from './Controller';
import * as Exceptions from '../Exceptions/Exceptions'
import SlotService from '../Service/slotService';
export default class SlotController extends Controller {
    constructor(response) {
        super(response);
        this.service = new SlotService();
    }

    addSlot(request) {                 //createSlot
        try {
            // let { value, error } = Validators.createAccount.validate(request.body);
            // if (error) {
            //     throw (new Exceptions.ValidationException(error.details[0].message));
            // }
            const addUser = this.service.addSlot(request.body);
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

    addTheatre(request) {                 //addtheatre
        try {
            // let { value, error } = Validators.createAccount.validate(request.body);
            // if (error) {
            //     throw (new Exceptions.ValidationException(error.details[0].message));
            // }
            const theatre = this.service.addTheatre(request.body);
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