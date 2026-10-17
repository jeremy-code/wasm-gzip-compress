#include <emscripten.h>
#include <stddef.h>
#include <stdint.h>
#include <zlib.h>

#define GZIP_ERROR 0xffffffffu

EMSCRIPTEN_KEEPALIVE
uint32_t gzip_compress(uint32_t input_ptr, uint32_t input_len,
                       uint32_t output_ptr, uint32_t output_capacity) {
  z_stream stream = {0};

  if (deflateInit2(&stream, Z_DEFAULT_COMPRESSION, Z_DEFLATED,
                   MAX_WBITS + 16, // Gzip format
                   MAX_MEM_LEVEL, Z_DEFAULT_STRATEGY) != Z_OK) {
    return GZIP_ERROR;
  }

  stream.next_in = (Bytef *)(uintptr_t)input_ptr;
  stream.avail_in = input_len;
  stream.next_out = (Bytef *)(uintptr_t)output_ptr;
  stream.avail_out = output_capacity;

  int result = deflate(&stream, /* flush */ Z_FINISH);
  uint32_t output_len = GZIP_ERROR;

  if (result == Z_STREAM_END) {
    output_len = (uint32_t)stream.total_out;
  }

  deflateEnd(&stream);
  return output_len;
}
