'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactElement, ReactNode } from 'react';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, children, onClose }: ModalProps): ReactElement => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className={'relative z-50'} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
