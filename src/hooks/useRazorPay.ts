import { CreateRazorpayOrder } from "@/actions/razorpay";
import { useMutation } from "@tanstack/react-query";

const useRazorpay = () => {
  return useMutation({
    mutationFn: async (templateId: string) => {
      const order = await CreateRazorpayOrder(templateId);
      return order;
    },
  });
};

export default useRazorpay;
