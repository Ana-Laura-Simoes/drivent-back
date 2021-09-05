import Payment from "@/entities/Payment";

export async function createNewPayment(paymentData: Payment) {
  await Payment.createNew(paymentData);
}

export async function getPayment(userId: number) {
  return await Payment.getPayment(userId);
}
