import { test } from "vitest";

test("test", async ({ bench }) => {
  await bench.compare(
    bench("compressed (gzip)", async () => {
      return await import("./compressed.js").then(({ gzip }) =>
        gzip(crypto.getRandomValues(new Uint8Array(100))),
      );
    }),
    bench("uncompressed", async () => {
      return await import("./uncompressed.ts").then(({ gzip }) =>
        gzip(crypto.getRandomValues(new Uint8Array(100))),
      );
    }),
    {
      subtractTimerOverhead: true,
      retainSamples: true,
      warmup: true,
      iterations: 128,
      time: 2000,
    },
  );
});
