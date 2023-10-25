/*
Copyright (c) Anthony Beaumont
This source code is licensed under the MIT License
found in the LICENSE file in the root directory of this source tree.
*/

import { 
  shouldUint8Array, 
  shouldArrayOfUint8Array,
  shouldIntegerPositive,
  shouldIntegerPositiveOrZero,
  shouldObj
} from "@xan105/is/assert";
import { isUint8Array } from "@xan105/is";
import { asBoolean } from "@xan105/is/opt";
import { Failure } from "@xan105/error";

function indexOfAny(buffer, values, offset = 0){
  shouldUint8Array(buffer);
  shouldArrayOfUint8Array(values);
  shouldIntegerPositiveOrZero(offset);

  for (const value of values)
  {
    const pos = buffer.indexOf(value, offset);
    if (pos > -1) return { pos: pos, length: value.length }
  }
  return { pos: -1, length: 0 }
}

function lastIndexOfAny(buffer, values, offset = 0){

  shouldUint8Array(buffer);
  shouldArrayOfUint8Array(values);
  shouldIntegerPositiveOrZero(offset);

  for (const value of values)
  {
    const pos = buffer.lastIndexOf(value, offset);
    if (pos > -1) return { pos: pos, length: value.length }
  }
  return { pos: -1, length: 0 }
}

function indexOfNthOccurrence(buffer, search, n) {
    
  shouldUint8Array(buffer);
  shouldUint8Array(search);
  shouldIntegerPositive(n);
    
  let i = -1;

  while (n-- && i++ < buffer.length) 
  {
    i = buffer.indexOf(search, i);
    if (i < 0) break;
  }
    
  return i;
}

function split(buffer, separators, option = {}){

  shouldUint8Array(buffer);
  if (isUint8Array(separators)) separators = [separators];
  shouldArrayOfUint8Array(separators);
  
  shouldObj(option);
  const options = {
    includeSeparator: asBoolean(option.includeSeparator) ?? false
  };
  
  const result = [];

  let pos = -1, prev = 0;

  while (pos++ < buffer.length) 
  {
    const found = indexOfAny(buffer, separators, pos);
    pos = found.pos >= 0 ? found.pos : buffer.length;
    const chunck = buffer.subarray(prev, pos);
    prev = options.includeSeparator ? pos : pos + found.length;
    if (chunck.length > 0) result.push(chunck);
  }
  
  return result;
} 

function splitIntoChuncks(buffer, n){

  shouldUint8Array(buffer);
  shouldIntegerPositive(n);

  if (buffer.length % n !== 0)
    throw new Failure(`Given Uint8Array can not be divided into chuncks of ${n} sized length`, 1);

  const result = [];
  for (let i = 0, j = 1; i < buffer.length; i += n, j++) 
    result.push(buffer.subarray(i, n*j));
    
  return result;
}

function concat(buffers, length) {

  shouldArrayOfUint8Array(buffers);
  if (buffers.length === 0) return new Uint8Array(0);
  
  length ??= buffers.reduce((acc, cur) => acc + cur.length, 0);
  shouldIntegerPositiveOrZero(length);

  const result = new Uint8Array(length);

  let offset = 0;
  for (const buffer of buffers) {
    result.set(buffer, offset);
    offset += buffer.length;
  }

  return result;
}

export {
  indexOfAny,
  lastIndexOfAny,
  indexOfNthOccurrence,
  split,
  splitIntoChuncks,
  concat
}