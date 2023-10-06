import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
        unique: true,
        required: true,
    },
    email:{
        type: 'string',
        unique: true,
        required: true,
    },
    password:{
        type: 'string',
        required: true,
    }
},
{ timestamps: true  }
)


//If the User collection does not exist create a new one.
export default mongoose.models.User || mongoose.model("User", userSchema);