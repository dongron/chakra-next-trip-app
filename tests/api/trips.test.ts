/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import { describe, expect, it } from '@jest/globals';

import tripsRaw from '../../__mocks__/trips.json';
import { GET } from '~/app/api/trip/route';

describe('Trips API', () => {
  const tripsOriginal = structuredClone(tripsRaw);
  it('GET returns a successful response with data', async () => {
    const response = await GET();
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toBeDefined();
    expect(responseBody.trips).toBeDefined();
    expect(responseBody.nextCursor).toBeDefined();
    expect(responseBody.trips[0]).toEqual(tripsOriginal[0]);
    expect(responseBody.trips.length).toEqual(10);
    expect(responseBody.nextCursor).toEqual(tripsOriginal[10].id);
  });

  it('GET returns a successful response with paginated data', async () => {
    const cursor = 5;
    const pageSize = 20;
    const response = await GET(
      new Request(
        `${process.env.NEXT_PUBLIC_API_HOST}/?cursor=${cursor}&pageSize=${pageSize}`
      )
    );
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toBeDefined();
    expect(responseBody.trips).toBeDefined();
    expect(responseBody.nextCursor).toBeDefined();
    expect(responseBody.trips[0]).toEqual(tripsOriginal[4]);
    expect(responseBody.trips.length).toEqual(20);
    expect(responseBody.nextCursor).toEqual(tripsOriginal[24].id);
  });

  it('GET returns a successful response with paginated data, return last elements in array', async () => {
    const cursor = 61;
    const pageSize = 10;
    const response = await GET(
      new Request(
        `${process.env.NEXT_PUBLIC_API_HOST}/?cursor=${cursor}&pageSize=${pageSize}`
      )
    );
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toBeDefined();
    expect(responseBody.trips).toBeDefined();
    expect(responseBody.nextCursor).not.toBeDefined();
    expect(responseBody.trips[0]).toEqual(tripsOriginal[60]);
    expect(responseBody.trips.length).toEqual(10);
    expect(responseBody.nextCursor).not.toBeDefined();
  });

  it('GET returns a successful response with paginated data, return last elements with only one element after', async () => {
    const cursor = 66;
    const pageSize = 10;
    const response = await GET(
      new Request(
        `${process.env.NEXT_PUBLIC_API_HOST}/?cursor=${cursor}&pageSize=${pageSize}`
      )
    );
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toBeDefined();
    expect(responseBody.trips).toBeDefined();
    expect(responseBody.nextCursor).not.toBeDefined();
    expect(responseBody.trips[0]).toEqual(tripsOriginal[65]);
    expect(responseBody.trips.length).not.toEqual(10);
    expect(responseBody.trips.length).toEqual(5);
    expect(responseBody.nextCursor).not.toBeDefined();
  });

  it('GET returns a successful response with paginated data, return last elements with size over the elements', async () => {
    const cursor = 60;
    const pageSize = 10;
    const response = await GET(
      new Request(
        `${process.env.NEXT_PUBLIC_API_HOST}/?cursor=${cursor}&pageSize=${pageSize}`
      )
    );
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toBeDefined();
    expect(responseBody.trips).toBeDefined();
    expect(responseBody.nextCursor).toBeDefined();
  });
});
