export const appConfig = {
  STORE_ORDER_CONTACT: Number(import.meta.env.VITE_WHATSAPP_NUMBER),
  PAYSTACK_PUBLIC_KEY: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "",
  FLUTTERWAVE_PUBLIC_KEY: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || "",
};
