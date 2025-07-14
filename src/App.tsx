import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import Layout from './components/layout/Layout';
import TransmissionTable from './components/tables/TransmissionTable';
import TransmissionForm from './components/forms/TransmissionForm';
import DashboardView from './components/views/DashboardView';
import TransmissionTypeView from './components/views/TransmissionTypeView';
import TransmissionHistoryView from './components/views/TransmissionHistoryView';
import TransmissionDetailsModal from './components/modals/TransmissionDetailsModal';
import ScheduledTasksView from './components/views/ScheduledTasksView';
import AddScheduledTaskForm from './components/forms/AddScheduledTaskForm';
import EventShippingView from './components/views/EventShippingView';
import AddEventShippingForm from './components/forms/AddEventShippingForm';
import MonitorizationView from './components/views/MonitorizationView';
import ToolsView from './components/views/ToolsView';
import ConfirmationModal from './components/modals/ConfirmationModal';
import { Transmission, ScheduledTask, EventShippingTask } from './types';
import { MOCK_TRANSMISSIONS, MOCK_SCHEDULED_TASKS, MOCK_EVENT_SHIPPING_TASKS } from './constants/mockData';
import { useModal, useConfirmation } from './hooks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedTransmission, setSelectedTransmission] = useState<Transmission | null>(null);
  const [scheduledTasks, setScheduledTasks] = useState<ScheduledTask[]>(MOCK_SCHEDULED_TASKS);
  const [eventShippingTasks, setEventShippingTasks] = useState<EventShippingTask[]>(MOCK_EVENT_SHIPPING_TASKS);
  
  const detailsModal = useModal();
  const reexecuteConfirmation = useConfirmation();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleUserLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleAddTransmission = () => {
    navigate('/transmissions/today/add');
  };

  const handleSendFile = () => {
    console.log('File sent!');
    navigate('/transmissions/today');
  };

  const handleRowClick = (transmission: Transmission) => {
    setSelectedTransmission(transmission);
    detailsModal.openModal();
  };

  const handleCloseModal = () => {
    detailsModal.closeModal();
    setSelectedTransmission(null);
  };

  const handleReexecuteTransmission = (transmission: Transmission) => {
    console.log('Attempting to re-execute transmission:', transmission);
    reexecuteConfirmation.openConfirmation(
      `Transmission "${transmission.fileSent}" re-executed successfully!`,
      () => console.log('Re-execution confirmed')
    );
  };

  const handleSaveNewScheduledTask = (newTask: ScheduledTask) => {
    console.log('Saving new scheduled task:', newTask);
    setScheduledTasks(prevTasks => [...prevTasks, newTask]);
    navigate('/tasks/scheduled');
  };

  const handleSaveNewEventShippingTask = (newTask: EventShippingTask) => {
    console.log('Saving new event shipping task:', newTask);
    setEventShippingTasks(prevTasks => [...prevTasks, newTask]);
    navigate('/tasks/event');
  };

  const handleToggleTaskStatus = (id: string) => {
    setScheduledTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setScheduledTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleToggleEventTaskStatus = (id: string) => {
    setEventShippingTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  const handleDeleteEventTask = (id: string) => {
    setEventShippingTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleUpdateScheduledTask = (updatedTask: ScheduledTask) => {
    setScheduledTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const handleUpdateEventTask = (updatedTask: EventShippingTask) => {
    setEventShippingTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const todayTransmissions = MOCK_TRANSMISSIONS.filter(t => t.transmissionDate === '2025-07-09');

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        {isLoggedIn ? (
          <Route path="/" element={<Layout onLogout={handleUserLogout} />}>
            <Route index element={<DashboardView />} />
            <Route 
              path="transmissions/today" 
              element={
                <TransmissionTable 
                  transmissions={todayTransmissions} 
                  onAddTransmission={handleAddTransmission} 
                  onRowClick={handleRowClick}
                  title="Today's Transmissions"
                  subtitle="File transmissions executed today"
                />
              } 
            />
            <Route 
              path="transmissions/today/add" 
              element={
                <TransmissionForm 
                  onClose={() => navigate('/transmissions/today')} 
                  onSendFile={handleSendFile} 
                />
              } 
            />
            <Route
              path="transmissions/type"
              element={
                <TransmissionTypeView
                  allTransmissions={MOCK_TRANSMISSIONS}
                  onReexecuteTransmission={handleReexecuteTransmission}
                />
              }
            />
            <Route 
              path="transmissions/history" 
              element={
                <TransmissionHistoryView 
                  allTransmissions={MOCK_TRANSMISSIONS} 
                  onRowClick={handleRowClick} 
                />
              } 
            />
            <Route
              path="tasks/scheduled"
              element={
                <ScheduledTasksView
                  scheduledTasks={scheduledTasks}
                  onToggleStatus={handleToggleTaskStatus}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTask={handleUpdateScheduledTask}
                />
              }
            />
            <Route
              path="tasks/scheduled/add"
              element={
                <AddScheduledTaskForm
                  onSave={handleSaveNewScheduledTask}
                  onCancel={() => navigate('/tasks/scheduled')}
                />
              }
            />
            <Route
              path="tasks/event"
              element={
                <EventShippingView
                  eventShippingTasks={eventShippingTasks}
                  onToggleStatus={handleToggleEventTaskStatus}
                  onDeleteTask={handleDeleteEventTask}
                  onUpdateTask={handleUpdateEventTask}
                />
              }
            />
            <Route
              path="tasks/event/add"
              element={
                <AddEventShippingForm
                  onSave={handleSaveNewEventShippingTask}
                  onCancel={() => navigate('/tasks/event')}
                />
              }
            />
            <Route path="monitorization" element={<MonitorizationView />} />
            <Route path="tools" element={<ToolsView />} />
          </Route>
        ) : (
          <Route path="*" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        )}
      </Routes>
      
      <TransmissionDetailsModal
        isOpen={detailsModal.isOpen}
        onClose={handleCloseModal}
        transmission={selectedTransmission}
        onReexecute={handleReexecuteTransmission}
      />

      <ConfirmationModal
        isOpen={reexecuteConfirmation.showConfirmation}
        onClose={reexecuteConfirmation.closeConfirmation}
        onConfirm={reexecuteConfirmation.confirmAction}
        message={reexecuteConfirmation.confirmationMessage}
      />
    </>
  );
}

export default App;