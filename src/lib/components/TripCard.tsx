import type { FC } from 'react';
import {
  Card,
  CardBody,
  Text,
  Image,
  Box,
  Heading,
  Button,
} from '@chakra-ui/react';
import MathJax from 'react-mathjax';
import { Trip, TripAdvantage } from '~/types';
import { FaRegStar, FaStar } from 'react-icons/fa';

export type TripCardProps = Trip;

const TripCard: FC<TripCardProps> = ({
  photoUrl,
  title,
  subtitle,
  countries,
  days,
  co2kilograms,
  rating,
  description,
  advantages,
}) => {
  const tex = `{${co2kilograms || 0} \\ kg\\  CO_{2}e}`;

  return (
    <MathJax.Provider>
      <Card>
        <CardBody position="relatiove" padding={4}>
          {/*{JSON.stringify(props)}*/}
          <Image borderRadius="lg" src={photoUrl} />
          <Box
            position="absolute"
            zIndex={2}
            top={4}
            left={4}
            right={4}
            bottom={4}
            bg="rgba(0, 0, 0, 30%)"
            borderRadius="lg"
            align="center"
          >
            <Heading as="h3" size="xl" noOfLines={1} align="center" mt={8}>
              {title}
            </Heading>
            <Text align="center">
              {countries?.length || 0} Countries, {days || 0} days
            </Text>
            <Button colorScheme="blue" size="md" mx="auto">
              Learn more
            </Button>
            <Box display="flex" bg="navy" width="80%" borderRadius="xlg">
              <span>Emissions offset:</span>
              <MathJax.Node formula={tex} />
            </Box>

            <Box>Trip rating </Box>
            <Box display="flex" bg="navy" width="80%" borderRadius="xlg">
              <span>Trip rating</span>
              <span>
                {rating} <FaStar />
              </span>
              <span>{rating}</span>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </MathJax.Provider>
  );
};

export default TripCard;
