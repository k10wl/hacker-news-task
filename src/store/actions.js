export const addData = (payload) => ({
  type: "ADD_DATA",
  payload: {
    target: payload.target,
    data: payload.data,
  },
});
