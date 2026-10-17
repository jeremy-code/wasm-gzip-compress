import { test } from "vitest";

test("uncompressing and decoding compressed Base64 vs. decoding uncompressed Base64", async ({
  bench,
}) => {
  await bench.compare(
    ...Object.entries({
      "compressed (gzip)": "compressed",
      uncompressed: "uncompressed",
    }).map(([key, value]) =>
      bench(key, async () => {
        return await import(`./gzip/${value}.ts`).then(({ gzip }) =>
          gzip(crypto.getRandomValues(new Uint8Array(100))),
        );
      }),
    ),
    {
      subtractTimerOverhead: true,
      retainSamples: true,
      warmup: true,
      iterations: 128,
      time: 2000,
    },
  );
});
