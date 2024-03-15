import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import crypto from 'crypto'

const userSchema = new Schema({
    fullName: {
        type: 'String',
        required: [true, 'Name is required'],
        minLength: [5, 'Name must be at least 5 character'],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please fill in a valid email address',
        ]
    },    
    password: {
        type: 'String',
        required: [true, 'Password must be at least 8 characters'],
        select: false,
    },
    avatar: {
        public_id: {
            type: 'String',
        },
        secure_url: {
            type: 'String'
        }
    },
    role: {
        type: 'String',
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    forgetPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription: {
        id: String,
        status: String
    }
}, { timestamps: true });

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods = {
    generateJWTToken: async function(){
        return await jwt.sign(
            {
                id: this._id,
                email: this.email,
                subscription: this.subscription,
                role: this.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    },
    // Something is wrong in this function, I am not using it
    comparePassword: async function(plaintextPassword){
        return await bcrypt.compare(plaintextPassword, this.password);
    },
    generatePasswordResetToken: async () => {
        const resetToken = await crypto.randomBytes(20).toString('hex');
        this.forgetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')
        ;
        this.forgotPasswordExpiry = Date.now() + 15*60*1000; //15min
    }
}
const User = model('User', userSchema);

export default User;