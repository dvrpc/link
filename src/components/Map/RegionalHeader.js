import { Container, Select, Flex } from '@mantine/core';
import Logo from '../Logo/Logo'

export default function RegionalHeader({ counties, attributes }) {
  return (
    <>
      <Container fluid h={80} bg="rgb(47, 79, 79)">
        <Flex gap='xl' align="center" >
          <Logo logoWidth={'150px'} />
          <Select
            label="Selected County"
            placeholder="DVRPC Region (All Counties)"
            data={counties}
          />
          <Select
            label="Current Attribute"
            placeholder="Total Population"
            data={attributes}
          />
        </Flex>
      </Container>
    </>
  );
}


