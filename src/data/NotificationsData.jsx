export const notificationsData = [
    {
        id: '1',
        title: 'Timesheet Pending',
        message: 'Please fill your timesheet for today before 8:00 PM.',
        type: 'timesheet',
        date: '2026-01-29',
        time: '6:30 PM',
        isRead: false,
    },
    {
        id: '2',
        title: 'Daily Task Update',
        message: 'Don’t forget to update your daily task details.',
        type: 'task',
        date: '2026-01-29',
        time: '10:00 AM',
        isRead: false,
    },
    {
        id: '3',
        title: 'Working Hours Reminder',
        message: 'You have logged 6.5 hours today. Minimum required is 8 hours.',
        type: 'working_hours',
        date: '2026-01-28',
        time: '5:45 PM',
        isRead: true,
    },
];
