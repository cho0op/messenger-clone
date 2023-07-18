'use client';

interface DesktopItemProps {
  href: string;
  label: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  active,
  icon,
  onClick,
  label,
  href,
}) => {
  return <div>label</div>;
};

export default DesktopItem;
