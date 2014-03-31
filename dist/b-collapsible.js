(function () {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    Bosonic.registerElement('b-collapsible', {
        headerClass: 'b-collapsible-header',
        closedClass: 'b-collapsible-closed',
        doneInitialUpdate: false,
        get active() {
            return this.hasAttribute('active');
        },
        set active(value) {
            value ? this.setAttribute('active', '') : this.removeAttribute('active');
        },
        createdCallback: function () {
            this.duration = this.hasAttribute('duration') ? parseFloat(this.getAttribute('duration')) : 0.33;
            this.dimension = this.hasAttribute('horizontal') ? 'width' : 'height';
            this.body = this.querySelector(':not(.' + this.headerClass + ')');
            console.log(this.body);
            this.header = this.querySelector('.' + this.headerClass);
            this.addListeners();
            this.update();
            this.doneInitialUpdate = true;
        },
        detachedCallback: function () {
            this.removeListeners();
        },
        addListeners: function () {
            if (this.header) {
                this.toggleListener = this.toggle.bind(this);
                this.header.addEventListener('click', this.toggleListener, false);
            }
            this.transitionEndListener = this.transitionEnd.bind(this);
            this.body.addEventListener('webkitTransitionEnd', this.transitionEndListener);
            this.body.addEventListener('transitionend', this.transitionEndListener);
        },
        removeListeners: function () {
            if (this.toggleListener) {
                this.header.removeEventListener('click', this.toggleListener, false);
            }
            this.body.removeEventListener('webkitTransitionEnd', this.transitionEndListener);
            this.body.removeEventListener('transitionend', this.transitionEndListener);
        },
        attributeChanged: function (name, oldValue, newValue) {
            if (name === 'active')
                this.activeChanged(oldValue, newValue);
        },
        toggle: function () {
            this.active = !this.active;
        },
        activeChanged: function (oldValue, newValue) {
            this.update();
        },
        update: function () {
            this.active ? this.show() : this.hide();
        },
        show: function () {
            if (!this.doneInitialUpdate) {
                this.transitionEnd();
                this.doneInitialUpdate = true;
                return;
            }
            this.toggleClosedClass(false);
            var size = this.calcSize();
            this.updateSize(size, this.duration);
        },
        hide: function () {
            if (!this.doneInitialUpdate) {
                this.toggleClosedClass(true);
                this.setSize(0);
                this.doneInitialUpdate = true;
                return;
            }
            this.updateSize(0, this.duration);
        },
        updateSize: function (size, duration) {
            var that = this;
            window.requestAnimationFrame(function () {
                that.setTransitionDuration(duration);
                that.setSize(size);
            });
        },
        calcSize: function () {
            this.setSize('auto');
            var size = this.body.getBoundingClientRect()[this.dimension] + 'px';
            this.setSize(0);
            return size;
        },
        setSize: function (size) {
            this.body.style[this.dimension] = size;
        },
        setTransitionDuration: function (duration) {
            var s = this.body.style;
            s.webkitTransition = s.transition = duration ? this.dimension + ' ' + duration + 's' : null;
        },
        toggleClosedClass: function (closed) {
            closed ? this.body.classList.add(this.closedClass) : this.body.classList.remove(this.closedClass);
        },
        transitionEnd: function () {
            console.log('transitionEnd');
        }
    });
}());