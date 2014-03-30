(function () {
    Bosonic.registerElement('b-collapsible', {
        headerClass: 'b-collapsible-header',
        closedClass: 'b-collapsible-closed',
        readyCallback: function () {
            this.body = this.querySelector(':not(.' + this.headerClass + ')');
            this.header = this.querySelector('.' + this.headerClass);
            if (this.header) {
                this.header.addEventListener('click', this.toggle.bind(this), false);
            }
            this.update();
        },
        attributeChanged: function (name, oldValue, newValue) {
            if (name === 'active')
                this.activeChanged(oldValue, newValue);
        },
        toggle: function () {
            this.hasAttribute('active') ? this.removeAttribute('active') : this.setAttribute('active', '');
        },
        activeChanged: function (oldValue, newValue) {
            this.update();
        },
        update: function () {
            if (this.hasAttribute('active')) {
                this.body.classList.remove(this.closedClass);
            } else {
                this.body.classList.add(this.closedClass);
            }
        }
    });
}());