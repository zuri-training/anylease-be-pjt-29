const mongoose = require('mongoose');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const {Schema} = mongoose

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            match: /^[234]\d{12}$/,
            unique: true,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "leaser", "leasee", "not assigned"],
            default: "not assigned"
        },
        hash: String,
        salt: String,
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

UserSchema.methods.getPassword = password => ({
    salt: crypto.randomBytes(16).toString('hex'),
    hash: crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString("hex")
})

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString("hex")
}

UserSchema.methods.validatePassword = function (password) {
    return this.hash === crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString("hex")
}

UserSchema.methods.generateJWT = function () {
    const today = new Date()
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this.id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, 'secret')
}

UserSchema.methods.toAuthJSON = function () {
    return {
        id: this.id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        token: this.generateJWT()
    }
}

module.exports = mongoose.model('User', UserSchema);