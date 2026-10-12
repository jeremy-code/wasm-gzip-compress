import { describe, expect, test } from "vitest";

import { gzip as compressedGzip } from "./compressed.js";
import { gzip as uncompressedGzip } from "./uncompressed.js";

test("test", async ({ bench }) => {
  await bench.compare(
    bench("uncompressed", async () => {
      return await uncompressedGzip(
        crypto.getRandomValues(new Uint8Array(100)),
      );
    }),
    bench("compressed (gzip)", async () => {
      return await compressedGzip(crypto.getRandomValues(new Uint8Array(100)));
    }),
    {
      subtractTimerOverhead: true,
      retainSamples: true,
      warmup: true,
    },
  );
});
