import { useMemo } from 'react';

export const useColumns = () => useMemo(() => [
  { accessorKey: 'username', header: 'Username' },
  { accessorKey: 'seg_name', header: 'Segment Name' },
  { accessorKey: 'has_isochrone', header: 'Has Isochrone', cell: info => info.value ? 'Yes' : 'No' },
  { accessorKey: 'miles', header: 'Miles' },
  { accessorKey: 'total_pop', header: 'Total Population' },
  { accessorKey: 'disabled', header: 'Disabled Individuals' },
  { accessorKey: 'ethnic_minority', header: 'Ethnic Minorities' },
  { accessorKey: 'female', header: 'Female' },
  { accessorKey: 'foreign_born', header: 'Foreign Born' },
  { accessorKey: 'lep', header: 'Limited English Proficiency (LEP)' },
  { accessorKey: 'low_income', header: 'Low Income' },
  { accessorKey: 'older_adult', header: 'Older Adults' },
  { accessorKey: 'racial_minority', header: 'Racial Minorities' },
  { accessorKey: 'youth', header: 'Youth' },
  // { accessorKey: 'circuit', header: 'Circuit', cell: info => info.value && info.value.length > 0 ? info.value.join(', ') : 'N/A' },
  { accessorKey: 'total_jobs', header: 'Total Jobs' },
  {
    accessorKey: 'bikeCrashesMessage',
    header: 'Bike Crashes',
    cell: info => info.value
  },
  {
    accessorKey: 'pedCrashesMessage',
    header: 'Pedestrian Crashes',
    cell: info => info.value
  },
  // { accessorKey: 'essential_services', header: 'Essential Services', 
  //   cell: info => info.value && info.value.length > 0 
  //     ? info.value.map(service => `${service.count} x ${service.type}`).join(', ')
  //     : 'No Services'
  // },
  // { accessorKey: 'rail_stations', header: 'Rail Stations', cell: info => info.value && info.value.length > 0 ? info.value.join(', ') : 'None' },
  { accessorKey: 'shared', header: 'Shared', cell: info => info.value ? 'Yes' : 'No' },
], []);
