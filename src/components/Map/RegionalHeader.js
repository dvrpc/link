import { Container, NativeSelect, Flex } from '@mantine/core';
import Logo from '../Logo/Logo'

const attributeDisplayNames = {
  total_pop: 'Total Population',
  disabled: 'Disabled',
  ethnic_minority: 'Ethnic Minority',
  female: 'Female',
  foreign_born: 'Foreign Born',
  lep: 'Limited English Proficiency',
  low_income: 'Low Income',
  older_adult: 'Older Adult',
  racial_minority: 'Racial Minority',
  youth: 'Youth',
  total_jobs: 'Total Jobs'
};


export default function RegionalHeader({ counties, attributes, setCurrentCounty, setCurrentAttribute }) {
  const attributeOptions = attributes.map(attr => ({
    value: attr,
    label: attributeDisplayNames[attr] || attr
  }));

  return (
    <>
      <Container fluid h={80} bg="rgb(47, 79, 79)">
        <Flex gap='xl' align="center">
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
            data={attributeOptions}
          />
        </Flex>
      </Container>
    </>
  );
}
