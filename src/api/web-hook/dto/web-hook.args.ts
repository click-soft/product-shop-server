export default interface WebHookArgs {
  createdAt: Date
  secret: string;
  orderId: string;
  status: string;
  transactionKey: string;
}