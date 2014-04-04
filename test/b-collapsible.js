function wait(callback) {
    setTimeout(callback, 400);
}

function createCollapsible(active) {
    document.body.innerHTML = (active ? '<b-collapsible active>' : '<b-collapsible>') 
        + '<div class="b-collapsible-header">Header</div><div>Lorem ipsum</div></b-collapsible>';
    return document.querySelector('b-collapsible');
}

describe("b-collapsible", function() {
    it("should be collapsed by default", function(done) {
        var collapsible = createCollapsible();
        wait(function() {
            expect(collapsible.body.style.height).to.equal('');
            expect(collapsible.body.classList.contains('b-collapsible-closed')).to.be.true;
            done();
        });
    });

    it("should be expanded when active", function(done) {
        var collapsible = createCollapsible(true);
        wait(function() {
            expect(collapsible.body.classList.contains('b-collapsible-closed')).to.be.false;
            done();
        });
    });

    it("should get an `active` attribute when its header is clicked", function(done) {
        var collapsible = createCollapsible();
        wait(function() {
            effroi.mouse.click(collapsible.querySelector('.b-collapsible-header'));
            expect(collapsible.hasAttribute('active')).to.be.true;
            done();
        });
    });

    it("should loose its `active` attribute when its header is clicked and it is already active", function(done) {
        var collapsible = createCollapsible(true);
        wait(function() {
            effroi.mouse.click(collapsible.querySelector('.b-collapsible-header'));
            expect(collapsible.hasAttribute('active')).to.be.false;
            done();
        });
    });

    it("should expand when set as active", function(done) {
        var collapsible = createCollapsible();
        wait(function() {
            collapsible.setAttribute('active', '');
            wait(function() {
                expect(collapsible.body.classList.contains('b-collapsible-closed')).to.be.false;
                done();
            });
        });
    });
});