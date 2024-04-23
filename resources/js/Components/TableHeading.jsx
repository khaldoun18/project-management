import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';

export default function TableHeading({ children, sortChanged = () => {}, name, sortable = true, sort_field = null, sort_direction = null }) {
  return (
    <th onClick={() => sortChanged(name)}>
      <div className='flex items-center justify-between gap-1 px-3 py-3 cursor-pointer'>
        {children}
        {sortable && (
          <div>
            <ChevronUpIcon className={"w-4 " + (sort_field === name && sort_direction === 'asc' ? 'text-gray-400' : '')} />
            <ChevronDownIcon className={"w-4 -mt-2 " + (sort_field === name && sort_direction === 'desc' ? 'text-gray-400' : '')} />
          </div>
        )}
      </div>
    </th>
  );
}
