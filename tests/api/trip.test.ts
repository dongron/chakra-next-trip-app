/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import { describe, expect, it } from '@jest/globals';

import tripRaw from '../../__mocks__/single-trip.json';
import { GET } from '~/app/api/trip/[id].route';

describe('Trip details API', () => {
  const tripOriginal = structuredClone(tripRaw);

  it('GET returns a successful response with data', async () => {
    const tripId = 1;
    const response = await GET(
      new Request(`${process.env.NEXT_PUBLIC_API_HOST}/`),
      { params: { id: String(tripId) } }
    );
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toBeDefined();
    expect(responseBody.trip).toBeDefined();
    expect(responseBody.trip).toEqual(tripOriginal);
  });

  it('GET returns 404 when no id', async () => {
    const response = await GET(
      new Request(`${process.env.NEXT_PUBLIC_API_HOST}/`),
      { params: {} }
    );

    expect(response.status).toBe(404);
  });
});
