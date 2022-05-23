import { InternalServerErrorException } from '@nestjs/common';

export class RingBuffer<T> {
  private buffer: T[] = [];

  constructor(public maxSize: number) {}

  public que(newElement: T) {
    if (this.buffer.length > this.maxSize) {
      throw new InternalServerErrorException('ring buffer full');
    }
    if (this.buffer.length === this.maxSize) {
      this.buffer = [newElement, ...this.buffer.slice(-1)];
    } else {
      this.buffer = [newElement, ...this.buffer];
    }
  }

  public getAll(): T[] {
    return this.buffer;
  }
}

export class RingBufferMap<T, K extends string> {
  private bufferSize: number;
  private map: Record<K, RingBuffer<T>>;

  constructor(bufferSize: number) {
    /* this.map = ringBuffers.reduce((acc, cur) => {
      if (!acc[cur]) {
        return {
          ...acc,
          [cur]: new RingBuffer(bufferSize),
        };
      }
      return acc;
    }, {} as Record<K, RingBuffer<T>>);*/
    this.bufferSize = bufferSize;
    this.map = {} as Record<K, RingBuffer<T>>;
  }

  get(ringBufferName: K): RingBuffer<T> {
    if (this.map[ringBufferName] === undefined) {
      this.map[ringBufferName] = new RingBuffer(this.bufferSize);
    }
    return this.map[ringBufferName];
  }
}
