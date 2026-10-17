import { test } from "vitest";

test("test", async ({ bench }) => {
  await bench.compare(
    ...["compressed", "uncompressed"].map((val) => {
      return bench(val, async () => {
        return await import(`./gzip/${val}.ts`).then(({ gzip }) =>
          gzip(crypto.getRandomValues(new Uint8Array(100))),
        );
      });
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
