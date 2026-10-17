const baseGzip = async (
  bytes: BufferSource,
  _input: AllowSharedBufferSource,
) => {
  const input =
    ArrayBuffer.isView(_input) ?
      new Uint8Array(_input.buffer, _input.byteOffset, _input.byteLength)
    : new Uint8Array(_input);

  const { instance } = await WebAssembly.instantiate(bytes, {
    env: { emscripten_notify_memory_growth() {} },
  });
  const { memory, gzip_compress, malloc, free } = instance.exports;

  if (
    typeof malloc !== "function" ||
    typeof free !== "function" ||
    memory === undefined ||
    !(memory instanceof WebAssembly.Memory) ||
    typeof gzip_compress !== "function"
  ) {
    throw new Error("How did we end up here?");
  }

  const inputPtr: number = malloc(input.byteLength);
  const capacity = input.byteLength + Math.ceil(input.byteLength / 8) + 128;
  const outputPtr: number = malloc(capacity);

  if (!inputPtr || !outputPtr) {
    if (inputPtr) {
      free(inputPtr);
    }
    if (outputPtr) {
      free(outputPtr);
    }
    throw new Error("Wasm memory allocation failed");
  }

  try {
    new Uint8Array(memory.buffer, inputPtr, input.byteLength).set(input);

    const outputLength: number = gzip_compress(
      inputPtr,
      input.byteLength,
      outputPtr,
      capacity,
    );
    if (outputLength === 0xffffffff) {
      throw new Error("Gzip compression failed or output buffer is too small");
    }
    return new Uint8Array(memory.buffer, outputPtr, outputLength).slice();
  } finally {
    free(inputPtr);
    free(outputPtr);
  }
};

export { baseGzip };
