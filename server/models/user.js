var mongoose = require('mongoose')

var UserScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
}
});

var User = mongoose.model("User", UserScheme)

module.exports = {User};
