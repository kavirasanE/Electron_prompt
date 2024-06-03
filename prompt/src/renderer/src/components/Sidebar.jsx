import { Button, Drawer, Sidebar, TextInput } from 'flowbite-react'
import { useState } from 'react'
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers
} from 'react-icons/hi'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Link } from 'react-router-dom'
export function Online() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <>
      <div className="flex items-center justify-between w-full p-1 px-10 border">
        <RxHamburgerMenu
          size={40}
          className="rounded-lg border border-gray-100 p-1.5 shadow-lg shadow-black/50 text-black cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
        <p className="rounded-md font-bold text-xl bg-black p-2 text-white">
          Prompt <span className="bg-amber-500 p-0.5 rounded-sm px-2 text-white">hub</span>
        </p>
        <p></p>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Prompt Hub" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item>
                      <Link to="/logs">Take Logs</Link>
                    </Sidebar.Item>
                    <Sidebar.Item>
                      <Link to="/Home">Test your Commands</Link>
                    </Sidebar.Item>
                    {/* <Sidebar.Item href="/demo">Test</Sidebar.Item> */}
                  </Sidebar.ItemGroup>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item>
                      <Link to="/connectdevice">Connected Devices</Link>
                    </Sidebar.Item>
                    <Sidebar.Item>
                      <Link to="/commands">Log Commands</Link>
                    </Sidebar.Item>
                    {/* <Sidebar.Item href="https://flowbite-react.com/" icon={HiCollection}>
                      Components
                    </Sidebar.Item>
                    <Sidebar.Item href="https://github.com/themesberg/flowbite-react/issues" icon={HiInformationCircle}>
                      Help
                    </Sidebar.Item> */}
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  )
}
