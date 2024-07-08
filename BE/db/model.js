const mongoose = require('mongoose');
const { DB_URL } = require("../config");

mongoose.connect(DB_URL)

const userSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true, trim: true, maxLength: 50 },
        lastname: { type: String, required: true, trim: true, maxLength: 50},
        username: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true, minLength: 6, trim: true }
    } 
)

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    balance: { type: Number, required: true }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema)

module.exports = { 
    User,
    Account
}