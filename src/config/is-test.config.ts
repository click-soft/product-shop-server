export const getTossPaymentsSecretKey = (isTest: boolean) => {
  return isTest
    ? process.env.TOSS_PAYMENTS_TEST_SECRET_KEY
    : process.env.TOSS_PAYMENTS_SECRET_KEY;
};

export const getTestCode = (isTest: boolean): number | undefined => {
  const sk = getTossPaymentsSecretKey(isTest);

  if (sk.startsWith('test_sk')) return 1;
  if (sk.startsWith('test_gsk')) return 2;
};
