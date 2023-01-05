const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const MinecraftPlugin = require('./plugin.model')

const PurchasedPlugin = new mongoose.Schema({
    plugin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MinecraftPlugin'
    },
},
    {timestamps: true}
);

const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: [true, "User name is required."],
        minlength: [2, "User name must be at least 2 characters long!"]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test (val),
            message: 'Please enter a valid email',
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be 8 characters or longer'],
    },
    admin: {
        type: Boolean
    },
    uploadedPlugins: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'MinecraftPlugin'
    },
    purchasedPlugins: {
        type: [PurchasedPlugin],
    }
    },

    {timestamps: true}
);




UserSchema.virtual('confirm')
    .get( () => this._confirm)
    .set( value => this._confirm = value);

UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirm) {
        console.log(this.password, this._confirm)
        this.invalidate('confirm', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', UserSchema);