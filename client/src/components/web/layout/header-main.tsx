"use client";
import { useCurrentUser } from '@/hooks/use-current-user'
import { SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';
import AvatarGroup from '../common/avatar-group';
import Sheet from '../common/sheet';
import { useLayout, useTab } from '@/store/hooks';
import { useLayoutActions } from '@/hooks/actions/useLayoutAction';
import { accountsTabItems, ITab, TAB_HEADERS, TAB_TYPES, uiKitSettingsTab } from '@/constants/tabs';
import { useTabActions } from '@/hooks/actions/useTabAction';
import { useEffect, useState } from 'react';
import { useCurrentUserData } from '@/hooks/useCurrentUserData';
import useOutsideClick from '@/hooks/useOutsideClick';

function HeaderMain() {
    const user = useCurrentUser()

    const { sheetOpen } = useLayout()
    const { toggleSheet } = useLayoutActions()
    const { setTab, setActiveTabType } = useTabActions()
    const { tabType } = useTab()
    const [items, setItems] = useState<ITab[]>([])
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useOutsideClick(() => setShowMenu(false));

    useCurrentUserData();

    useEffect(() => {
        if (tabType === TAB_HEADERS.ACCOUNTS) {
            setItems(accountsTabItems)
        } else if (tabType === TAB_HEADERS.UI_KIT_SETTINGS) {
            setItems(uiKitSettingsTab)
        }
        else {
            setItems([])
        }
    }, [tabType, sheetOpen])


    return (
        <div className='py-4 px-4 w-full flex justify-between items-center sticky top-0 bg-white z-10'>
            <div className="flex items-center py-2 px-3 rounded-full gap-2 ring-2 ring-[#757575] cursor-pointer">
                <Image src='/images/coloured-circle.png' width={25} height={25} alt='logo' />
                <span className='text-[#757575] font-normal text-sm'>Style Guides</span>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:block">
                    <AvatarGroup />
                </div>


                <Link href={TAB_TYPES.UI_KIT_SETTINGS.FIGMA_CONNECTION}>
                    <span className='cursor-pointer' onClick={() => {
                        toggleSheet(true)
                        setTab(TAB_TYPES.UI_KIT_SETTINGS.FIGMA_CONNECTION)
                        setActiveTabType(TAB_HEADERS.UI_KIT_SETTINGS)
                    }} >
                        <SlidersHorizontal size={20} />
                    </span>
                </Link>

                {user && <span>{user?.name}</span>}
                <div className="relative">
                    <Image src="/images/profile.png" width={40} height={40} alt='profile' className='cursor-pointer' onClick={() => setShowMenu(true)} />
                    {showMenu && <div ref={menuRef} className="absolute w-[203px] h-[274px] top-[calc(100%+30px)] -right-6  border-1 border-[#A1A4AF] rounded-[6px] bg-white z-10">
                        <div className="absolute w-6 h-6 border-t-1 border-t-[#A1A4AF] border-r-1 border-r-[#A1A4AF] bg-white rotate-[-45deg] right-8 -top-[12.6px]"></div>
                        <ul className='p-0 m-0 flex flex-col h-full'>
                            <li className='list-none cursor-pointer flex-1 border-b-1 flex justify-center items-center py-4 border-y-[#A1A4AF] text-[#A1A4AF] text-lg font-normal hover:text-black'>Dashboard</li>
                            <li className='list-none cursor-pointer flex-1 border-b-1 flex justify-center items-center py-4 border-y-[#A1A4AF] text-[#A1A4AF] text-lg font-normal hover:text-black' onClick={() => {
                                toggleSheet(true)
                                setTab(TAB_TYPES.ACCOUNTS.PROFILE)
                                setActiveTabType(TAB_HEADERS.ACCOUNTS)
                                setShowMenu(false)
                            }}>
                                <Link href={TAB_TYPES.ACCOUNTS.PROFILE} className='block w-full h-full text-center'>
                                    My Profile
                                </Link>
                            </li>
                            <li className='list-none cursor-pointer flex-1 border-b-1 flex justify-center items-center py-4 border-y-[#A1A4AF] text-[#A1A4AF] text-lg font-normal hover:text-black'>Legal</li>
                            <li className='list-none cursor-pointer flex-1 border-b-1 flex justify-center items-center py-4 border-t-[#A1A4AF] text-[#A1A4AF] text-lg font-normal hover:text-black'>
                                <Link href={"/api/auth/signout"} className='block w-full h-full text-center'>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>}
                </div>
            </div>

            {/* Sheet component is used to display the account sheet */}
            <Sheet isOpen={sheetOpen} onClose={() => toggleSheet(false)} menuItems={items} />
        </div>
    )
}

export default HeaderMain