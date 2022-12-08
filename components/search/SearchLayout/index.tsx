import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'

import { Button, Layout, SearchBar } from 'components'
import { debounce } from 'lodash'

const config = {
  buttons: [
    { id: 'all', title: 'All', url: '/search' },
    { id: 'playlists', title: 'Playlists', url: '/search/playlists' },
    { id: 'artists', title: 'Artists', url: '/search/artists' },
    { id: 'albums', title: 'Albums', url: '/search/albums' },
  ],
}

const NavButtons = () => {
  const router = useRouter()
  const { query } = router.query

  return (
    <div className='flex flex-wrap items-center md:gap-4'>
      {config.buttons.map(({ id, title, url }) => (
        <Link key={id} href={{ pathname: url, query: { query } }}>
          <Button
            className={`btn-base py-1 rounded-full ${
              router.pathname === url && 'text-black bg-white'
            }`}
          >
            {title}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export const SearchLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { query } = router.query

  const [value, setValue] = useState('')

  const debounceFn = useCallback(
    debounce((debouncedValue) => {
      router.push({ pathname: '/search', query: { query: debouncedValue } })
    }, 700),
    [],
  )

  const handleChange = (v: string) => {
    setValue(v)
    debounceFn(v)
  }

  const handleClear = () => {
    handleChange('')
  }

  return (
    <Layout
      headerOpacityOffset={0}
      headerOpacityDistance={150}
      Controller={() => (
        <SearchBar
          placeholder='What do you want to listen to?'
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onClear={handleClear}
        />
      )}
      gradientBrightness={0}
    >
      <div className='mx-3 md:mx-8'>
        {query && <NavButtons />}
        <div className='mt-4 md:mt-6 mb-4'>{children}</div>
      </div>
    </Layout>
  )
}
