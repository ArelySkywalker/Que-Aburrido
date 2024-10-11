import { cleanEnv, port, str } from "envalid";

const env = () => {
  return cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    SESSION_SECRET: str(),
  });
};

export default env;
