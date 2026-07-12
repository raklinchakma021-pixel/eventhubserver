import serverless from "serverless-http";
import app from "../src/app";
import connectDB from "../src/config/db";

let connected = false;

const handler = serverless(app);

export default async (req: any, res: any) => {
  if (!connected) {
    await connectDB();
    connected = true;
  }

  return handler(req, res);
};