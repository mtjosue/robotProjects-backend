import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const link = await mongoose.connect(process.env.MONGO_CONNECTION_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(
      `:D Connected to MongoDB Server : ${link.connection.host}`.cyan
    );
  } catch (error) {
    console.error(`Error : ${error.message}`.red);
    process.exit(1);
  }
};

export default connectDB;
