const {isRealstr} = require('./validation');
const expect = require('expect');

describe(' validate the url string',()=>{

it('should validate the url name value',()=>{
  var validName= isRealstr('basem');
      expect(validName).toBe(true);
})



it('should reject string with only spaces',()=>{
    var validRoom = isRealstr('    ');
      expect(validRoom).toBe(false);
})



it('should reject non string values',()=>{
    var validRoom = isRealstr(123123123);
      expect(validRoom).toBe(false);
})


});
