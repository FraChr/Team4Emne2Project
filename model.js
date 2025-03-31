const model = {
    app: {
        currentPage: 'mainPageChris',
    },

    inputs: {
        mainPage: {
            studentIds: [],
            toDate: '',
            fromDate: '',
        },
        payment: {
            amount: '',
            date: ''
        },
        // kanskje fjerne studentPage
        studentPage: {
            studendId: '',
            paymentAmount: '',
            paymentDate: '',
        },
    },

    data: {
        students: [
            {
                id: 1,
                name: 'Kari Mortensen',
                getAcademyMail: 'karimo@getacademy.no',
                discord: 'kariM',
                privateMail: 'karim@gmail.com',
                tlf: '25224515'
            },
            {
                id: 2,
                name: 'Siri Tippestad',
                getAcademyMail: 'siritip@getacademy.no',
                discord: 'tipp',
                privateMail: 'siri.tipp@gmail.com',
                tlf: '22222222'
            },
            {
                id: 3,
                name: 'Kristoffer Lillesand',
                getAcademyMail: 'kristofferlill@getacademy.no',
                discord: 'kulekristoffer',
                privateMail: 'kulekristofferlill@gmail.com',
                tlf: '98444428'
            },
            {
                id: 4,
                name: 'Brian Wolfrick',
                getAcademyMail: 'brianwo@getacademy.no',
                discord: 'wolfy',
                privateMail: 'brianwolf@hotmail.com',
                tlf: '25364913'
            },
            {
                id: 5,
                name: 'Turid Williamson',
                getAcademyMail: 'turidwill@getacademy.no',
                discord: 'emogirly',
                privateMail: 'turid.williamson@icloud.com',
                tlf: '25227777'
            },
        ],

        studentStatus: [
            { id: 1, eventId: 1, courseId: 1, studentId: 1, date: '2024-12-14' },
            { id: 1, eventId: 1, courseId: 2, studentId: 1, date: '2024-02-04' },
            { id: 2, eventId: 3, courseId: 1, studentId: 2, date: '2024-12-14' },
            { id: 3, eventId: 3, courseId: 3, studentId: 3, date: '2024-12-14' },
            { id: 4, eventId: 4, courseId: 3, studentId: 4, date: '2024-12-14' }
        ],

        courses: [
            { id: 1, name: 'Start It' },
            { id: 2, name: 'Frontend' },
            { id: 3, name: 'Fagskolen' },
            { id: 4, name: 'Get Prepared' },
            { id: 5, name: 'Get It' },
        ],

        events: [
            { id: 1, name: 'applied' },
            { id: 2, name: 'approved' },
            { id: 3, name: 'started' },
            { id: 4, name: 'cancelled' },
            { id: 5, name: 'completed' },
        ],

        payments: [
            { id: 1, courseId: 1, studentId: 1, amount: 200, date: '2024-12-14' },
            { id: 2, courseId: 1, studentId: 1, amount: 200, date: '2024-09-28' },
            { id: 3, courseId: 2, studentId: 1, amount: 3000, date: '2024-11-17' },
            { id: 4, courseId: 3, studentId: 2, amount: 5500, date: '2024-11-18' },
        ],
    },
}
