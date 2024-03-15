import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import crypto from 'crypto'

const paymentSchema = new Schema({
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_subscription_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Payment = model('Payment', paymentSchema);

export default Payment;