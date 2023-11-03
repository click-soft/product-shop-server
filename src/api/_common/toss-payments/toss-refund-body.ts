type TossRefundBody = {
  cancelReason: string;
  cancelAmount: number;
  refundReceiveAccount: {
    bank: string;
    accountNumber: string;
    holderName: string;
  };
};

export default TossRefundBody;
