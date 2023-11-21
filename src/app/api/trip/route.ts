import { NextResponse } from 'next/server';
import tripsRaw from '../../../../__mocks__/trips.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = (request?: Request) => {
  const tripsOriginal = structuredClone(tripsRaw);
  let cursor: number;
  let cursorIdx = 0;
  let pageSize = 10;
  let nextCursor;
  if (request?.url) {
    const url: URL = new URL(request?.url);
    cursor = parseInt(url?.searchParams?.get('cursor') || '', 10);
    if (cursor) {
      cursorIdx = tripsOriginal.findIndex((item) => item.id === cursor) || 0;
    }

    pageSize = parseInt(url.searchParams?.get('pageSize') || '', 10) || 10;
  }
  try {
    const trips = [...tripsOriginal].splice(cursorIdx, pageSize + 1);
    if (cursorIdx + pageSize < tripsOriginal.length)
      nextCursor = trips.pop()?.id;
    if (!trips) return new NextResponse('Not found', { status: 404 });
    return NextResponse.json(
      {
        trips,
        nextCursor,
        pageSize,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
