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
import { useCallback, useEffect, useState } from 'react';

function HeaderMain() {
    const user = useCurrentUser()

    const { sheetOpen } = useLayout()
    const { toggleSheet } = useLayoutActions()
    const { setTab, setActiveTabType } = useTabActions()
    const { tabType } = useTab()
    const [items, setItems] = useState<ITab[]>([])


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
        <div className='py-4 w-full flex justify-between items-center sticky top-0 bg-white z-10'>
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

                <Link href={TAB_TYPES.ACCOUNTS.PROFILE}>
                    <Image src="/images/profile.png" width={40} height={40} alt='profile' className='cursor-pointer' onClick={() => {
                        toggleSheet(true)
                        setTab(TAB_TYPES.ACCOUNTS.PROFILE)
                        setActiveTabType(TAB_HEADERS.ACCOUNTS)
                    }} />
                </Link>
            </div>

            {/* Sheet component is used to display the account sheet */}
            <Sheet isOpen={sheetOpen} onClose={() => toggleSheet(false)} menuItems={items} />
        </div>
    )
}

export default HeaderMain