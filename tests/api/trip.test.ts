import '@testing-library/jest-dom';
import { describe, expect, it } from '@jest/globals';

describe('Trip API', () => {
  it('get all', () => {
    const price = 5.0;
    const quantity = 2;
    expect(price * quantity).toEqual(10);
  });
});
