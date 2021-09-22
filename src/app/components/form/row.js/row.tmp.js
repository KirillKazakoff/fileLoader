// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid';

const linkT = (data) => ({
    block: 'a',
    cls: 'row-elem row-elem__link',
    content: 'Download',
    attrs: {
        href: data.url,
        download: data.title,
        rel: 'noopener',
    },
});

const amountT = () => ({
    block: 'span',
    cls: 'row-elem row-elem__amount',
    content: '0.0 Mb',
});

const titleT = (title) => ({
    block: 'span',
    cls: 'row-elem row-elem__title',
    content: title,
});

const rowT = (data) => ({
    block: 'div',
    cls: 'row',
    content: [titleT(data.title), amountT(), linkT(data)],
    attrs: {
        id: nanoid(5),
    },
});

export default rowT;
