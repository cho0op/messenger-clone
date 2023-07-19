import getCurrentUser from '@/app/actions/getCurrentUser';
import DesktopSidebar from '@/app/components/sidebar/DesktopSidebar';
import MobileFooter from '@/app/components/sidebar/MobileFooter';
import React from 'react';

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className={'h-full lg:pl-20'}>{children}</main>
    </div>
  );
}

export default Sidebar;
