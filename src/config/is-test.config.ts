export const getTossPaymentsSecretKey = (isTest: boolean) => {
  return isTest ? process.env.TOSS_PAYMENTS_TEST_SECRET_KEY : process.env.TOSS_PAYMENTS_SECRET_KEY;
}