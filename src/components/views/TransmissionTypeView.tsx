import React, { useState } from 'react';
import { Send, ArrowDownToLine, FileDown, FileUp } from 'lucide-react';
import { Transmission } from '../../types';
import TransmissionTable from '../tables/TransmissionTable';
import TransmissionDetailsModal from '../modals/TransmissionDetailsModal';
import { filterTransmissionsByType } from '../../utils/filterUtils';

interface TransmissionTypeCardProps {
  title: string;
  count: number;
  icon: React.ElementType;
  description: string;
  onClick: (type: string) => void;
  isSelected: boolean;
}

const TransmissionTypeCard: React.FC<TransmissionTypeCardProps> = ({ 
  title, 
  count, 
  icon: Icon, 
  description, 
  onClick, 
  isSelected 
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 flex flex-col items-start justify-between transition-all duration-200 cursor-pointer
                  ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-lg hover:scale-[1.02]'}`}
      onClick={() => onClick(title)}
    >
      <div className="flex items-center justify-between w-full mb-4">
        <div className="text-blue-600 bg-blue-50 p-3 rounded-full">
          <Icon size={24} />
        </div>
        <p className="text-3xl font-extrabold text-gray-900">{count}</p>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

interface TransmissionTypeViewProps {
  allTransmissions: Transmission[];
  onReexecuteTransmission: (transmission: Transmission) => void;
}

const TransmissionTypeView: React.FC<TransmissionTypeViewProps> = ({ 
  allTransmissions, 
  onReexecuteTransmission 
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransmission, setSelectedTransmission] = useState<Transmission | null>(null);

  const handleCardClick = (type: string) => {
    setSelectedType(prevType => (prevType === type ? null : type));
  };

  const handleRowClick = (transmission: Transmission) => {
    setSelectedTransmission(transmission);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedTransmission(null);
  };

  const getFilteredTransmissions = () => {
    if (!selectedType) return [];
    return filterTransmissionsByType(allTransmissions, selectedType);
  };

  const filteredTransmissions = getFilteredTransmissions();

  const transmissionTypes = [
    {
      title: "Type Get",
      count: filterTransmissionsByType(allTransmissions, "Type Get").length,
      icon: ArrowDownToLine,
      description: "Files received from internal systems."
    },
    {
      title: "Type Put",
      count: filterTransmissionsByType(allTransmissions, "Type Put").length,
      icon: Send,
      description: "Files placed into external destinations."
    },
    {
      title: "Type Get Extern",
      count: filterTransmissionsByType(allTransmissions, "Type Get Extern").length,
      icon: FileDown,
      description: "Files retrieved from external sources."
    },
    {
      title: "Type Put Extern",
      count: filterTransmissionsByType(allTransmissions, "Type Put Extern").length,
      icon: FileUp,
      description: "Files uploaded to external systems."
    }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Transmission Types Overview</h1>
      <p className="text-gray-600 mb-8">A summary of file transmission activities by type. Click a card to view details.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {transmissionTypes.map((type) => (
          <TransmissionTypeCard
            key={type.title}
            title={type.title}
            count={type.count}
            icon={type.icon}
            description={type.description}
            onClick={handleCardClick}
            isSelected={selectedType === type.title}
          />
        ))}
      </div>

      {selectedType && (
        <div className="mt-12">
          <TransmissionTable
            transmissions={filteredTransmissions}
            title={`Transmissions ${selectedType}`}
            subtitle="Filtered list based on selected type"
            showAddButton={false}
            onRowClick={handleRowClick}
          />
        </div>
      )}

      <TransmissionDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseModal}
        transmission={selectedTransmission}
        onReexecute={onReexecuteTransmission}
      />
    </div>
  );
};

export default TransmissionTypeView;