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
            studendId: 6,
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
            {
                id: 6,
                name: 'Bethina S. Moen',
                getAcademyMail: 'bethinasmoen@getacademy.com',
                discord: 'bethinasm',
                privateMail: 'bethinafakemail@gmail.com',
                tlf: '12345678'
            },
            {
                id: 7,
                name: 'Julie Maria V',
                getAcademyMail: 'juliemv@getacademy.com',
                discord: 'juliemariaaaa',
                privateMail: 'juliesfakemail@gmail.com',
                tlf: '11111111'
            },
            {
                id: 8,
                name: 'Nikita Tolok',
                getAcademyMail: 'nikitat@getacademy.com',
                discord: 'nikitato',
                privateMail: 'nikitatofakemail@gmail.com',
                tlf: '44444444'
            },
            {
                id: 9,
                name: 'Chris Frank',
                getAcademyMail: 'chrisfrank@getacademy.com',
                discord: 'chrisc',
                privateMail: 'chrisffakemail@gmail.com',
                tlf: '55555555'
            },
        ],

        studentStatus: [
            { id: 1, eventId: 1, courseId: 1, studentId: 1, date: '2024-04-17' },
            { id: 2, eventId: 2, courseId: 1, studentId: 1, date: '2024-04-28' },
            { id: 3, eventId: 3, courseId: 1, studentId: 1, date: '2024-08-06' },
            { id: 4, eventId: 5, courseId: 1, studentId: 1, date: '2025-01-10' },
            { id: 5, eventId: 1, courseId: 2, studentId: 4, date: '2024-12-14' },
            { id: 6, eventId: 2, courseId: 2, studentId: 4, date: '2024-12-22' },
            { id: 7, eventId: 3, courseId: 2, studentId: 4, date: '2025-01-20' },
            { id: 8, eventId: 1, courseId: 4, studentId: 1, date: '2024-12-19' },
            { id: 9, eventId: 2, courseId: 4, studentId: 1, date: '2025-01-04' },
            { id: 10, eventId: 3, courseId: 4, studentId: 1, date: '2025-01-20' },
            { id: 11, eventId: 1, courseId: 3, studentId: 8, date: '2024-11-25' },
            { id: 12, eventId: 2, courseId: 3, studentId: 8, date: '2024-12-02' },
            { id: 13, eventId: 3, courseId: 3, studentId: 8, date: '2025-01-20' },
            { id: 14, eventId: 1, courseId: 3, studentId: 9, date: '2025-01-02' },
            { id: 15, eventId: 2, courseId: 3, studentId: 9, date: '2025-01-05' },
            { id: 16, eventId: 3, courseId: 3, studentId: 9, date: '2025-01-20' },
            { id: 17, eventId: 1, courseId: 2, studentId: 2, date: '2025-01-03' },
            { id: 18, eventId: 2, courseId: 2, studentId: 2, date: '2025-01-11' },
            { id: 19, eventId: 3, courseId: 2, studentId: 2, date: '2025-01-20' },
            { id: 20, eventId: 4, courseId: 2, studentId: 2, date: '2025-03-26' },
            { id: 21, eventId: 1, courseId: 1, studentId: 6, date: '2024-05-31' },
            { id: 22, eventId: 2, courseId: 1, studentId: 6, date: '2024-06-07' },
            { id: 23, eventId: 3, courseId: 1, studentId: 6, date: '2024-08-10' },
            { id: 24, eventId: 1, courseId: 3, studentId: 6, date: '2024-12-15' },
            { id: 25, eventId: 5, courseId: 1, studentId: 6, date: '2025-01-10' },
            { id: 26, eventId: 2, courseId: 3, studentId: 6, date: '2024-12-18' },
            { id: 27, eventId: 3, courseId: 3, studentId: 6, date: '2025-01-20' },
            { id: 28, eventId: 1, courseId: 4, studentId: 6, date: '2025-04-04' },
            { id: 29, eventId: 1, courseId: 1, studentId: 7, date: '2024-03-22' },
            { id: 30, eventId: 2, courseId: 1, studentId: 7, date: '2024-04-10' },
            { id: 31, eventId: 3, courseId: 1, studentId: 7, date: '2024-08-10' },
            { id: 32, eventId: 1, courseId: 3, studentId: 7, date: '2024-12-18' },
            { id: 33, eventId: 2, courseId: 3, studentId: 7, date: '2025-01-03' },
            { id: 34, eventId: 5, courseId: 1, studentId: 7, date: '2025-01-10' },
            { id: 35, eventId: 3, courseId: 3, studentId: 7, date: '2024-01-20' },
            { id: 36, eventId: 1, courseId: 1, studentId: 3, date: '2024-12-18' },
            { id: 37, eventId: 2, courseId: 1, studentId: 3, date: '2025-01-04' },
            { id: 38, eventId: 3, courseId: 1, studentId: 3, date: '2025-01-20' },
            { id: 39, eventId: 1, courseId: 4, studentId: 3, date: '2025-04-04' },
            { id: 40, eventId: 1, courseId: 1, studentId: 5, date: '2023-12-19' },
            { id: 41, eventId: 2, courseId: 1, studentId: 5, date: '2024-01-02' },
            { id: 42, eventId: 3, courseId: 1, studentId: 5, date: '2024-01-20' },
            { id: 43, eventId: 5, courseId: 1, studentId: 5, date: '2024-06-20' },
            { id: 44, eventId: 1, courseId: 4, studentId: 5, date: '2024-05-02' },
            { id: 45, eventId: 2, courseId: 4, studentId: 5, date: '2024-05-11' },
            { id: 46, eventId: 3, courseId: 4, studentId: 5, date: '2024-08-10' },
            { id: 47, eventId: 5, courseId: 4, studentId: 5, date: '2025-01-10' },
            { id: 48, eventId: 3, courseId: 5, studentId: 5, date: '2025-01-20' },
        ],

        events: [
            { id: 1, name: 'Søkt' },
            { id: 2, name: 'Godkjent' },
            { id: 3, name: 'Startet' },
            { id: 4, name: 'Avbrutt' },
            { id: 5, name: 'Fullført' },
        ],

        courses: [
            { id: 1, name: 'Start It' },
            { id: 2, name: 'Frontend' },
            { id: 3, name: 'Fagskolen' },
            { id: 4, name: 'Get Prepared' },
            { id: 5, name: 'Get It' },
        ],

        payments: [
            { id: 1, courseId: 1, studentId: 1, amount: 200, date: '2024-12-14' },
            { id: 2, courseId: 1, studentId: 1, amount: 200, date: '2024-09-28' },
            { id: 3, courseId: 2, studentId: 1, amount: 3000, date: '2024-11-17' },
            { id: 4, courseId: 3, studentId: 2, amount: 5500, date: '2024-11-18' },
        ],
    },
}
