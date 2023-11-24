'use client';

import type { Trip } from '~/types';

import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TripCard from '~/lib/components/TripCard';

const getTrips = async ({
  cursor,
  pageSize,
}: {
  cursor: number | string;
  pageSize: number;
}) => {
  const searchParams = new URLSearchParams({
    cursor: String(cursor),
    pageSize: String(pageSize),
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/trip?${searchParams.toString()}`,
    {
      cache: 'force-cache',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

type TripsType = {
  trips: Trip[];
  nextCursor: number;
  pageSize: number;
};

const tripsInitialState = {
  trips: [],
  nextCursor: 0,
  pageSize: 6,
};

const Home = () => {
  const [trips, setTrips] = useState<TripsType>(tripsInitialState);

  const loadTrips = async ({ currentTrips }: { currentTrips: TripsType }) => {
    const cursor = currentTrips.nextCursor;
    const pageSize = currentTrips.pageSize || 10;
    const data = await getTrips({
      cursor,
      pageSize,
    });
    setTrips((prevState) => {
      return {
        trips: prevState.trips.concat(data.trips),
        pageSize: data.pageSize,
        nextCursor: data.nextCursor,
      };
    });
  };

  useEffect(() => {
    loadTrips({ currentTrips: tripsInitialState });
  }, []);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} spacing="40px">
        {trips.trips.map((trip) => (
          <TripCard key={trip.id} {...trips.trips[0]} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Home;
