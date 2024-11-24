interface IsMockedProps {
  isApi: boolean;
  setIsApi: (value: boolean) => void;
}

const IsMocked = ({ isApi, setIsApi }: IsMockedProps) => {
  return (
    <div className="flex items-center mb-4">
      <label className="relative inline-flex items-center cursor-pointer group">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isApi}
          onChange={() => setIsApi(!isApi)}
        />
        <div
          className="w-16 h-8 bg-gray-200 rounded-full peer 
          peer-checked:after:translate-x-8
          after:content-[''] 
          after:absolute 
          after:top-1 
          after:left-1 
          after:bg-white 
          after:rounded-full 
          after:h-6 
          after:w-6 
          after:transition-all
          peer-checked:bg-blue-600
          transition-colors"
        ></div>
        <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {isApi ? "Switch to Mock Data" : "Switch to API Data"}
        </span>
      </label>
    </div>
  );
};

export default IsMocked;
