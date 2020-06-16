import {Schema, Document, model} from 'mongoose';
import User from '../interfaces/user.interface';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export default model<User & Document>('user', userSchema);
