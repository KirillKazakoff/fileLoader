import './form.css';

import rowT from './row.js/row.tmp';
import Row from './row.js/row';
import engine from '../../lib/engine/engine';

import Download from '../loader/download/download';

export default class Form {
    constructor(rowsData) {
        this.container = document.querySelector('.form');

        this.rowsContainer = this.container.querySelector('.rows-container');
        this.renderRows(rowsData);

        const progressHandler = this.getProgressHandler();
        const loadHandler = this.getLoadHandler();

        this.download = new Download(progressHandler, loadHandler);
        this.totalDownloaded = document.querySelector('.load-information');
    }

    renderRows(rowsData) {
        rowsData.map((row) => {
            const html = engine(rowT(row));
            this.rowsContainer.insertAdjacentHTML('beforeend', html);
        });

        this.initRows();
    }

    initRows() {
        this.rows = [...this.rowsContainer.children].map((node) => new Row(node));
    }

    getRow(id) {
        return this.rows.find((row) => row.id === id);
    }

    getProgressHandler() {
        return (node) => (event) => {
            const row = this.getRow(node.id);

            if (event.lengthComputable) {
                row.changeTotal(event.loaded);
            }

            if (event.total === row.currentLoad) {
                row.currentLoad = 0;
                console.log('load ended');
            }
        };
    }

    getLoadHandler() {
        return (xhr) => () => {
            if (xhr.status != 200) {
                console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
                return;
            }

            const allAmount = this.rows.reduce((allTotal, row) => allTotal += row.totalLoad, 0);
            this.totalDownloaded.textContent = `You've already downloaded: ${+allAmount.toFixed(1)} Mb`;
        }
    }

}










// constructor() {
//     this.setHandler();
// }

// setHandler() {
//     this.upload = new Upload((result, file) => {
//         this.imgsContainer.addImg(result, file.name);
//     }, 'image');
// }

        // this.upload = new Upload((result) => {
        //     document.querySelector('.text-preview').textContent = result;
        // });

        // this.upload = new Upload((result) => {
        //     document.querySelector('.image-preview').src = result;
        // }, 'image');

        // this.upload = new Upload((result) => {
        //     const img = document.querySelector('.image-preview');
        //     img.addEventListener('load', () => {
        //         URL.revokeObjectURL(result);
        //     })
        //     img.src = result;
        // }, 'file');

        // this.upload = new Upload((result) => {
        //     const video = document.querySelector('.video-preview');
        //     video.src = result;

        //     video.addEventListener('canplay', () => {
        //         URL.revokeObjectURL(result);
        //     }); 
        // }, 'file');

        // this.upload = new Upload((result, file) => {
        //     const link = document.createElement('a');

        //     link.href = result;
        //     link.download = file.name;
        //     link.rel = 'noopener';

        //     link.click();

        //     URL.revokeObjectURL(result);
        // }, 'file');
