'use client';

import Modal from '@/app/components/Modal';
import Image from 'next/image';

interface ImageModalProps {
  src: string;
  onClose: () => void;
  isOpen: boolean;
}

const ImageModal = ({ src, isOpen, onClose }: ImageModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className='h-80 w-80'>
        <Image fill src={src} alt='Modal Image' className='object-cover' />
      </div>
    </Modal>
  );
};

export default ImageModal;
