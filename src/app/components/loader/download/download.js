export default class Download {
    constructor(onProgress, onLoad) {
        this.container = document.querySelector('.rows-container');

        this.container.addEventListener('click', (e) => this.onClick(e));
        this.onProgress = onProgress;
        this.onLoad = onLoad;
    }

    onClick(e) {
        if (e.target.className.includes('row-elem__link')) {
            const { href } = e.target;
            const container = e.target.closest('.row');

            const xhr = new XMLHttpRequest();

            xhr.open('GET', href);
            xhr.send();

            xhr.onload = this.onLoad(xhr);
            xhr.onprogress = this.onProgress(container);
        }
    }
}




    // async fetchFile(url) {
    //     const data = await fetch(url);
    //     const buffer = await data.arrayBuffer();
    //     const blob = new Blob([buffer], { type: "image/png" });
    //     return blob;
    // }

    // async filesLoad() {
    //     this.files = urls.map(async (url) => {
    //         let nameFile = 'file.png';
    //         const blob = await this.fetchFile(url);
    //         return new File([blob], nameFile)
    //     })
    // }
