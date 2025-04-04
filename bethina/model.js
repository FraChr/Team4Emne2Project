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
            studendId: 3,
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
            { id: 1, eventId: 1, courseId: 1, studentId: 1, date: '2024-08-10' },
            { id: 2, eventId: 3, courseId: 1, studentId: 2, date: '2024-12-14' },
            { id: 3, eventId: 3, courseId: 3, studentId: 3, date: '2024-12-14' }
        ],

        courses: [
            { id: 1, name: 'Start IT' },
            { id: 2, name: 'Frontend' },
            { id: 3, name: 'Fagskolen' },
            { id: 4, name: 'Get Prepared' },
            { id: 5, name: 'Get IT' },
        ],

        events: [
            { id: 1, name: 'Søkt' },
            { id: 2, name: 'Godkjent' },
            { id: 3, name: 'Startet' },
            { id: 4, name: 'Avbrutt' },
            { id: 5, name: 'Fullført' },
        ],

        payments: [
            { id: 1, courseId: 1, studentId: 1, amount: 200, date: '2024-12-14' },
            { id: 2, courseId: 1, studentId: 1, amount: 200, date: '2024-09-28' },
            { id: 3, courseId: 2, studentId: 1, amount: 3000, date: '2024-11-17' },
            { id: 4, courseId: 3, studentId: 2, amount: 5500, date: '2024-11-18' },
        ],
    },
}
