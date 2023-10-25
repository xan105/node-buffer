declare interface Index {
  pos: number,
  length: number
}

export function indexOfAny(buffer: Buffer | Uint8Array, values: Buffer[] | Uint8Array[], offset?: number): Index;
export function lastIndexOfAny(buffer: Buffer | Uint8Array, values: Buffer[] | Uint8Array[], offset?: number): Index;
export function indexOfNthOccurrence(buffer: Buffer | Uint8Array, search: Buffer | Uint8Array, n: number): number;
export function split(buffer: Buffer | Uint8Array, separators: Buffer | Buffer[] | Uint8Array | Uint8Array[], option?: { includeSeparator?: boolean }): Buffer[] | Uint8Array[];
export function splitIntoChuncks(buffer: Buffer | Uint8Array, n: number): Buffer[] | Uint8Array[];
export function concat(buffers: Buffer[] | Uint8Array[], length?: number) : Uint8Array;