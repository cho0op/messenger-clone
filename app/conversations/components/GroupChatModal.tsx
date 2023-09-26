import Modal from '@/app/components/Modal';
import Button from '@/app/components/buttons/Button';
import Input from '@/app/components/inputs/Input';
import Select from '@/app/components/inputs/Select';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface GroupChatModalProps {
  onClose: () => void;
  isOpen: boolean;
  users: User[];
}

const GroupChatModal = ({ onClose, isOpen, users }: GroupChatModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    },
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('/api/conversations', { ...data, isGroup: true });
      toast.success('Group chat created');
      router.refresh();
      onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Create a group chat
          </h2>
          <Input
            id='name'
            disabled={isLoading}
            label='Name'
            errors={errors}
            register={register}
            required
          />
          <Select
            isMulti
            label='Members'
            options={users.map((user) => ({
              value: user.id,
              label: user.name,
            }))}
            onChange={(value) =>
              setValue('members', value, { shouldValidate: true })
            }
            disabled={isLoading}
            value={members}
          />
        </div>
        <div className='mt-8 flex justify-end space-x-4'>
          <Button
            type='button'
            secondary
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
