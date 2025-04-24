import { ButtonHTMLAttributes } from 'react';

interface ConnectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const ConnectButton = ({
  onClick,
  disabled,
  children = "Connect Wallet",
  ...props
}: ConnectButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-2 bg-white text-black font-medium rounded-lg
                 hover:bg-gray-200 transition-colors duration-200 
                 shadow-sm border border-gray-200
                 disabled:bg-gray-300 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
};

export default ConnectButton; 
