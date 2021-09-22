/* eslint-disable class-methods-use-this */
import './upload.css';

export default class Upload {
    constructor(handler, contentType = 'text') {
        this.container = document.querySelector('.upload');
        this.handler = handler;
        this.contentType = contentType;

        this.input = this.container.querySelector('.upload__input');

        this.container.addEventListener('click', (e) => this.onClick(e));
        this.container.addEventListener('dragover', (e) => this.onDragOver(e));
        this.container.addEventListener('drop', (e) => this.onDragDrop(e));
        this.input.addEventListener('input', (e) => this.onUpload(e));
    }

    onClick(e) {
        e.preventDefault();
        this.input.dispatchEvent(new MouseEvent('click'));
    }

    onDragOver(e) {
        e.preventDefault();
    }

    onDragDrop(e) {
        e.preventDefault();
        this.onUpload({ target: e.dataTransfer });
    }

    onUpload(e) {
        const { target } = e;
        const file = target.files ? target.files[0] : null;
        const reader = new FileReader();

        if (this.contentType !== 'file') {
            reader.addEventListener('load', (event) => {
                this.handler(event.target.result, file);
            });

            if (this.contentType === 'text') reader.readAsText(file);
            if (this.contentType === 'image') reader.readAsDataURL(file);
        } else {
            const url = URL.createObjectURL(file);
            this.handler(url, file);
        }
    }
}
