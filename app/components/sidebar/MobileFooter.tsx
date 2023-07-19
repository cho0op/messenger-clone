'use client';

import MobileItem from '@/app/components/sidebar/MobileItem';
import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className='fixed bottom-0 z-40 flex w-full items-center justify-between border-t-[1px] bg-white lg:hidden'>
      {routes.map(({ href, label, icon, onClick, active }) => (
        <MobileItem
          href={href}
          onClick={onClick}
          icon={icon}
          active={active}
          key={label}
        />
      ))}
    </div>
  );
};

export default MobileFooter;
