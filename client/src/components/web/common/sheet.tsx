import React, { useEffect, useMemo } from 'react';
import SheetHeader from './sheet-header';
import Link from 'next/link';
import { ITab, TAB_TYPES } from '@/constants/tabs';
import { useTab } from '@/store/hooks';
import { useTabActions } from '@/hooks/actions/useTabAction';
import { cn } from '@/lib/utils';
import { useIsClient } from '@/hooks/useIsClient';
import { useLayoutActions } from '@/hooks/actions/useLayoutAction';
import { X } from 'lucide-react';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: ITab[];
}

const Sheet: React.FC<SheetProps> = ({ isOpen, onClose, menuItems }) => {

  const { activeTab } = useTab();
  const { setActiveTabType } = useTabActions();
  const { setTab } = useTabActions();
  const { toggleSheet } = useLayoutActions();
  const isClient = useIsClient();

  // Close sheet on escape key press and reset active tab
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose, isClient]);



  /**
   * Handle hash change and set active tab based on hash
   */
  useEffect(() => {
    if (isClient) {
      const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash) {
          for (const [key, value] of Object.entries(TAB_TYPES)) {
            for (const [k, v] of Object.entries(value)) {
              if (hash === v) {
                setTab(v);
                setActiveTabType(key as any);
                break;
              }
            }
          }
          toggleSheet(true);
          // setTab(hash);
        }
      };

      handleHashChange();
      window.addEventListener('hashchange', handleHashChange);
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }
  }, [isClient]);


  // Get active component based on active tab
  const activeComponent = useMemo(() => {
    const activeTabItem = menuItems.find((item) => item.tab === activeTab);
    return activeTabItem?.component;
  }, [activeTab, menuItems]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 overflow-hidden"
          onClick={onClose}
        />
      )}
      {/* Sheet */}
      <div
        className={`fixed inset-y-0 right-0   min-w-[100vw]  lg:min-w-[78%] 2xl:min-w-[80%] max-w-4xl h-full bg-[#F6FAFB] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } overflow-y-auto`}
        style={{
          boxShadow: '-20px 0px 60px 0px #0000001A',
        }}
      >
        {/* Close Sheet Button */}
        <span className='absolute top-4 left-5 block lg:hidden cursor-pointer' onClick={onClose}><X /></span>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="max-w-fit pe-6 min-w-40 bg-[#F6FAFB] max-h-screen overflow-y-auto flex items-center border-r-2 mb-6">
            <ul className="space-y-6 ps-4 md:ps-6 lg:ps-8 w-full h-full flex flex-col justify-start pt-40 md:pt-48">
              {menuItems.map((item, index) => (
                <li onClick={() => setTab(item.tab)} key={index} className={cn("cursor-pointer text-clr-dark-secondary hover:text-black font-medium text-lg", activeTab === item.tab && "font-bold text-black ")}>
                  <Link href={item.tab}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Main Content */}
          {isOpen && <div className="flex-1 px-4 md:px-14 py-4 h-full overflow-y-auto">
            {/* Sheet Header */}
            <SheetHeader />
            <div className="flex items-center pt-12">
              {activeComponent}
            </div>
          </div>}
        </div>
      </div>
    </>
  );
};

export default Sheet;
