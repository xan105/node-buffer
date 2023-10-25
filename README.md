About
=====

Additional Buffer|Uint8Array manipulation

📦 Scoped `@xan105` packages are for my own personal use but feel free to use them.

Example
=======

```js

import { split } from "@xan105/buffer";

const buffer = Buffer.from("ABCD0001ABCD0002", "hex");
const chuncks = split(buffer, Buffer.from("ABCD", "hex"));
//[ <Buffer 00 01>, <Buffer 00 02> ]
const chuncks = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : true });
//[ <Buffer ab cd 00 01>, <Buffer ab cd 00 02> ]
```

Install
=======

```
npm install @xan105/buffer
```

API
===

⚠️ This module is only available as an ECMAScript module (ESM)<br />

## Named export

#### `indexOfAny(buffer: Buffer | Uint8Array, values: Buffer[] | Uint8Array[], offset?: number): { pos: number, length: number }`

Like `Buffer.indexOf()` but for one or more search values.

Return the same value as `Buffer.indexOf()` and the length of the found value for convenience _(zero if not found)_.

#### `lastIndexOfAny(buffer: Buffer | Uint8Array, values: Buffer[] | Uint8Array[], offset?: number): { pos: number, length: number }`

Like `Buffer.lastIndexOf()` but for one or more search values.

Return the same value as `Buffer.lastIndexOf()` and the length of the found value for convenience _(zero if not found)_.

#### `indexOfNthOccurrence(buffer: Buffer | Uint8Array, search: Buffer | Uint8Array, n: number): number`

Like `Buffer.indexOf()` but find the n-th occurence of the search value.

#### `split(buffer: Buffer | Uint8Array, separators: Buffer | Buffer[] | Uint8Array | Uint8Array[], option?: object): Buffer[] | Uint8Array[]`

Divides a Buffer into an array of Buffer; split at each point where the separator occurs in the given Buffer.<br />
This is _somehow similar_ to `String.split()` but for Buffer.

|option|default|description|
|------|-------|-----------|
|includeSeparator|false|whether to keep the separator or not when splitting|

When found, separator is removed from the Buffer unless `includeSeparator` is true.

If separator appears at the beginning or end of the Buffer, it still has the effect of splitting.<br />
The result is an empty Buffer _(i.e. zero length)_, but it will be omitted from the returned array.

If separator does not occur in the Buffer, the returned array contains one element consisting of the entire Buffer.

if separator is an empty Buffer _(i.e. zero length)_ then the returned array will be of buffer.length and contains every bytes whether `includeSeparator` is true or false.

If there are more than one separator, they are tested in the given order.

#### `splitIntoChuncks(buffer: Buffer | Uint8Array, n: number): Buffer[] | Uint8Array[]`

Divides a Buffer into an array of n-sized chunks.<br />
Throws an error if the given Buffer can not be divided.

### `concat(buffers: Buffer[] | Uint8Array[], length?: number) : Uint8Array`

Like Buffer.concat() but for Uint8Array.

Returns a new Uint8Array which is the result of concatenating the given Uint8Arrays together.<br />
if length is 0, then a new zero-length Uint8Array is returned.<br />
If length is not provided, it is calculated from the given Uint8Arrays.<br />
If length is provided and the combined length of the given Uint8Arrays exceeds length, the result is truncated to length.<br />