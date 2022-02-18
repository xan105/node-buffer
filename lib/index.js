import { 
  shouldBuffer, 
  shouldIntegerPositive,
  shouldIntegerPositiveOrZero,
  shouldArrayOfBuffer
} from "@xan105/is/assert";
import { isBuffer } from "@xan105/is";
import { Failure } from "@xan105/error";

function indexOfAny(buffer, values, offset = 0){

  shouldBuffer(buffer);
  shouldArrayOfBuffer(values);
  shouldIntegerPositiveOrZero(offset);

  for (const value of values)
  {
    const pos = buffer.indexOf(value, offset);
    if (pos > -1) return { pos: pos, length: value.length }
  }
  return { pos: -1, length: 0 }
}

function lastIndexOfAny(buffer, values, offset = 0){

  shouldBuffer(buffer);
  shouldArrayOfBuffer(values);
  shouldIntegerPositiveOrZero(offset);

  for (const value of values)
  {
    const pos = buffer.lastIndexOf(value, offset);
    if (pos > -1) return { pos: pos, length: value.length }
  }
  return { pos: -1, length: 0 }
}

function indexOfNthOccurrence(buffer, search, n) {
    
  shouldBuffer(buffer);
  shouldBuffer(search);
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

  shouldBuffer(buffer);
  if (isBuffer(separators)) separators = [separators];
  shouldArrayOfBuffer(separators);
  
  const options = {
    includeSeparator: option.includeSeparator || false
  };
  
  let result = [];

  let pos = -1;
  let prev = 0;

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

  shouldBuffer(buffer);
  shouldIntegerPositive(n);

  if (buffer.length % n !== 0)
    throw new Failure(`Given buffer can not be divided into chuncks of ${n} sized length`, 1);

  let result = [];
  for (let i = 0, j = 1; i < buffer.length; i += n, j++) 
    result.push(buffer.subarray(i, n*j));
  return result;
}

export {
  indexOfAny,
  lastIndexOfAny,
  indexOfNthOccurrence,
  split,
  splitIntoChuncks
}