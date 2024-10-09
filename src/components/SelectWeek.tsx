import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (week: any) => void;
}

const SelectWeekModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const weeks = ["week1", "week2", "week3", "week4"];
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleWeekSelection = (week: string) => {
    setSelectedWeek(week);
  };

  const handleSave = () => {
    if (selectedWeek) {
      onSave(selectedWeek);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-6">Select Week</h2>

        {/* Week Selection Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          {weeks.map((week) => (
            <button
              key={week}
              onClick={() => handleWeekSelection(week)}
              className={`px-4 py-2 rounded-md border transition-colors ${
                selectedWeek === week
                  ? "bg-blue-100 border-blue-500"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {week.charAt(0).toUpperCase() + week.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors"
            disabled={!selectedWeek}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectWeekModal;
