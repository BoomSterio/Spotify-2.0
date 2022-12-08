import React from 'react'
import Image from 'next/image'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import { ClockIcon } from '@heroicons/react/24/outline'
import { PlayIcon } from '@heroicons/react/24/solid'

import { Track } from 'types/spotify'
import { duration } from 'lib/utils'
import { PlayButton, ColumnsType, ColumnBreakpoints, Table } from 'components'

const columnHelper = createColumnHelper<SpotifyApi.TrackObjectSimplified>()

const columns: ColumnsType<SpotifyApi.TrackObjectSimplified> = [
  columnHelper.accessor('id', {
    cell: (info) =>
      info.cell.row.getIsSelected() ? (
        <PlayIcon width={16} className='cursor-pointer text-white' />
      ) : (
        <div>{info.row.index + 1}</div>
      ),
    header: () => '#',
    size: 1,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.name, {
    id: 'title',
    cell: (info) => (
      <div className='flex gap-4 min-w-0'>
        <div className='flex flex-col min-w-0 justify-center md:justify-between'>
          <h3 className='font-semibold leading-none text-inherit'>{info.getValue()}</h3>
          <div className='leading-none text-gray'>{info.row.original.artists?.at(0)?.name}</div>
        </div>
      </div>
    ),
    header: () => 'Title',
  }),
  columnHelper.accessor('duration_ms', {
    id: 'duration',
    cell: (info) => duration(info.getValue()),
    header: () => <ClockIcon width={24} height={24} />,
  }),
]

const COLUMN_BREAKPOINTS: ColumnBreakpoints = {
  640: ['id'],
}

interface AlbumTableProps {
  data: SpotifyApi.TrackObjectSimplified[]
  playlistUri: string
}

export const AlbumTable = ({ data, playlistUri }: AlbumTableProps) => {
  return (
    <div className='text-white bg-dark bg-opacity-30 backdrop-blur-md px-2 md:px-8'>
      <div className='flex items-center py-4'>
        <PlayButton size='large' uri={playlistUri} />
      </div>

      <Table
        data={data}
        columns={columns}
        columnBreakpoints={COLUMN_BREAKPOINTS}
        playlistUri={playlistUri}
      />
    </div>
  )
}
