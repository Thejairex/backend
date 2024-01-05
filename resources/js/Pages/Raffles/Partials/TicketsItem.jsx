import { Badge, Flex } from '@chakra-ui/react'
import { usePage } from '@inertiajs/react'
import React from 'react'

const TicketsItem = ({className, data}) => {
  const isOrg = usePage().props.auth.user.type == 'org'
  return (
    <article className={`overflow-hidden bg-white shadow-md sm:rounded-lg mb-6 px-4 py-4 sm:px-6 w-full ${className}`}>
        <header>
            <h2 className="text-lg font-medium text-gray-900">Ticket: {data.number}</h2>
            <p className="mt-1 text-sm text-gray-600">
            ID: {data.id}
            </p>
        </header>
        <Flex direction='column' gap='2' align='flex-start' overflow='hidden' w='100%'>
          {<Badge colorScheme={data.status === 'sold' ? 'red' : "green"} className="mr-2">{data.status}</Badge>}
          {data.status === 'sold' && <Badge colorScheme={data.status === 'sold' ? 'red' : "green"} className="mr-2">{data.purchase?.user?.username}</Badge>}
          {isOrg && <Badge colorScheme={"blue"} className="mr-2" w='full' textOverflow='ellipsis' overflow='hidden' whiteSpace='nowrap'>{data?.member?.email}</Badge>}
        </Flex>
    </article>
  )
}

export default TicketsItem