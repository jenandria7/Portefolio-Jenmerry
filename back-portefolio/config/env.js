import dotenv from "dotenv";
dotenv.config();

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export const env = {
  port: Number(process.env.PORT || 3002),
  ytApiKey: required("YT_API_KEY"),
};
