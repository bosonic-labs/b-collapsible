function wait(callback) {
    setTimeout(callback, 200);
}

function createCollapsible(active) {
    document.body.innerHTML = '<b-collapsible><div class="b-collapsible-header">Header</div><div>Lorem ipsum</div></b-collapsible>';
    var collapsible = document.querySelector('b-collapsible');
    if (active) {
        collapsible.setAttribute('active', '');
    }
    return collapsible;
}

describe("b-collapsible", function() {
    it("should be collapsed by default", function() {
        var collapsible = createCollapsible();
        wait(function() {
            expect(collapsible.body.style.height).to.equal(0);
            expect(collapsible.classList.contains('b-collapsible-closed')).to.be.true;
        });
    });

    it("should be expanded when active", function() {
        var collapsible = createCollapsible(true);
        wait(function() {
            expect(collapsible.body.style.height).to.equal('auto');
            expect(collapsible.classList.contains('b-collapsible-closed')).to.be.false;
        });
    });

    it("should get an `active` attribute when its header is clicked", function() {
        var collapsible = createCollapsible();
        wait(function() {
            effroi.mouse.click(collapsible.querySelector('.b-collapsible-header'));
            expect(collapsible.hasAttribute('active')).to.be.true;
        });
    });

    it("should loose its `active` attribute when its header is clicked and it is already active", function() {
        var collapsible = createCollapsible(true);
        wait(function() {
            effroi.mouse.click(collapsible.querySelector('.b-collapsible-header'));
            expect(collapsible.hasAttribute('active')).to.be.false;
        });
    });

    it("should expand when set as active", function() {
        var collapsible = createCollapsible();
        wait(function() {
            collapsible.setAttribute('active', '');
            wait(function() {
                expect(collapsible.body.style.height).to.equal('auto');
                expect(collapsible.classList.contains('b-collapsible-closed')).to.be.false;
            });
        });
    });
});