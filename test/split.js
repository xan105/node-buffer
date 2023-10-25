import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { split, splitIntoChuncks, indexOfNthOccurrence } from "../lib/index.js";

const splitStringRep = (buffer, seperator) => buffer.toString("hex")
                                              .split(seperator.toString("hex"))
                                              .filter(elem => elem.length > 0)
                                              .map(elem => Buffer.from(elem,"hex"));

test('normal', () => { 

const buffer = Buffer.from("0000ABCD0001ABCD0002",'hex');
const expected = [Buffer.from("0000", "hex"), Buffer.from("0001", "hex"), Buffer.from("0002", "hex")]; 
const chuncks = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : false });
const chuncksString = splitStringRep(buffer, Buffer.from("ABCD",'hex'));

assert.deepEqual(chuncks, expected);
assert.deepEqual(chuncks, chuncksString, "same behavior as split string representation");
});

test('separator at start', () => { 

const buffer = Buffer.from("ABCD0001ABCD0002",'hex');
const expected = [Buffer.from("0001", "hex"), Buffer.from("0002", "hex")]; 
const chuncks = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : false });
const chuncksString = splitStringRep(buffer, Buffer.from("ABCD",'hex'));
assert.deepEqual(chuncks, expected);
assert.deepEqual(chuncks, chuncksString, "same behavior as split string representation");

const expected2 = [Buffer.from("ABCD0001", "hex"), Buffer.from("ABCD0002", "hex")];
const chuncks2 = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : true });
assert.deepEqual(chuncks2, expected2);

});

test('separator at end', () => { 

const buffer = Buffer.from("0001ABCD0002ABCD",'hex');
const expected = [Buffer.from("0001", "hex"), Buffer.from("0002", "hex")]; 
const chuncks = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : false });
const chuncksString = splitStringRep(buffer, Buffer.from("ABCD",'hex'));
assert.deepEqual(chuncks, expected);
assert.deepEqual(chuncks, chuncksString, "same behavior as split string representation");

const expected2 = [Buffer.from("0001","hex"), Buffer.from("ABCD0002", "hex"), Buffer.from("ABCD", "hex")];
const chuncks2 = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : true });
assert.deepEqual(chuncks2, expected2);

});

test('separator at start and end', () => { 

const buffer = Buffer.from("ABCD0001ABCD0002ABCD",'hex');
const expected = [Buffer.from("0001", "hex"), Buffer.from("0002", "hex")]; 
const chuncks = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : false });
const chuncksString = splitStringRep(buffer, Buffer.from("ABCD",'hex'));
assert.deepEqual(chuncks, expected);
assert.deepEqual(chuncks, chuncksString, "same behavior as split string representation");

const expected2 = [Buffer.from("ABCD0001","hex"), Buffer.from("ABCD0002", "hex"), Buffer.from("ABCD", "hex")];
const chuncks2 = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : true });
assert.deepEqual(chuncks2, expected2);

});

test('separator does not appear', () => { 

const buffer = Buffer.from("ABCD0001ABCD0002ABCD",'hex');

const chuncks = split(buffer, Buffer.from("ABEF",'hex'), { includeSeparator : false });
const chuncksString = splitStringRep(buffer, Buffer.from("ABEF",'hex'));
assert.deepEqual(chuncks[0], buffer);
assert.deepEqual(chuncks, chuncksString, "same behavior as split string representation");

const chuncks2 = split(buffer, Buffer.from("ABEF",'hex'), { includeSeparator : true });
assert.deepEqual(chuncks2[0], buffer);

});

test('empty separator', () => { 

const buffer = Buffer.from("ABCD0001ABCD0002ABCD",'hex');

const chuncks = split(buffer, Buffer.from("",'hex'), { includeSeparator : false });
assert.equal(chuncks.length, buffer.length);
assert.deepEqual(Buffer.concat(chuncks), buffer);

const chuncks2 = split(buffer, Buffer.from("",'hex'), { includeSeparator : true });
assert.equal(chuncks2.length, buffer.length);
assert.deepEqual(Buffer.concat(chuncks2), buffer);

});

test('multiple separator + indexOfNthOccurrence', async () => { 

const separators = [ Buffer.from('0400000050','hex'), Buffer.from('0600000060','hex') ];
const buffer = await readFile(path.resolve("./test/sample/NPWR11866_00/TROPUSR.DAT"))

const headerEndPos = indexOfNthOccurrence(buffer, separators[0], 2) + separators[0].length;
assert.equal(headerEndPos, 120);

const data = buffer.subarray(headerEndPos);
const stats = split(data, separators);
assert.equal(stats.length % 2, 0);
const length = stats.length / 2;
assert.equal(length, 49);

});

test('split into chuncks', async () => { 

const length = 24;
const buffer = await readFile(path.resolve("./test/sample/21690/stats.bin"));
const header = buffer.subarray(0, 4);

const stats = splitIntoChuncks(buffer.subarray(header.length, buffer.length), length);
const expectedStatsCount = header.readInt32LE();
assert.equal(stats.length, expectedStatsCount);

});