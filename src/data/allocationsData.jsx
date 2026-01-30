export const allocationsData = {
    header: {
        title: 'Allocations',
        searchPlaceholder: 'Search project...',
    },

    tabs: [
        { id: 1, label: 'Active', count: 1 },
        { id: 2, label: 'Upcoming', count: 0 },
        { id: 3, label: 'Inactive', count: 0 },
    ],

    projects: [
        {
            id: 1,
            shortName: 'Ia',
            name: 'Internship and Training',
            subText: 'Kunal Bhardwaj',

            details: [
                {
                    id: 1,
                    label: 'Allocation Date',
                    value: 'Jan 7, 2026 - Dec 31, 2027',
                    icon: require('../assets/img/date.png'),
                },
                {
                    id: 2,
                    label: 'Allocation Percentage',
                    value: '100%',
                    icon: require('../assets/img/allocation.png'),
                },
            ],

            progress: 100,
        },
    ],
};
