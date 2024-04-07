export const analyzeRes = (response: { data: any; err: string }) => {
  const { data, err } = response;
  if (!err) {
    return data;
  }
  throw new Error(err);
};

export function ellipseAddress(address: string, maxlength: number = 16, sliceLength: number = 8) {
  if (address && address.length > maxlength) {
    return address.substring(0, sliceLength) + '...' + address.substring(address.length - sliceLength);
  } else {
    return address;
  }
}
