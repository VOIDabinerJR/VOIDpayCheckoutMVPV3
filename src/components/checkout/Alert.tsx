// components/checkout/Alert.tsx
'use client';

export type AlertType = 'info' | 'success' | 'error' | 'warning';
type AlertProps = {
  children: React.ReactNode;
  type: AlertType;
};

const colorMap = {
  info: 'bg-blue-100 border-blue-500 text-blue-700',
  success: 'bg-green-100 border-green-500 text-green-700',
  error: 'bg-red-100 border-red-500 text-red-700',
  warning: 'bg-yellow-100 border-yellow-500 text-yellow-700'
};

export const Alert = ({ children, type }: AlertProps) => {
  return (
    <div className={`border-l-4 p-4 mb-4 ${colorMap[type]}`}>
      <div className="flex items-center">
        {type === 'info' && <InfoIcon className="mr-2" />}
        {type === 'success' && <CheckIcon className="mr-2" />}
        {type === 'error' && <XIcon className="mr-2" />}
        {type === 'warning' && <AlertIcon className="mr-2" />}
        <p>{children}</p>
      </div>
    </div>
  );
};

// Ícones simples (substitua por seus próprios ícones)
type IconProps = { className?: string };

const InfoIcon = ({ className }: IconProps) => <span className={className}>ℹ️</span>;
const CheckIcon = ({ className }: IconProps) => <span className={className}>✓</span>;
const XIcon = ({ className }: IconProps) => <span className={className}>✕</span>;
const AlertIcon = ({ className }: IconProps) => <span className={className}>⚠️</span>;

