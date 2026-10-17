# wasm-gzip-compress

## Benchmarks

Macbook Air M1, Node.js v26.11.1. `{ subtractTimerOverhead: true, retainSamples: true, warmup: true, iterations: 128, time: 2000 }`.

| name         |       hz |    min |     max |   mean |    p75 |    p99 |   p995 |   p999 |    rme | samples |
| ------------ | -------: | -----: | ------: | -----: | -----: | -----: | -----: | -----: | -----: | ------: |
| uncompressed | 2,339.60 | 0.1293 |  4.4304 | 0.8639 | 1.6892 | 2.6778 | 2.9183 | 3.2749 | ±3.57% |    2316 |
| compressed   | 1,744.68 |  0.153 | 33.2852 | 1.1178 | 1.7728 | 3.3732 | 4.2689 | 6.7574 | ±4.81% |    1790 |
