import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EventShippingTask } from '../../types';
import ConfirmationModal from '../modals/ConfirmationModal';
import EditEventShippingModal from '../modals/EditEventShippingModal';
import SearchInput from '../ui/SearchInput';
import Button from '../ui/Button';
import { filterBySearchTerm } from '../../utils/filterUtils';

interface EventShippingViewProps {
  eventShippingTasks: EventShippingTask[];
  onToggleStatus: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask?: (task: EventShippingTask) => void;
}

const EventShippingView: React.FC<EventShippingViewProps> = ({ 
  eventShippingTasks, 
  onToggleStatus, 
  onDeleteTask, 
  onUpdateTask 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [actionType, setActionType] = useState<'toggle' | 'delete' | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<EventShippingTask | null>(null);
  const navigate = useNavigate();

  const filteredTasks = filterBySearchTerm(eventShippingTasks, searchTerm);

  const handleToggleClick = (id: string) => {
    setSelectedTaskId(id);
    setActionType('toggle');
    setShowConfirmationModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedTaskId(id);
    setActionType('delete');
    setShowConfirmationModal(true);
  };

  const handleConfirmAction = () => {
    if (selectedTaskId && actionType === 'toggle') {
      onToggleStatus(selectedTaskId);
    } else if (selectedTaskId && actionType === 'delete') {
      onDeleteTask(selectedTaskId);
    }
    setShowConfirmationModal(false);
    setSelectedTaskId(null);
    setActionType(null);
  };

  const handleCancelAction = () => {
    setShowConfirmationModal(false);
    setSelectedTaskId(null);
    setActionType(null);
  };

  const handleAddNewEventShippingClick = () => {
    navigate('/tasks/event/add');
  };

  const handleEditClick = (id: string) => {
    const task = eventShippingTasks.find(t => t.id === id);
    if (task) {
      setTaskToEdit(task);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = (updatedTask: EventShippingTask) => {
    if (onUpdateTask) {
      onUpdateTask(updatedTask);
    }
    setShowEditModal(false);
    setTaskToEdit(null);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setTaskToEdit(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Event Shipping</h1>
      <p className="text-gray-600 mb-8">Manage your event-driven file shipping tasks.</p>

      <div className="flex items-center justify-between mb-8">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Filter event shipping tasks..."
        />
        <Button onClick={handleAddNewEventShippingClick} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add New Event Shipping</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local File</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Process Filter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Options</th>
            </tr>
          </thead>
          <motion.tbody
            className="bg-white divide-y divide-gray-200"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {},
            }}
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <motion.tr
                  key={task.id}
                  className="hover:bg-gray-50"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.provider}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.eventType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.localFile}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.processFilter}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label htmlFor={`toggle-${task.id}`} className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id={`toggle-${task.id}`}
                          className="sr-only"
                          checked={task.status}
                          onChange={() => handleToggleClick(task.id)}
                        />
                        <div className={`block w-10 h-6 rounded-full ${task.status ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${task.status ? 'translate-x-full' : ''}`}></div>
                      </div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEditClick(task.id)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                        title="Edit task"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(task.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <motion.tr
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  No event shipping tasks found matching your criteria.
                </td>
              </motion.tr>
            )}
          </motion.tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={handleCancelAction}
        onConfirm={handleConfirmAction}
        message={`Are you sure you want to ${actionType === 'toggle' ? 'change the status of' : 'delete'} this event shipping task?`}
      />

      <EditEventShippingModal
        isOpen={showEditModal}
        onClose={handleCancelEdit}
        onSave={handleSaveEdit}
        task={taskToEdit}
      />
    </div>
  );
};

export default EventShippingView;