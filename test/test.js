// import expect from 'mocha';
mocha.setup('bdd');

const expect = chai.expect;

const { JSDOM } = jsdom;

describe("canvas", () => {
    let dom = new JSDOM(`<!DOCTYPE html><html><body><p>Hello world</p></body></html>`)
    before(() => {
        const canvas = dom.window.document.createElement('canvas');
        canvas.id = 'canvas';
        dom.window.document.body.append(canvas);
    });

    it("should exists", () => {
        const canvas = dom.window.document.getElementById('canvas');
        expect(canvas).to.exist;
    });

    after(() => {
        console.log(dom.window.document.getElementsByTagName('canvas').length);
    })
})