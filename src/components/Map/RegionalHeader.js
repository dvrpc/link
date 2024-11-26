import { Tooltip, Container, NativeSelect, Flex, Button } from '@mantine/core';
import Logo from '../Logo/Logo'
import Draft from '../Logo/Draft'
import ModalRegional from './ModalRegional'
import Disclaimer from '../Header/Disclaimer'

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
  total_jobs: 'Total Jobs',
  miles: 'Miles of low-stress island connected'
};


export default function RegionalHeader({ counties, attributes, setCurrentCounty, setCurrentAttribute }) {
  const attributeOptions = attributes.map(attr => ({
    value: attr,
    label: attributeDisplayNames[attr] || attr
  }));

  return (
    <>
      <Container fluid h={80} bg="rgb(47, 79, 79)">
        <Flex
          bg="rgb(47, 79, 79)"
          mih={80}
          gap="md"
          justify="left"
          align="center"
          direction="row"
          wrap="wrap"
          pl="20px"
        >
          <Draft logoWidth={'140px'} />
          <Logo logoWidth={'150px'} />
          <Tooltip label="Use the interactive LTS analysis">
            <Button component="a"
              href="./">LTS Analysis </Button>
          </Tooltip>
          <ModalRegional />
          <Disclaimer />
          <NativeSelect
            placeholder="DVRPC Region (All Counties)"
            onChange={(event) => setCurrentCounty(event.currentTarget.value)}
            data={counties}
          />
          <NativeSelect
            placeholder="Total Population"
            onChange={(event) => setCurrentAttribute(event.currentTarget.value)}
            data={attributeOptions}
          />
        </Flex>
      </Container>
    </>
  );
}
