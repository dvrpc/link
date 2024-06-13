import { useMemo } from 'react';
import { Switch, Anchor } from '@mantine/core';

export const useColumns = (handleSwitchChange, connectionType) => useMemo(() => [
  {
    header: 'Shared',
    accessorKey: 'shared',
    Cell: ({ cell }) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Switch
          checked={cell.row.original.shared}
          onChange={() => handleSwitchChange(cell.row.index, cell.row.original)}
          color="green"
          labelPosition="left"
          label={
            cell.row.original.shared == true ? (
              <Anchor href={`/webmaps/link/user/${cell.row.original.username}/${connectionType === "bike" ? "lts" : "sidewalk"}/study/${cell.row.original.seg_name}`} target="_blank" rel="noopener noreferrer" >
                Sharable Link
              </Anchor>
            ) : (
              'Make study public'
            )
          }
        />
      </div>
    ),
  },
  { accessorKey: 'username', header: 'Username' },
  { accessorKey: 'seg_name', header: 'Segment Name' },
  {
    accessorKey: 'miles', header: 'Miles',
    Cell: ({ cell }) =>
      cell.getValue().toLocaleString('en-US', {
      }),
  },
  {
    accessorKey: 'has_isochrone', header: 'Island > 300 Miles',
    Cell: ({ cell }) =>
      cell.getValue() === true ? 'Yes' : 'No',
  },
  {
    accessorKey: 'total_pop', header: 'Total Population',
    Cell: ({ cell }) =>
      cell.getValue().toLocaleString('en-US', {
      }),
  },
  {
    accessorKey: 'disabled', header: 'Disabled Individuals',
    Cell: ({ cell }) =>
      cell.getValue().toLocaleString('en-US', {
      }),
  },
  {
    accessorKey: 'ethnic_minority', header: 'Ethnic Minorities',
    Cell: ({ cell }) =>
      cell.getValue().toLocaleString('en-US', {
      }),
  },
  {
    accessorKey: 'female', header: 'Female',
    Cell: ({ cell }) =>
      cell.getValue().toLocaleString('en-US', {
      }),
  },
  {
    accessorKey: 'foreign_born', header: 'Foreign Born',
    Cell: ({ cell }) =>
      cell.getValue().toLocaleString('en-US', {
      }),
  },
  {
    accessorKey: 'lep', header: 'Limited English Proficiency (LEP)',
    Cell: ({ cell }) =>
      cell.getValue().toLocaleString('en-US', {
      }),
  },
  {
    accessorKey: 'low_income', header: 'Low Income',
    Cell: ({ cell }) =>
      cell.getValue().toLocaleString('en-US', {
      }),
  },
  {
    accessorKey: 'older_adult', header: 'Older Adults',
    Cell: ({ cell }) =>
      cell.getValue().toLocaleString('en-US', {
      }),
  },
  {
    accessorKey: 'racial_minority', header: 'Racial Minorities',
    Cell: ({ cell }) =>
      cell.getValue().toLocaleString('en-US', {
      }),
  },
  {
    accessorKey: 'youth', header: 'Youth',
    Cell: ({ cell }) =>
      cell.getValue().toLocaleString('en-US', {
      }),
  },
  {
    accessorKey: 'circuit',
    header: 'Circuit',
    cell: info => info.value || 'N/A'
  },

  {
    accessorKey: 'total_jobs', header: 'Total Jobs',
    Cell: ({ cell }) =>
      cell.getValue().toLocaleString('en-US', {
      }),
  },
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
  {
    accessorKey: 'essential_services', header: 'Essential Services',
    cell: info => info.value || 'N/A'
  },
  {
    accessorKey: 'rail_stations', header: 'Rail Stations',
    cell: info => info.value || 'N/A'
  },
], [handleSwitchChange, connectionType]);
