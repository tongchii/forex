var mongoose = require('mongoose');

var Schema = mongoose.Schema;


/*var Box = new Schema({
  event_name:String,
  booth_name:String,
  or_name:String,
  x :Number,
  y :Number,
  w :Number,
  h :Number,
  status: String
})
*/

/*module.exports = mongoose.model('User',{
        username: String,
    password: String,
    email: String,
    gender: String,
    address: String
}); */

var User = new Schema({
  email: String,
password: String,
status1:Number,
status2:Number,
status3:Number,
status4:Number,
point:Number,
eurusdhigh:Number,
usdjpyhigh:Number,
usdcadhigh:Number,
gbpjpyhigh:Number,
eurusdlow:Number,
usdjpylow:Number,
usdcadlow:Number,
gbpjpylow:Number

})







mongoose.model('User', User, 'User');


// Mongoose connection to MongoDB
const db ="mongodb://tongman4:cartoon@ds119044.mlab.com:19044/tongman4"
mongoose.Promise =  global.Promise;
mongoose.connect(db, function(err){
  if(err){
    console.error("Error! + err");
  }
});
