'use client';

import DesktopItem from '@/app/components/sidebar/DesktopItem';
import useRoutes from '@/app/hooks/useRoutes';
import { useState } from 'react';

const DesktopSidebar = () => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={
        'hidden justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r-[1px] lg:bg-white lg:pb-4 xl:px-6'
      }
    >
      <nav className='mt-4 flex flex-col justify-between'>
        <ul
          role='list'
          className='
          flex
          flex-col
          items-center
          space-y-1
          '
        >
          {routes.map(({ href, label, icon, active, onClick }) => {
            return (
              <DesktopItem
                key={label}
                href={href}
                label={label}
                icon={icon}
                onClick={onClick}
                active={active}
              />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
