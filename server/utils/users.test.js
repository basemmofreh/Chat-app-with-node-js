const expect = require('expect');
const {Users} = require('./users');


describe('it should create a user object',()=>{

  var users;
  beforeEach(()=>{
  users = new Users();
  users.users = [{
    id:'1',
    name:'basem',
    room:'devslopes'
  },{
    id:'2',
    name:'sasd',
    room:'devslopess'
  },{
    id:'3',
    name:'kaml',
    room:'devslopes'
  }];
  })

  it('should return created user',()=>{
      var user = new Users();
      var returnUser = user.addUsers(25,'basem','devslopes');
      var id ,name,room;
      expect(returnUser.id).toBe(25);
  })


  it('should return names for devslopes course',()=>{
    var userList = users.getUserList('devslopes');
    expect(userList).toEqual(['basem','kaml']);
  })

  it('should remove a user',()=>{
    var removeUser = users.removeUser('2');
    var userList = users.getUserList('devslopes');
    expect(removeUser.name).toBe('sasd');
    expect(users.users.length).toBe(2);
  })

  it('should not remove a user',()=>{

    var removeUser = users.removeUser('4');
    expect(removeUser).toEqual(undefined);
    expect(users.users.length).toBe(3);
  })

  it('should find a user',()=>{
      var searchID = users.getUser('3');
      // console.log("asdasdasd",searchID);
      expect(searchID.name).toBe('kaml');
  })

  it('should not find a user',()=>{
    var searchID = users.getUser('454');
    // console.log("asdasdasd",searchID);
    expect(searchID).toBe(undefined);
  })


})
