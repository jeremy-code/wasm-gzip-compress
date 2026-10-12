const decodeBase64 = (base64String: string): Uint8Array<ArrayBuffer> => {
  if (Uint8Array.fromBase64 !== undefined) {
    return Uint8Array.fromBase64(base64String);
  }

  const data = atob(base64String);
  const bytes = new Uint8Array(data.length);
  for (let index = 0; index < data.length; index++) {
    bytes[index] = data.charCodeAt(index);
  }
  return bytes;
};

export { decodeBase64 };
