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

export class RingBufferMap<T> {
  private map: Record<string, RingBuffer<T>> = {};

  constructor(ringBuffers: string[], bufferSize: number) {
    this.map = ringBuffers.reduce((acc, cur) => {
      if (!acc[cur]) {
        return {
          ...acc,
          [cur]: new RingBuffer(bufferSize),
        };
      }
      return acc;
    }, {} as Record<string, RingBuffer<T>>);
  }

  get(ringBufferName: string): RingBuffer<T> {
    if (this.map[ringBufferName] === undefined) {
      throw new InternalServerErrorException(
        `ring buffer ${ringBufferName} does not exist`,
      );
    }
    return this.map[ringBufferName];
  }
}
