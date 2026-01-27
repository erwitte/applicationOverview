const ActionButton = ({ children }) => {
    return (
        <button 
            type={ 'button'}
            className="border border-black-200 cursor-pointer rounded p-2 bg-slate-400 hover:bg-slate-500 transition-colors"
        >
            {children}
        </button>
    );
};

export default ActionButton;