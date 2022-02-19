import t from 'tap';
import path from "node:path";
import { readFile } from "node:fs/promises";
import { split, splitIntoChuncks, indexOfNthOccurrence } from "../lib/index.js";

const splitStringRep = (buffer, seperator) => buffer.toString("hex")
                                              .split(seperator.toString("hex"))
                                              .filter(elem => elem.length > 0)
                                              .map(elem => Buffer.from(elem,"hex"));

t.test('normal', t => { 

const buffer = Buffer.from("0000ABCD0001ABCD0002",'hex');
const expected = [Buffer.from("0000", "hex"), Buffer.from("0001", "hex"), Buffer.from("0002", "hex")]; 
const chuncks = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : false });
const chuncksString = splitStringRep(buffer, Buffer.from("ABCD",'hex'));

t.same(chuncks, expected);
t.same(chuncks, chuncksString, "same behavior as split string representation");

t.end();
});

t.test('separator at start', t => { 

const buffer = Buffer.from("ABCD0001ABCD0002",'hex');
const expected = [Buffer.from("0001", "hex"), Buffer.from("0002", "hex")]; 
const chuncks = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : false });
const chuncksString = splitStringRep(buffer, Buffer.from("ABCD",'hex'));
t.same(chuncks, expected);
t.same(chuncks, chuncksString, "same behavior as split string representation");

const expected2 = [Buffer.from("ABCD0001", "hex"), Buffer.from("ABCD0002", "hex")];
const chuncks2 = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : true });
t.same(chuncks2, expected2);

t.end();
});

t.test('separator at end', t => { 

const buffer = Buffer.from("0001ABCD0002ABCD",'hex');
const expected = [Buffer.from("0001", "hex"), Buffer.from("0002", "hex")]; 
const chuncks = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : false });
const chuncksString = splitStringRep(buffer, Buffer.from("ABCD",'hex'));
t.same(chuncks, expected);
t.same(chuncks, chuncksString, "same behavior as split string representation");

const expected2 = [Buffer.from("0001","hex"), Buffer.from("ABCD0002", "hex"), Buffer.from("ABCD", "hex")];
const chuncks2 = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : true });
t.same(chuncks2, expected2);

t.end();
});

t.test('separator at start and end', t => { 

const buffer = Buffer.from("ABCD0001ABCD0002ABCD",'hex');
const expected = [Buffer.from("0001", "hex"), Buffer.from("0002", "hex")]; 
const chuncks = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : false });
const chuncksString = splitStringRep(buffer, Buffer.from("ABCD",'hex'));
t.same(chuncks, expected);
t.same(chuncks, chuncksString, "same behavior as split string representation");

const expected2 = [Buffer.from("ABCD0001","hex"), Buffer.from("ABCD0002", "hex"), Buffer.from("ABCD", "hex")];
const chuncks2 = split(buffer, Buffer.from("ABCD",'hex'), { includeSeparator : true });
t.same(chuncks2, expected2);

t.end();
});

t.test('separator does not appear', t => { 

const buffer = Buffer.from("ABCD0001ABCD0002ABCD",'hex');

const chuncks = split(buffer, Buffer.from("ABEF",'hex'), { includeSeparator : false });
const chuncksString = splitStringRep(buffer, Buffer.from("ABEF",'hex'));
t.same(chuncks[0], buffer);
t.same(chuncks, chuncksString, "same behavior as split string representation");

const chuncks2 = split(buffer, Buffer.from("ABEF",'hex'), { includeSeparator : true });
t.same(chuncks2[0], buffer);

t.end();
});

t.test('empty separator', t => { 

const buffer = Buffer.from("ABCD0001ABCD0002ABCD",'hex');

const chuncks = split(buffer, Buffer.from("",'hex'), { includeSeparator : false });
t.equal(chuncks.length, buffer.length);
t.same(Buffer.concat(chuncks), buffer);

const chuncks2 = split(buffer, Buffer.from("",'hex'), { includeSeparator : true });
t.equal(chuncks2.length, buffer.length);
t.same(Buffer.concat(chuncks2), buffer);

t.end();
});

t.test('multiple separator + indexOfNthOccurrence', async t => { 

const separators = [ Buffer.from('0400000050','hex'), Buffer.from('0600000060','hex') ];
const buffer = await readFile(path.resolve("./test/sample/NPWR11866_00/TROPUSR.DAT"))

const headerEndPos = indexOfNthOccurrence(buffer, separators[0], 2) + separators[0].length;
t.equal(headerEndPos, 120);

const data = buffer.subarray(headerEndPos);
const stats = split(data, separators);
t.equal(stats.length % 2, 0);
const length = stats.length / 2;
t.equal(length, 49);

t.end();
});

t.test('split into chuncks', async t => { 

const length = 24;
const buffer = await readFile(path.resolve("./test/sample/21690/stats.bin"));
const header = buffer.subarray(0, 4);

const stats = splitIntoChuncks(buffer.subarray(header.length, buffer.length), length);
const expectedStatsCount = header.readInt32LE();
t.equal(stats.length, expectedStatsCount);

t.end();
});