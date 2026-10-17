const bytes = new TextEncoder().encode("Hello world!");

const compressedOutput = await import("./gzip/uncompressed.ts").then(
  ({ gzip }) => gzip(bytes).then((data) => data.toBase64()),
);

const uncompressedOutput = await import("./gzip/compressed.ts").then(
  ({ gzip }) => gzip(bytes).then((data) => data.toBase64()),
);

const expectedOutput = "H4sIAAAAAAAAA/NIzcnJVyjPL8pJUQQAlRmFGwwAAAA=";

console.assert(
  compressedOutput === expectedOutput,
  "Failed: compressed.ts had incorrect output",
);
console.assert(
  uncompressedOutput === expectedOutput,
  "Failed: uncompressed.ts had incorrect output",
);
