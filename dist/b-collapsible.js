(function () {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var HEADER_CLASS = 'b-collapsible-header', BODY_CLASS = 'b-collapsible-body', CLOSED_CLASS = 'b-collapsible-closed';
    var BCollapsiblePrototype = Object.create(HTMLElement.prototype, {
            active: {
                enumerable: true,
                get: function () {
                    return this.hasAttribute('active');
                },
                set: function (value) {
                    value ? this.setAttribute('active', '') : this.removeAttribute('active');
                }
            },
            createdCallback: {
                enumerable: true,
                value: function () {
                    this.duration = this.hasAttribute('duration') ? parseFloat(this.getAttribute('duration')) : 0.33;
                    this.dimension = this.hasAttribute('horizontal') ? 'width' : 'height';
                    this.header = this.querySelector('.' + HEADER_CLASS);
                    this.body = this.querySelector('.' + BODY_CLASS) || this.header.nextElementSibling;
                    if (this.body) {
                        this.body.style.overflow = 'hidden';
                        if (this.supportsTransitions()) {
                            this.body.classList.add(BODY_CLASS);
                            if (this.active) {
                                this.setSize('auto');
                            }
                        }
                        this.addListeners();
                        this.toggleClosedClass(!this.active);
                    }
                }
            },
            detachedCallback: {
                enumerable: true,
                value: function () {
                    this.removeListeners();
                }
            },
            addListeners: {
                enumerable: true,
                value: function () {
                    if (this.header) {
                        this.toggleListener = this.toggle.bind(this);
                        this.header.addEventListener('click', this.toggleListener, false);
                    }
                    if (this.supportsTransitions()) {
                        this.transitionEndListener = this.transitionEnd.bind(this);
                        this.body.addEventListener('webkitTransitionEnd', this.transitionEndListener);
                        this.body.addEventListener('transitionend', this.transitionEndListener);
                    }
                }
            },
            removeListeners: {
                enumerable: true,
                value: function () {
                    if (this.toggleListener) {
                        this.header.removeEventListener('click', this.toggleListener, false);
                    }
                    if (this.supportsTransitions()) {
                        this.body.removeEventListener('webkitTransitionEnd', this.transitionEndListener);
                        this.body.removeEventListener('transitionend', this.transitionEndListener);
                    }
                }
            },
            attributeChangedCallback: {
                enumerable: true,
                value: function (name, oldValue, newValue) {
                    if (name === 'active')
                        this.activeChanged(oldValue, newValue);
                }
            },
            toggle: {
                enumerable: true,
                value: function () {
                    if (!this.dispatchEvent(new CustomEvent('b-collapsible-toggle', { cancelable: true })))
                        return;
                    this.active = !this.active;
                }
            },
            activeChanged: {
                enumerable: true,
                value: function (oldValue, newValue) {
                    this.update();
                }
            },
            update: {
                enumerable: true,
                value: function () {
                    if (!this.body)
                        return;
                    this.active ? this.show() : this.hide();
                }
            },
            show: {
                enumerable: true,
                value: function () {
                    if (!this.dispatchEvent(new CustomEvent('b-collapsible-show', { cancelable: true })))
                        return;
                    this.toggleClosedClass(false);
                    if (this.supportsTransitions()) {
                        var size = this.calcSize();
                        this.updateSize(size, this.duration);
                    }
                }
            },
            hide: {
                enumerable: true,
                value: function () {
                    if (!this.dispatchEvent(new CustomEvent('b-collapsible-hide', { cancelable: true })))
                        return;
                    if (!this.supportsTransitions()) {
                        this.toggleClosedClass(true);
                        return;
                    }
                    var size = this.computeSize();
                    this.setSize(size);
                    this.updateSize(0, this.duration);
                }
            },
            updateSize: {
                enumerable: true,
                value: function (size, duration) {
                    var that = this;
                    window.requestAnimationFrame(function () {
                        that.setSize(size);
                        that.setTransitionDuration(duration);
                    });
                }
            },
            calcSize: {
                enumerable: true,
                value: function () {
                    this.setSize('auto');
                    var size = this.computeSize();
                    this.setSize(0);
                    return size;
                }
            },
            computeSize: {
                enumerable: true,
                value: function () {
                    var size = parseInt(this.body.getBoundingClientRect()[this.dimension]);
                    return size - this.getBorderWidth() + 'px';
                }
            },
            getBorderWidth: {
                enumerable: true,
                value: function () {
                    return this.dimension === 'width' ? this.computeWidth('borderLeftWidth') + this.computeWidth('borderRightWidth') : this.computeWidth('borderTopWidth') + this.computeWidth('borderBottomWidth');
                }
            },
            computeWidth: {
                enumerable: true,
                value: function (property) {
                    return parseInt(getComputedStyle(this.body)[property].replace('px', ''));
                }
            },
            setSize: {
                enumerable: true,
                value: function (size) {
                    this.body.style[this.dimension] = size;
                }
            },
            setTransitionDuration: {
                enumerable: true,
                value: function (duration) {
                    var s = this.body.style;
                    s.webkitTransition = s.transition = duration ? this.dimension + ' ' + duration + 's' : null;
                }
            },
            toggleClosedClass: {
                enumerable: true,
                value: function (closed) {
                    closed ? this.body.classList.add(CLOSED_CLASS) : this.body.classList.remove(CLOSED_CLASS);
                }
            },
            transitionEnd: {
                enumerable: true,
                value: function () {
                    this.setTransitionDuration(null);
                    if (this.active) {
                        this.setSize('auto');
                    } else {
                        this.toggleClosedClass(true);
                    }
                }
            },
            supportsTransitions: {
                enumerable: true,
                value: function () {
                    return window.requestAnimationFrame !== undefined;
                }
            }
        });
    window.BCollapsible = document.registerElement('b-collapsible', { prototype: BCollapsiblePrototype });
    Object.defineProperty(BCollapsible.prototype, '_super', {
        enumerable: false,
        writable: false,
        configurable: false,
        value: HTMLElement.prototype
    });
}());