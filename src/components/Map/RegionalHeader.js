import { Container, NativeSelect, Flex } from '@mantine/core';
import Logo from '../Logo/Logo'

export default function RegionalHeader({ counties, attributes, setCurrentCounty, setCurrentAttribute }) {
  return (
    <>
      <Container fluid h={80} bg="rgb(47, 79, 79)">
        <Flex gap='xl' align="center" >
          <Logo logoWidth={'150px'} />
          <NativeSelect
            label="Selected County"
            placeholder="DVRPC Region (All Counties)"
            onChange={(event) => setCurrentCounty(event.currentTarget.value)}
            data={counties}
          />
          <NativeSelect
            label="Current Attribute"
            placeholder="Total Population"
            onChange={(event) => setCurrentAttribute(event.currentTarget.value)}
            data={attributes}
          />
        </Flex>
      </Container>
    </>
  );
}


