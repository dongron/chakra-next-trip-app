import { NextResponse } from 'next/server';

import tripRaw from '../../../../__mocks__/single-trip.json';

// id based on https://nextjs.org/docs/app/api-reference/file-conventions/route#context-optional
export const GET = (
  request: Request,
  context?: { params?: { id?: string } }
) => {
  const tripOriginal = structuredClone(tripRaw);
  const id = context?.params?.id;

  if (!id) {
    return new NextResponse('Not found', { status: 404 });
  }
  try {
    const trip = tripOriginal;
    if (!trip) return new NextResponse('Not found', { status: 404 });
    return NextResponse.json(
      {
        trip,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
