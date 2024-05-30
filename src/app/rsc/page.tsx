import { gql } from '@apollo/client'
import { getClient } from '@/lib/apollo-client'

export const dynamic = 'force-dynamic'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

const userQuery = gql`
  query {
    getUser(id: "1") {
      id
      name
    }
  }
`

const Page = async () => {
  const { data } = await getClient().query({ query: userQuery })
  const user = data?.getUser

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">
        Data received during RSC render
      </h1>
      <table className="table-auto w-1/2 text-sm text-left rtl:text-right">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              typename
            </th>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              name
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white [&:not(:last-child)]border-b">
            <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {user.__typename}
            </td>
            <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {user.id}
            </td>
            <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {user.name}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Page
