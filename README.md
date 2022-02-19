About
=====

Additional Buffer manipulation

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

`npm install @xan105/buffer`

API
===

⚠️ This module is only available as an ECMAScript module (ESM)<br />

## Named export

#### `indexOfAny(buffer: Buffer, values: Buffer[], offset?: number): { pos: number, length: number }`

Like `Buffer.indexOf()` but for one or more search values.

Return the same value as `Buffer.indexOf()` and the length of the found value for convenience _(zero if not found)_.

#### `lastIndexOfAny(buffer: Buffer, values: Buffer[], offset?: number): { pos: number, length: number }`

Like `Buffer.lastIndexOf()` but for one or more search values.

Return the same value as `Buffer.lastIndexOf()` and the length of the found value for convenience _(zero if not found)_.

#### `indexOfNthOccurrence(buffer: Buffer, search: Buffer, n: number): number`

Like `Buffer.indexOf()` but find the n-th occurence of the search value.

#### `split(buffer: Buffer, separators: Buffer | Buffer[], option?: obj): Buffer[]`

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

#### `splitIntoChuncks(buffer: Buffer, n: number): Buffer[]`

Divides a Buffer into an array of n-sized chunks.<br />
Throws an error if the given Buffer can not be divided.
