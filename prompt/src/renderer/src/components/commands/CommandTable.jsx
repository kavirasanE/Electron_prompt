import React from 'react'
import { Table } from 'flowbite-react'
import { IoInformationCircleOutline } from 'react-icons/io5'

const CommandTable = ({ item, index, callback }) => {
  const handleClick = (e) => {
    console.log(item.command)
    const coms = item.command
    e.preventDefault()
    e.stopPropagation()
    const shellComand = coms
    console.log(shellComand)
    window.electron.ipcRenderer
      .invoke('shellCommand', shellComand)
      .then((res) => {
        const parsedResponse = JSON.parse(res)
        console.log(parsedResponse, 'response from backed')
        if (parsedResponse) {
          callback(parsedResponse)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Table hoverable className="border border-gray-500 cursor-pointer ">
      <Table.Body>
        <Table.Row className="bg-white hover:bg-gray-300 dark:border-gray-700 ">
          <Table.Cell
            className="font-medium break-all text-gray-900 dark:text-white"
            onClick={handleClick}
          >
            {item.command} <br />
            <span className="text-xs font-thin clear-start flex items-center gap-1">
              <IoInformationCircleOutline className="text-xs" /> {item.description}
            </span>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

export default CommandTable
