var generateMsg = (from,text)=>{
  return {
    from,
    text,
    createdAt: new Date()
  }
};

var generateLocationMessage =(from,lat,lang)=>{
  return {
    from,
    url:`https://www.google.com/maps?q=${lat},${lang}`
  }
};


module.exports = {generateMsg,generateLocationMessage};
