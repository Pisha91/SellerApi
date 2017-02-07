var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName : { type: String, required: true }, 
	lastName : { type: String, required: true },
	email : { type: String, required: true, unique: true },
	phone : { type: String },
	createdDate : { type: Date, default: Date.now },
	isSeller : { type: Boolean, required: true },
	sellerIds : [{ type: Schema.Types.ObjectId, ref: 'Seller' }], 
	hashedPassword: { type: String }, 
	salt: { type: String },
	facebookId: { type: String },
	googleId: { type: String },
	vkontakteId: { type: String }
});

userSchema.methods.encryptPassword = function(password){
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

userSchema.methods.checkPassword = function(password){
	return this.hashedPassword = this.encryptPassword(password);
}

userSchema.methods.toUserObject = function(){
	var object = {
		id: this.id,
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		phone: this.phone,
		isSeller: this.isSeller,
		sellerIds: this.sellerIds
	}
	
	return object;
}

userSchema.virtual('password').set(function(password){
	this._plainPassword = password;
	this.salt = crypto.randomBytes(32).toString('base64');
	this.hashedPassword = this.encryptPassword(password);
});

module.exports = mongoose.model('User', userSchema);