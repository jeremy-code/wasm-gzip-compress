const uncompress = (val: BufferSource): Promise<Uint8Array<ArrayBuffer>> => {
  return (
    new Response(
      new Blob([val]).stream().pipeThrough(new DecompressionStream("gzip")),
    )
      // Response.arrayBuffer has better support (baseline March 2017) compard to
      // Response.bytes (baseline January 2025)
      .arrayBuffer()
      .then((arrayBuffer) => new Uint8Array(arrayBuffer))
  );
};

export { uncompress };
