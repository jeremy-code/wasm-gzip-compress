import assert from "node:assert";
import { gzip as compressedGzip } from "./compressed.ts";
// import { gzip as uncompressedGzip } from "./uncompressed.ts";

const bytes = new TextEncoder().encode("Hello world!");

const compressedOutput = await compressedGzip(bytes).then((data) =>
  data.toBase64(),
);

// const uncompressedOutput = await uncompressedGzip(bytes).then((data) =>
//   data.toBase64(),
// );

const expectedOutput = "H4sIAAAAAAAAA/NIzcnJVyjPL8pJUQQAlRmFGwwAAAA=";

console.assert(
  compressedOutput === expectedOutput,
  "Failed: compressed.ts had incorrect output",
);
// console.assert(
//   uncompressedOutput === expectedOutput,
//   "Failed: uncompressed.ts had incorrect output",
// );
