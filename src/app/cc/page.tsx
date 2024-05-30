'use client'

import React, { Suspense } from 'react'
import { useFragment, useQuery, useSuspenseQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import LoadingIndicator from '@/components/loading-indicator'

export const dynamic = 'force-dynamic'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

const Result = ({ source, data }: { source: string; data: unknown }) => {
  return (
    <table className="table-fixed w-full text-sm text-left rtl:text-right">
      <thead className="text-xs uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 w-1/3">
            source
          </th>
          <th scope="col" className="px-6 py-3 w-2/3">
            data
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b">
          <td
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {source}
          </td>
          <td
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {JSON.stringify(data)}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

const userFragment = gql`
  fragment UserFragment on User {
    id
    name
  }
`

const userQuery = gql`
  query {
    getUser(id: "1") {
      ...UserFragment
    }
  }
  ${userFragment}
`

const postsQuery = gql`
  query {
    getPosts {
      id
      title
    }
  }
`

const SuspenseQueryUser = ({ children }: React.PropsWithChildren) => {
  const result = useSuspenseQuery(userQuery, { fetchPolicy: 'cache-first' })
  return (
    <>
      <Result source="useSuspenseQuery(userQuery)" data={result.data} />
      <React.Fragment key="children">{children}</React.Fragment>
    </>
  )
}

const SuspenseQueryPosts = ({ children }: React.PropsWithChildren) => {
  const result = useSuspenseQuery(postsQuery, { fetchPolicy: 'cache-first' })
  return (
    <>
      <Result source="useSuspenseQuery(postsQuery)" data={result.data} />
      <React.Fragment key="children">{children}</React.Fragment>
    </>
  )
}

const FragmentUser = ({ children }: React.PropsWithChildren) => {
  const result = useFragment({
    fragment: userFragment,
    from: { __typename: 'User', id: '1' },
  })
  return (
    <>
      <Result source="useFragment(userFragment)" data={result.data} />
      <React.Fragment key="children">{children}</React.Fragment>
    </>
  )
}

const QueryUser = ({ children }: React.PropsWithChildren) => {
  const result = useQuery(userQuery, { fetchPolicy: 'cache-first' })
  return (
    <>
      <Result source="useQuery(userQuery)" data={result.data} />
      <React.Fragment key="children">{children}</React.Fragment>
    </>
  )
}

const Page = () => {
  return (
    <>
      <h1 className="text-lg font-semibold mb-4">Data received during SSR</h1>
      <Suspense fallback={<LoadingIndicator />}>
        <SuspenseQueryUser>
          <FragmentUser />
          <QueryUser />
        </SuspenseQueryUser>
        <FragmentUser />
        <QueryUser />
      </Suspense>
      <Suspense fallback={<LoadingIndicator />}>
        <SuspenseQueryPosts>
          <QueryUser />
        </SuspenseQueryPosts>
        <QueryUser />
      </Suspense>
    </>
  )
}

export default Page
