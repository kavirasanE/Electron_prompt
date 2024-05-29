import React from 'react'
import { Table } from 'flowbite-react'

const CommandTable = ({ item, index }) => {
  return (
    <Table hoverable className="border border-gray-500 ">
      <Table.Body className="divide-y">
        <Table.Row className="bg-white hover:bg-gray-300 dark:border-gray-700 ">
          <Table.Cell className="whitespace-nowrap text-wrap font-medium text-gray-900 dark:text-white">
            {item.command}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default CommandTable
