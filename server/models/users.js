import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true, min: 8},
    friends: {
        type: [String],
        default: []
    },
    occupation: String,
    location: String,
    impressions: {type:Number, default: 0},
    viewedProfile: {type:Number, default: 0},
    selectedFile: {type: String, default: ""}
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

export default User