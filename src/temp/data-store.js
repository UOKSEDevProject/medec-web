import availableDc from '../assets/images/available-doctors.png';
import calender from '../assets/images/calendar.png';
import qr from '../assets/images/qr.png';
import labReport from '../assets/images/lab-report-portal.png';

export const DrData = [
    {firstName: 'Chanaka', lastName: 'Madushan', mediCenter: 'NineWells Hospital', specialties: 'General Practitioner', status: true, imageSrc: 'https://docs.google.com/uc?id=1Tey5rRf84gaJyR2e-fJJN_J015bAW-KN'},
    {firstName: 'Chanaka', lastName: 'Madushan', mediCenter: 'NineWells Hospital', specialties: 'General Practitioner', status: true, imageSrc: 'https://docs.google.com/uc?id=1Tey5rRf84gaJyR2e-fJJN_J015bAW-KN'},
    {firstName: 'Chanaka', lastName: 'Madushan', mediCenter: 'NineWells Hospital', specialties: 'General Practitioner', status: true, imageSrc: 'https://docs.google.com/uc?id=1Tey5rRf84gaJyR2e-fJJN_J015bAW-KN'},
    {firstName: 'Chanaka', lastName: 'Madushan', mediCenter: 'NineWells Hospital', specialties: 'General Practitioner', status: true, imageSrc: 'https://docs.google.com/uc?id=1Tey5rRf84gaJyR2e-fJJN_J015bAW-KN'},
    {firstName: 'Chanaka', lastName: 'Madushan', mediCenter: 'NineWells Hospital', specialties: 'General Practitioner', status: true, imageSrc: 'https://docs.google.com/uc?id=1Tey5rRf84gaJyR2e-fJJN_J015bAW-KN'},
    {firstName: 'Chanaka', lastName: 'Madushan', mediCenter: 'NineWells Hospital', specialties: 'General Practitioner', status: true, imageSrc: 'https://docs.google.com/uc?id=1Tey5rRf84gaJyR2e-fJJN_J015bAW-KN'},
    {firstName: 'Chanaka', lastName: 'Madushan', mediCenter: 'NineWells Hospital', specialties: 'General Practitioner', status: true, imageSrc: 'https://docs.google.com/uc?id=1Tey5rRf84gaJyR2e-fJJN_J015bAW-KN'},
    {firstName: 'Chanaka', lastName: 'Madushan', mediCenter: 'NineWells Hospital', specialties: 'General Practitioner', status: true, imageSrc: 'https://docs.google.com/uc?id=1Tey5rRf84gaJyR2e-fJJN_J015bAW-KN'},
];
export const userProfile ={
    tittle:'Mr',
    firstName:'Ovindu',
    lastName:'Archana',
    bloodGroup:'O+',
    country:'+94',
    phoneNumber:'771 230 708',
    birthDate:'2013-01-08',
    address:'Gabada weediya, Matara',
    description:'mama ovindu',
    profilePicture:'https://docs.google.com/uc?id=1shwxCvYocBMX-XM_knl-vyaSgxv0_lN7',
    QRCode:'https://docs.google.com/uc?id=1d2poPvYq9ZgiHis0MK4CWC_96WoNxjTE'
}
export const doctorProfile ={
    firstName:'Thilina',
    lastName:'Pahalagedara',
    specialization:'Orthopedist',
    profilePicture:'https://docs.google.com/uc?id=1qII4n9Up8Of7LjNf8GaaqE7sf5QxWHkh',
    sessions:[
        {
            hospitalName:'Asiri Hospital',
            sessionList:[
                {
                    time:'05.30PM',
                    date:'25/11/2021',
                    appointments:20,
                    maximumAppointments:20,
                },
                {
                    time:'05.30PM',
                    date:'25/11/2021',
                    appointments:5,
                    maximumAppointments:20,
                }
            ]

        },
        {
            hospitalName:'Navinna Hospital',
            sessionList:[
                {
                    time:'05.30PM',
                    date:'25/11/2021',
                    appointments:20,
                    maximumAppointments:20,
                },
                {
                    time:'05.30PM',
                    date:'25/11/2021',
                    appointments:5,
                    maximumAppointments:20,
                }
            ]

        },
        {
            hospitalName:'Navinna Hospital',
            sessionList:[
                {
                    time:'05.30PM',
                    date:'25/11/2021',
                    appointments:20,
                    maximumAppointments:20,
                },
                {
                    time:'05.30PM',
                    date:'25/11/2021',
                    appointments:5,
                    maximumAppointments:20,
                }
            ]

        }
    ]
}

export const searchList = [
    {label: 'hello', value: 'kekek'},
    {label: 'Hisks', value: 'asasa'},
    {label: 'helasaslo', value: 'saassd'},
]

export const homeContent = [
    {title: 'Add Doctors', content : 'Find doctors who are currently in hospitals near you', imgUrl: availableDc},
    {title: 'Add Lab Report', content : 'View your lab reports from one place', imgUrl: labReport},
    {title: 'Make an Appointment', content : 'Channel your doctor from here', imgUrl: calender},
    {title: 'Manage Doctor', content : 'View your lab reports from one place', imgUrl: qr},
]

export const availableDoctor = {name : "Dr. Ovindu Archana"}

