import { configDotenv } from "dotenv";
const process = configDotenv()

export const appConfig = {
  STORE_ORDER_CONTACT: Number(process.env.WHATSAPP_NUMBER),
  PAYSTACK_PUBLIC_KEY: String(process.env.PAYSTACK_PUBLIC_KEY),
  FLUTTERWAVE_PUBLIC_KEY: String(process.env.FLUTTERWAVE_PUBLIC_KEY)
};
