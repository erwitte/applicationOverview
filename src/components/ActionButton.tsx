interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void; 
}

const ActionButton = ({ children, onClick }: ActionButtonProps) => {
    return (
        <button 
            type={ 'button'}
            onClick={onClick}
            className="border border-black-200 cursor-pointer rounded p-2 bg-slate-400 hover:bg-slate-500 transition-colors"
        >
            {children}
        </button>
    );
};

export default ActionButton;