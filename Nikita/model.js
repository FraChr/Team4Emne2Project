const model = {
    app: {
        currentPage: 'mainPage',
    },

    inputs: {
        mainPage: {
            studentIds: [],
            selectedCurses: [1],
            selectedEvents: [1],
            //Nikita: add to model from here
            toDate: '2018-01-20',
            fromDate: '2017-01-20',
            semesterId: 1,
            //to here
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

        filteredStudents: [],

        studentStatus: [
            { id: 1, eventId: 1, courseId: 1, studentId: 1, date: '2024-12-14' },
            { id: 2, eventId: 5, courseId: 2, studentId: 1, date: '2024-02-04' },
            { id: 3, eventId: 3, courseId: 1, studentId: 2, date: '2024-12-14' },
            { id: 4, eventId: 3, courseId: 3, studentId: 3, date: '2024-12-14' },
            { id: 5, eventId: 4, courseId: 3, studentId: 4, date: '2024-12-14' },
        ],

        courses: [
            { id: 1, name: 'Start It' },
            { id: 2, name: 'Frontend' },
            { id: 3, name: 'Fagskolen' },
            { id: 4, name: 'Get Prepared' },
            { id: 5, name: 'Get It' },
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
        //Nikita: add to mmodel from here
        semesters: [
            {id: 1, name:'Vår 2017', start:'2017-01-20', end:'2017-07-20'},
            {id: 2, name:'Høst 2017', start:'2017-09-20', end:'2018-01-20'},
            {id: 3, name:'Vår 2018', start:'2018-01-20', end:'2018-07-20'},
            {id: 4, name:'Høst 2018', start:'2018-09-20', end:'2019-01-20'},
            {id: 5, name:'Vår 2019', start:'2019-01-20', end:'2019-07-20'},
            {id: 6, name:'Høst 2019', start:'2019-09-20', end:'2020-01-20'},
            {id: 7, name:'Vår 2020', start:'2020-01-20', end:'2020-07-20'},
            {id: 8, name:'Høst 2020', start:'2020-09-20', end:'2021-01-20'},
            {id: 9, name:'Vår 2021', start:'2021-01-20', end:'2021-07-20'},
            {id: 10, name:'Høst 2021', start:'2021-09-20', end:'2022-01-20'},
            {id: 11, name:'Vår 2022', start:'2022-01-20', end:'2022-07-20'},
            {id: 12, name:'Høst 2022', start:'2022-09-20', end:'2023-01-20'},
            {id: 13, name:'Vår 2023', start:'2023-01-20', end:'2023-07-20'},
            {id: 14, name:'Høst 2023', start:'2023-09-20', end:'2024-01-20'},
            {id: 15, name:'Vår 2024', start:'2024-01-20', end:'2024-07-20'},
            {id: 16, name:'Høst 2024', start:'2024-09-20', end:'2025-01-20'},
            {id: 17, name:'Vår 2025', start:'2025-01-20', end:'2025-07-20'},
            {id: 18, name:'Høst 2025', start:'2025-09-20', end:'2026-01-20'},
        ],
        // to here
    },
}
