(function () {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var HEADER_CLASS = 'b-collapsible-header', BODY_CLASS = 'b-collapsible-body', CLOSED_CLASS = 'b-collapsible-closed';
    Bosonic.registerElement('b-collapsible', {
        get active() {
            return this.hasAttribute('active');
        },
        set active(value) {
            value ? this.setAttribute('active', '') : this.removeAttribute('active');
        },
        createdCallback: function () {
            this.duration = this.hasAttribute('duration') ? parseFloat(this.getAttribute('duration')) : 0.33;
            this.dimension = this.hasAttribute('horizontal') ? 'width' : 'height';
            this.body = this.querySelector(':not(.' + HEADER_CLASS + ')');
            this.header = this.querySelector('.' + HEADER_CLASS);
            if (this.body) {
                this.body.style.overflow = 'hidden';
                this.body.classList.add(BODY_CLASS);
                this.addListeners();
                this.toggleClosedClass(true);
            }
            if (this.active) {
                this.setSize('auto');
                this.toggleClosedClass(false);
            }
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
            if (!this.body)
                return;
            this.active ? this.show() : this.hide();
        },
        show: function () {
            this.toggleClosedClass(false);
            var size = this.calcSize();
            this.updateSize(size, this.duration);
        },
        hide: function () {
            var size = this.computeSize();
            this.setSize(size);
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
            var size = this.computeSize();
            this.setSize(0);
            return size;
        },
        computeSize: function () {
            return this.body.getBoundingClientRect()[this.dimension] + 'px';
        },
        setSize: function (size) {
            this.body.style[this.dimension] = size;
        },
        setTransitionDuration: function (duration) {
            var s = this.body.style;
            s.webkitTransition = s.transition = duration ? this.dimension + ' ' + duration + 's' : null;
        },
        toggleClosedClass: function (closed) {
            closed ? this.body.classList.add(CLOSED_CLASS) : this.body.classList.remove(CLOSED_CLASS);
        },
        transitionEnd: function () {
            this.setTransitionDuration(null);
            if (this.active) {
                this.setSize('auto');
            } else {
                this.toggleClosedClass(true);
            }
        }
    });
}());