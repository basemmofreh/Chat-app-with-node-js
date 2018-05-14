const expect = require('expect');
const {generateMsg,generateLocationMessage} = require('./message');

describe('generate message',()=>{
    it('should generate an object',()=>{
        var obj = generateMsg('basem mofreh', 'hello world!');
        expect(typeof obj).toBe('object');
        expect(obj.from).toBe('basem mofreh');
        expect(obj.text).toBe('hello world!');
        expect(typeof obj.createdAt).toBe('number');
    })
})

describe('generate location message',()=>{
  it('should generate correct object',()=>{
    var from = 'Admin';
    var lat= 1;
    var lng= 2;
    var url = 'https://www.google.com/maps?q=1,2';
    var obj = generateLocationMessage(from,lat,lng);
      expect(typeof obj).toBe('object');
      expect(obj.from).toBe('Admin');
      expect(obj.url).toBe(url);
      expect(typeof obj.createdAt).toBe('number');
      expect(obj).toMatchObject({from,url});
  })
})
