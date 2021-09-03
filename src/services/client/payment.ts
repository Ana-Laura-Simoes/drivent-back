import Payment from "@/entities/Payment";

export async function createNewPayment(paymentData: Payment) {
  await Payment.createNew(paymentData);
}
