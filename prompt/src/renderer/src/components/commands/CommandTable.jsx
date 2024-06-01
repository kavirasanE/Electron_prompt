import React from 'react'
import { Table } from 'flowbite-react'
import { IoInformationCircleOutline } from "react-icons/io5";

const CommandTable = ({ item, index }) => {
  return (
    <Table hoverable className="border border-gray-500 cursor-pointer ">
      <Table.Body >
        <Table.Row className="bg-white hover:bg-gray-300 dark:border-gray-700 ">
          <Table.Cell className="font-medium break-all text-gray-900 dark:text-white ">
            {item.command} <br/>
          <span className='text-xs font-thin clear-start flex items-center gap-1'><IoInformationCircleOutline className='text-xs'/> {item.description}</span>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default CommandTable
