import getUsers from '@/app/actions/getUsers';
import Sidebar from '@/app/components/sidebar/Sidebar';
import UserList from '@/app/users/components/UserList';

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  console.log('users', users);
  return (
    <Sidebar>
      <div className='h-full'>
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
