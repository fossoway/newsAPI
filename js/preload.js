const preload = {
    overlay: document.createElement('div'),
    preload: document.createElement('div'),

    show() {
        this.overlay.classList.add('overlay');
        this.preload.classList.add('preload');
        this.overlay.append(this.preload);
        document.body.append(this.overlay);
    },
    remove() {
        this.overlay.remove();
    },
};

export default preload;