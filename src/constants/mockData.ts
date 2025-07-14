import { Transmission, ScheduledTask, EventShippingTask } from '../types';

export const MOCK_TRANSMISSIONS: Transmission[] = [
  { id: '1', fileSent: '00195741.csv', fileSize: '166 Kb', transmissionHour: '00:45:48', transmissionDate: '2025-07-09', zipped: false, status: 'Success' },
  { id: '2', fileSent: '00195742.csv', fileSize: '164 kb', transmissionHour: '01:23:42', transmissionDate: '2025-07-09', zipped: true, status: 'Success' },
  { id: '3', fileSent: '00195743.csv', fileSize: '164 kb', transmissionHour: '03:12:34', transmissionDate: '2025-07-08', zipped: true, status: 'Success' },
  { id: '4', fileSent: '00195744.csv', fileSize: '164 kb', transmissionHour: '06:54:22', transmissionDate: '2025-07-08', zipped: true, status: 'Success' },
  { id: '5', fileSent: '00195745.csv', fileSize: '164 kb', transmissionHour: '12:32:54', transmissionDate: '2025-07-07', zipped: false, status: 'Success' },
  { id: '6', fileSent: '00195746.csv', fileSize: '164 kb', transmissionHour: '14:42:32', transmissionDate: '2025-07-07', zipped: false, status: 'Success' },
  { id: '7', fileSent: '00195747.csv', fileSize: '164 kb', transmissionHour: '16:08:08', transmissionDate: '2025-07-06', zipped: false, status: 'Success' },
  { id: '8', fileSent: '00195748.csv', fileSize: '164 kb', transmissionHour: '21:58:12', transmissionDate: '2025-07-06', zipped: true, status: 'Error' },
  { id: '9', fileSent: '00195749.csv', fileSize: '170 Kb', transmissionHour: '09:00:00', transmissionDate: '2025-07-05', zipped: false, status: 'Success' },
  { id: '10', fileSent: '00195750.csv', fileSize: '150 kb', transmissionHour: '10:30:00', transmissionDate: '2025-07-05', zipped: true, status: 'Success' },
  { id: '11', fileSent: '00195751.csv', fileSize: '180 Kb', transmissionHour: '11:45:00', transmissionDate: '2025-07-04', zipped: false, status: 'Error' },
  { id: '12', fileSent: '00195752.csv', fileSize: '160 kb', transmissionHour: '13:15:00', transmissionDate: '2025-07-04', zipped: true, status: 'Success' },
  { id: '13', fileSent: '00195753.csv', fileSize: '190 Kb', transmissionHour: '15:00:00', transmissionDate: '2025-07-03', zipped: false, status: 'Success' },
  { id: '14', fileSent: '00195754.csv', fileSize: '175 kb', transmissionHour: '17:20:00', transmissionDate: '2025-07-03', zipped: true, status: 'Error' },
];

export const MOCK_SCHEDULED_TASKS: ScheduledTask[] = [
  { id: 'st1', provider: 'SFTP', description: 'Event Get using Sftp', taskType: 'Get', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Wed, Thu; 12:00hrs', status: true },
  { id: 'st2', provider: 'AWS', description: 'Event Get External using Aws', taskType: 'Get External', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: true },
  { id: 'st3', provider: 'SFTP', description: 'Second Event Shipping using Sftp', taskType: 'Get', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: false },
  { id: 'st4', provider: 'SFTP', description: 'Third Event Shipping using Sftp', taskType: 'Get', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: true },
  { id: 'st5', provider: 'SFTP', description: 'Event Shipping using Put', taskType: 'Get', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: true },
  { id: 'st6', provider: 'SFTP', description: 'Fourth Event Shipping using Sftp', taskType: 'Get', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: false },
  { id: 'st7', provider: 'MSABS', description: 'Event Shipping Using Msabs', taskType: 'Get External', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: true },
  { id: 'st8', provider: 'MSABS', description: 'Second Event Shipping using Msabs', taskType: 'Get External', localFile: '01000001.csv', textFilter: '.txt, .sh', executionTime: 'Mon, Thu; 12:00hrs', status: true },
];

export const MOCK_EVENT_SHIPPING_TASKS: EventShippingTask[] = [
  { id: 'es1', provider: 'SFTP', description: 'Event Get using Sftp', eventType: 'Get', localFile: '01000001.csv', processFilter: '.txt, .sh', status: true },
  { id: 'es2', provider: 'AWS', description: 'Event Get External using Aws', eventType: 'Get External', localFile: '01000001.csv', processFilter: '.txt, .sh', status: true },
  { id: 'es3', provider: 'SFTP', description: 'Second Event Shipping using Sftp', eventType: 'Get', localFile: '01000001.csv', processFilter: '.txt, .sh', status: false },
  { id: 'es4', provider: 'SFTP', description: 'Third Event Shipping using Sftp', eventType: 'Get', localFile: '01000001.csv', processFilter: '.txt, .sh', status: true },
  { id: 'es5', provider: 'SFTP', description: 'Event Shipping using Put', eventType: 'Get', localFile: '01000001.csv', processFilter: '.txt, .sh', status: true },
  { id: 'es6', provider: 'SFTP', description: 'Fourth Event Shipping using Sftp', eventType: 'Get', localFile: '01000001.csv', processFilter: '.txt, .sh', status: false },
  { id: 'es7', provider: 'MSABS', description: 'Event Shipping Using Msabs', eventType: 'Get External', localFile: '01000001.csv', processFilter: '.txt, .sh', status: true },
  { id: 'es8', provider: 'MSABS', description: 'Second Event Shipping using Msabs', eventType: 'Get External', localFile: '01000001.csv', processFilter: '.txt, .sh', status: true },
];