import {Schema, Document, model} from 'mongoose'

export type User = {
    googleId:string;
    displayName:string;
    firstName:string;
    lastName:string;
    image:string;
    createdAt?:Date
}

export type UserModalDocumentType = User & Document

  
const userSchema = new Schema<UserModalDocumentType>({
    googleId:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

const userModel = model<UserModalDocumentType>('User',userSchema)

export default userModel