import { Button, Drawer, Sidebar, TextInput } from 'flowbite-react'
import { useState } from 'react'
import {
  HiChartPie,
  HiClipboard,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiOutlineUserGroup,
  HiShoppingBag,
  HiUsers
} from 'react-icons/hi'
import { TbPrompt, TbBrandSpeedtest } from 'react-icons/tb'
import { HiCommandLine } from 'react-icons/hi2'
import { PiPlugsConnectedDuotone } from 'react-icons/pi'
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
        <p className="rounded-md font-bold text-xl  p-2 text-black">
          Prompt <span className="bg-black p-0.5 rounded-sm px-2 text-white">hub</span>
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
            <div className="flex h-full flex-col justify-center ">
              <form className="pb-3 md:hidden ">
                <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
              </form>
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Link to="/logs" className="">
                    <Sidebar.Item icon={TbPrompt}>Take Logs</Sidebar.Item>
                  </Link>
                  <Link to="/Home" className="">
                    <Sidebar.Item icon={TbBrandSpeedtest}>Test your Commands</Sidebar.Item>
                  </Link>
                  {/* <Sidebar.Item href="/demo">Test</Sidebar.Item> */}
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                  <Link to="/connectdevice" className="">
                    <Sidebar.Item icon={PiPlugsConnectedDuotone}>Connected Devices</Sidebar.Item>
                  </Link>
                  <Link to="/commands" className=" ">
                    <Sidebar.Item icon={HiCommandLine}>Log Commands</Sidebar.Item>
                  </Link>
                  <Link to="/contibutors">
                    <Sidebar.Item icon={HiOutlineUserGroup}>
                      Meet our Team
                    </Sidebar.Item>
                  </Link>
                  <Sidebar.Item
                    href="https://github.com/themesberg/flowbite-react/issues"
                    icon={HiInformationCircle}
                  >
                    Help
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  )
}
