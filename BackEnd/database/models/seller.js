var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sellerSchema = new Schema({
	title: { type: String, required: true },
	userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	location: {
		longtitude: {type: String , required: true },
		latitude: { type: String, required: true }		
	},
	address: {
		country: { type: String, required: true },
		city: { type: String, required: true },
		street: { type: String, required: true }
	}
});

sellerSchema.methods.toSellerObject = function(){
	var object = {
		id: this.id,
		title: this.title,
		userId: this.userId,
		location: this.location,
		address: this.address
	}
	
	return object;
}

module.exports = mongoose.model('Seller', sellerSchema);