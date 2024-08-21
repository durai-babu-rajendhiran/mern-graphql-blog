import { connect } from "mongoose";
const mongoURI = 'mongodb://127.0.0.1:27017/graphql'; // Replace 'mydatabase' with your DB name

export const connecttoDatabase = async () => {
    try {
        await connect(mongoURI)
    } catch (err) {
        console.log("DB ER", err)
        return err
    }
}