var  bcrypt = require('bcrypt-nodejs'),
	 mongoose = require('mongoose');
     SALT_WORK_FACTOR = 10;
exports.mongoose = mongoose;

var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/test';

var mongoOptions = { db: { safe: true }};

mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + uristring);
  }
});

//******* Database schema TODO add more validation
var Schema = mongoose.Schema, 
    ObjectId = Schema.ObjectId;


var userSchema = new Schema({
  username: String, 
  email:  String, 
  password:  String, 
  securityq: Number, 
  securityanswer: String
   }, 
  { collection: 'users'}
);



userSchema.pre('save', function(next) {
        var user = this;

        if(!user.isModified('password')) return next();

        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                if(err) return next(err);

                bcrypt.hash(user.password, salt, function(err, hash) {
                        if(err) return next(err);
                        user.password = hash;
                        next();
                });
        });
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
                if(err) return cb(err);
                cb(null, isMatch);
        });
};


// Export user model
module.exports = mongoose.model('User', userSchema);;