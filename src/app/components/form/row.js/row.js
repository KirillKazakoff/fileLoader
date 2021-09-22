export default class Row {
    constructor(node) {
        this.node = node;

        this.title = this.node.querySelector('.row-elem__title');
        this.size = this.node.querySelector('.row-elem__amount');
        this.url = this.node.querySelector('.row-elem__link');

        this.id = this.node.id;
        this.currentLoad = 0;
        this.totalLoad = 0;
    }

    changeTotal(loaded) {
        const lastLoadedPart = loaded - this.currentLoad;
        this.currentLoad = loaded;

        const currentAmount = this.getCurrentAmount();
        const lastPartParsed = +(lastLoadedPart / 1024 / 1024).toFixed(1);
        this.totalLoad = +(currentAmount + lastPartParsed).toFixed(1);

        this.size.textContent = `${this.totalLoad} Mb`;
    }

    getCurrentAmount() {
        const str = this.size.textContent.match(/[0-9.]+/).pop();
        return parseFloat(str);
    }
}
