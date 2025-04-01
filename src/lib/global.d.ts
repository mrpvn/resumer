interface RazorpayOptions {
  key: string; // Your Razorpay key
  amount: number; // Amount in smallest currency unit
  currency: string; // Currency code, e.g., 'INR'
  name?: string; // Optional: Name of your company
  description?: string; // Optional: Description of the payment
  image?: string; // Optional: Logo URL
  order_id?: string; // Optional: Order ID for the payment
  prefill?: {
    name?: string; // Optional: Customer name
    email?: string; // Optional: Customer email
  };
  notes?: { [key: string]: string }; // Optional: Additional notes
  theme?: { color?: string }; // Optional: Theme color
}

declare global {
  interface Window {
    Razorpay: {
      new (options: RazorpayOptions): {
        open: () => void; // Method to open the Razorpay payment modal
        close: () => void; // Method to close the Razorpay payment modal
      };
    };
  }
}

// This line is necessary to make the file a module
export {};
