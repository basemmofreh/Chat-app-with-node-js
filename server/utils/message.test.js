const expect = require('expect');
const {generateMsg} = require('./message');

describe('generate message',()=>{
    it('should generate an object',()=>{
        var obj = generateMsg('basem mofreh', 'hello world!');
        expect(typeof obj).toBe('object');
        expect(obj.from).toBe('basem mofreh');
        expect(obj.text).toBe('hello world!');
        expect(typeof obj.createdAt).toBe('number');
    })
})
