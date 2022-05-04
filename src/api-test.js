export const callSuccessRate = (callback) => {
  callback({
    lastRefreshTime: "2021-12-04 12:35:56",
    totalOfferedCalls: 1000,
    totalConnectedCalls: 100,
    totalAbandonedAtIVR: 10,
    totalAbandonedAtACD: 2,
    successRate: Math.random(100)
  });
};
