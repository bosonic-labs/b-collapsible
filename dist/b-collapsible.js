(function () {
    Bosonic.registerElement('b-collapsible', {
        headerClass: 'b-collapsible-header',
        closedClass: 'b-collapsible-closed',
        createdCallback: function () {
            this.body = this.querySelector(':not(.' + this.headerClass + ')');
            this.header = this.querySelector('.' + this.headerClass);
            if (this.header) {
                this.toggleListener = this.toggle.bind(this);
                this.header.addEventListener('click', this.toggleListener, false);
            }
            this.update();
        },
        detachedCallback: function () {
            if (this.toggleListener) {
                this.header.removeEventListener('click', this.toggleListener, false);
            }
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
            this.hasAttribute('active') ? this.show() : this.hide();
        },
        show: function () {
            this.body.classList.remove(this.closedClass);
        },
        hide: function () {
            this.body.classList.add(this.closedClass);
        }
    });
}());