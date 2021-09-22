import Form from '../components/form/form';
import rowsData from '../components/loader/download/rowsData';

export default class Controller {
    constructor() {
        this.form = new Form(rowsData);
    }
}
