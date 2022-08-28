type Props = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
};

function Button({ children, onClick, disabled = false }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50
        ${disabled ? 'bg-gray-100 hover:bg-gray-100 cursor-not-allowed' : ''}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
