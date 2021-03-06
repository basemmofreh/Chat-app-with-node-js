const moment = require('moment');
var generateMsg = (from,text)=>{
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
};

var generateLocationMessage =(from,lat,lang)=>{
  return {
    from,
    url:`https://www.google.com/maps?q=${lat},${lang}`,
    createdAt: moment().valueOf()

  }
};


module.exports = {generateMsg,generateLocationMessage};
