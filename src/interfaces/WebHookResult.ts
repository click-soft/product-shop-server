export default interface WebHookResult {
  createdAt: Date
  secret: string;
  orderId: string;
  status: string;
  transactionKey: string;
}