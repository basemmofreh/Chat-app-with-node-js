class Users {
  constructor(){
    this.users = [];
  }

  addUsers(id,name,room){
      var user = {id,name,room};
      this.users.push(user);
      return user;
  }

  showExistUser(name){
      var search = this.users.filter((user)=>user.name===name);
      return search[0];
  }
  removeUser(id){
    var remID = this.getUser(id);
    if(remID)
     {
        this.users = this.users.filter((remID)=>remID.id!=id);
      }
    return remID;
  }

  getUser(id){
    return this.users.filter((user)=>user.id===id)[0];

  }
  getUserList(room){
      var users = this.users.filter((user)=>user.room === room);
      var namesArray = users.map((user)=>{
        return user.name;
      })
      return namesArray;
  }

  getActiveRooms(){
    var rooms = this.users.map((user)=>{
      return user.room;
    })
    return rooms;
  }
}


module.exports = {Users};
