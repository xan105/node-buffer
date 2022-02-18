declare interface IResIndexOfAny {
  pos: number,
  length: number
}

export function indexOfAny(buffer: Buffer, values: Buffer[], offset?: number): IResIndexOfAny;
export function lastIndexOfAny(buffer: Buffer, values: Buffer[], offset?: number): IResIndexOfAny;
export function indexOfNthOccurrence(buffer: Buffer, search: Buffer, n: number): number;

declare interface IOptionSplit {
  includeSeparator?: boolean
}

export function split(buffer: Buffer, separators: Buffer | Buffer[], option?: IOptionSplit): Buffer[];
export function splitIntoChuncks(buffer: Buffer, n: number): Buffer[];