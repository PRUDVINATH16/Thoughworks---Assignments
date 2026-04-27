export const respond = (res, Ok, code, data, message) => {
  res.json({Ok, code, data, message});
}