interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onToggle,
  label,
}) => {
  return (
    <div className="flex items-center">
      {label && <span className="mr-3">{label}</span>}
      <div
        className={`relative w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          isOn ? "bg-green-500" : "bg-gray-300"
        }`}
        onClick={onToggle}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
