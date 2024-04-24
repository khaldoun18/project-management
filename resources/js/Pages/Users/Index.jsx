import Pagination from '@/Components/Pagination';

import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head, Link, router } from '@inertiajs/react';

import TableHeading from '@/Components/TableHeading';

export default function Dashboard({ success,auth, users, queryParams = null }) {
  queryParams = queryParams || {}
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route('user.index'), queryParams)
  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return;
    searchFieldChanged(name, e.target.value)
  }

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc'
      } else {
        queryParams.sort_direction = 'asc'
      }
    } else {
      queryParams.sort_field = name
      queryParams.sort_direction = 'asc'
    }
    router.get(route('user.index'), queryParams)
  }

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure you want to delete the user?")) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={

      <div className='flex items-center justify-between'>
        <h2 className="text-xl font-semibold leading-tight text-gray-800">Users</h2>
    <Link href={route('user.create')} className='px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600'>
    Add new Button
    </Link>
      </div>
    }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {success && <div className='px-4 py-2 mb-4 text-white rounded bg-emerald-500'>
      {success}
        </div>}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className='overflow-auto'>
                <table className='w-full text-sm text-left text-gray-500 rtl:text-right'>
                <thead className='text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50'>
      <tr className='text-nowrap'>
                <TableHeading
                name="id"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
                >
                  Id
                </TableHeading>

                <TableHeading
                name="name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
                >
                  Name
                </TableHeading>
                <TableHeading
                name="email"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
                >
                  Email
                </TableHeading>
                <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
                >
                  Created Date
                </TableHeading>


        <th className='px-3 py-3 text-right'>Actions</th>
      </tr>
    </thead>
                  <thead className='text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50'>
                    <tr className='text-nowrap'>

                      <th className='px-3 py-3'></th>
                      <th className='px-3 py-3'>
                        <TextInput
                          className='w-full'
                          placeholder="User Name"
                          onBlur={e => searchFieldChanged('name', e.target.value)}
                          onKeyPress={e => onKeyPress('name', e)} />
                      </th>
                      <th className='px-3 py-3'>
                      <TextInput
                          className='w-full'
                          placeholder="User Email"
                          onBlur={e => searchFieldChanged('email', e.target.value)}
                          onKeyPress={e => onKeyPress('email', e)} />
                      </th>
                      <th className='px-3 py-3'>

                      </th>

                      <th className='px-3 py-3'>

                      </th>
                      <th className='px-3 py-3 text-right'></th>
                    </tr>
                  </thead>
                  <tbody >
                    {users.data.map((user, index) => (
                      <tr key={index} className='bg-white border-b'>
                        <td className='px-3 py-2'>{user.id} </td>

                        <th className='px-3 py-2 text-nowrap'>
{user.name}
                          </th>
                        <td className='px-3 py-2'>
                        {user.email}
                        </td>
                        <td className='px-3 py-2 text-nowrap'>{user.created_at} </td>
                        <td className='px-3 py-2 text-nowrap'>{user.due_date} </td>

                        <td className="px-3 py-2 text-nowrap">
                          <Link
                            href={route("user.edit", user.id)}
                            className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteUser(user)}
                            className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
