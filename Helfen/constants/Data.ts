import { Images } from "assets/images";
import { IMessage } from "react-native-gifted-chat";
import {
  MessagesItemProps,
  Onl_State_Types_Enum,
  Request_Status_Type_Enum,
  Request_Type_Enum,
} from "./Types";

export const RECOMMEND_DATA = [
  {
    id: 0,
    name: "Marcela Lopez",
    title: "",
    services: ["Tecnicas Hemlich", "Higiene y confort"],
    online: true,
    avatar: Images.avatar1,
    ageType: "Toddler, Junior-High",
    location: "Rochester, NY",
    startTime: "Mar, Otc 14",
    hour: "08:00 - 12:00",
    applicants: 2,
    price: "$15-$25/hr",
    howOften: "Regularly",
    dayInWeek: [
      {
        title: "Domingo",
        isActive: false,
      },
      {
        title: "Lunes",
        isActive: false,
      },
      {
        title: "Martes",
        isActive: true,
      },
      {
        title: "Miercoles",
        isActive: true,
      },
      {
        title: "Jueves",
        isActive: true,
      },
      {
        title: "Viernes",
        isActive: false,
      },
      {
        title: "Sabado",
        isActive: false,
      },
    ],
    mile: 2,
    mapLocation: {
      latitude: 37.793434,
      longitude: -122.413417,
    },
    rating: 4,
  },
  {
    id: 1,
    name: "Alex Falcon",
    title: "Babysitting for a few hours",
    services: ["Higiene y Confort", "Primeros Auxilios", "Acompañamiento en rehabilitación"],
    online: false,
    avatar: Images.avatar2,
    ageType: "Toddler",
    location: "Manhattan, NY",
    startTime: "Mar, Otc 14",
    hour: "Flexible",
    applicants: 2,
    price: "$15-$25/hr",
    howOften: "Occasional",
    mile: 2,
    mapLocation: {
      latitude: 37.767734,
      longitude: -122.416417,
    },
    rating: 7.5,
  },
  {
    id: 2,
    name: "Ariana Foressi",
    title: "Babysitting for two hours",
    services: ["Higiene y Confort", "Tecnicas Hemlich"],
    online: true,
    avatar: Images.avatar3,
    ageType: "Toddler",
    location: "Manhattan, NY",
    startTime: "Mar, Otc 14",
    hour: "Flexible",
    applicants: 2,
    price: "$15-$25/hr",
    howOften: "Occasional",
    mile: 3,
    mapLocation: {
      latitude: 37.774034,
      longitude: -122.399417,
    },
    rating: 8,
  },
  {
    id: 3,
    name: "Federico Diaz",
    title: "Babysitting for two hours",
    services: ["Higiene y Confort", "Tecnicas Hemlich"],
    online: true,
    avatar: Images.avatar4,
    ageType: "Toddler",
    location: "Manhattan, NY",
    startTime: "Mar, Otc 14",
    hour: "Flexible",
    applicants: 2,
    price: "$15-$25/hr",
    howOften: "Occasional",
    mile: 3,
    mapLocation: {
      latitude: 37.795934,
      longitude: -122.406417,
    },
    rating: 6,
  },
];
export const DATA_CHAT: IMessage[] = [
  {
    _id: 0,
    createdAt: new Date(),
    text: "Yup! I love it! 😍",
    user: {
      _id: 2,
      name: "React Native",
      avatar: Images.avatar1,
    },
  },
  {
    _id: 2,
    /* @ts-ignore */
    text: null,
    image: "https://i.ibb.co/T1GZtfv/bg.png",
    createdAt: 1644919257000,
    user: {
      _id: 1,
      name: "React Native",
      avatar: Images.avatar,
    },
  },
  {
    _id: 1,
    text: "😍 Thank you so much!",
    createdAt: 1644919257000,
    user: {
      _id: 1,
      name: "React Native",
      avatar: Images.avatar,
    },
  },

  {
    _id: 3,
    text: `Hi Mattie. That’s great! 😍 Thanks so much for lettering me know.`,
    createdAt: 1644515257000,
    user: {
      _id: 2,
      name: "React Native",
      avatar: Images.avatar1,
    },
  },
  {
    _id: 5,
    createdAt: 1646919257000,
    text: `Hi Marian. We’re having a great day! John eat all of his lunch!`,
    user: {
      _id: 1,
      name: "React Native",
      avatar: Images.avatar,
    },
  },
];
export const DATA_MESSAGES: MessagesItemProps[] = [
  {
    id: 0,
    name: "Marcela Lopez",
    title: "Yup! I love it!",
    readed: false,
    time: "09:40",
    isWeb: false,
    onlineState: Onl_State_Types_Enum.Online,
    avatar: Images.avatar,
  },
  {
    id: 1,
    name: "Mattie Harper",
    title: "Thanks so much for lettering. I love u so much.",
    readed: true,
    time: "09:40",
    isWeb: true,
    onlineState: Onl_State_Types_Enum.Offline,
    avatar: Images.avatar1,
  },
  {
    id: 2,
    name: "Lela Ramos",
    title: "Yes. I know. Thanks",
    readed: true,
    time: "Mon",
    isWeb: false,
    onlineState: Onl_State_Types_Enum.JustLeave,
    avatar: Images.avatar2,
  },
  {
    id: 3,
    name: "Ida Grant",
    title: "OK. See you soon!",
    readed: true,
    time: "Otc 2",
    isWeb: false,
    onlineState: Onl_State_Types_Enum.Online,
    avatar: Images.avatar3,
  },
  {
    id: 4,
    name: "Josie Andrews",
    title: "Yay!",
    readed: true,
    time: "Sep 31",
    isWeb: false,
    onlineState: Onl_State_Types_Enum.LiveStream,
    avatar: Images.avatar4,
  },
  {
    id: 6,
    name: "Bertie Reid",
    title: "Good to hear that.",
    readed: true,
    time: "Sep 25",
    isWeb: false,
    onlineState: Onl_State_Types_Enum.Online,
    avatar: Images.avatar6,
  },
  {
    id: 7,
    name: "Hannah McKenzie",
    title: "Yes. Thanks!",
    readed: true,
    time: "Sep 22",
    isWeb: false,
    onlineState: Onl_State_Types_Enum.Online,
    avatar: Images.avatar6,
  },
];
export const DATA_PAST_INTERVIEW = [
  {
    id: 0,
    name: "Ann Nash",
    time: 1570496225000,
    dateIn: "17:00 - 17:30",
    type: Request_Status_Type_Enum.Completed,
    avatar: Images.avatar,
    status: Onl_State_Types_Enum.Online,
  },
  {
    id: 1,
    name: "Marcela Lopez",
    time: 1569718625000,
    dateIn: "18:00 - 18:30",
    type: Request_Status_Type_Enum.Accepted,
    avatar: Images.avatar1,
    status: Onl_State_Types_Enum.Online,
  },
  {
    id: 2,
    name: "Lela Ramos",
    time: 1567385825000,
    dateIn: "11:00 - 11:30",
    type: Request_Status_Type_Enum.Completed,
    avatar: Images.avatar4,
    status: Onl_State_Types_Enum.Offline,
  },
  {
    id: 3,
    name: "Ida Grant",
    time: 1567385825000,
    dateIn: "15:00 - 15:30",
    type: Request_Status_Type_Enum.Declined,
    avatar: Images.avatar5,
    status: Onl_State_Types_Enum.Online,
  },
  {
    id: 3,
    name: "Ida Grant",
    time: 1567385825000,
    dateIn: "15:00 - 15:30",
    type: Request_Status_Type_Enum.Canceled,
    avatar: Images.avatar7,
    status: Onl_State_Types_Enum.Online,
  },
  {
    id: 3,
    name: "Josie Andrews",
    time: 1567385825000,
    dateIn: "15:00 - 15:30",
    type: Request_Status_Type_Enum.Declined,
    avatar: Images.avatar8,
    status: Onl_State_Types_Enum.Online,
  },
];
export const DATA_TODAY_INTERVIEW = [
  {
    id: 0,
    name: "Federico Diaz",
    time: new Date(),
    dateIn: "17:00 - 17:30",
    type: Request_Status_Type_Enum.Accepted,
    avatar: Images.avatar2,
    status: Onl_State_Types_Enum.Online,
  },
];
export const DATA_CURRENT_INTERVIEW = [
  {
    id: 0,
    name: "Cristina Gomez",
    time: new Date(2022,10,29),
    dateIn: "17:00 - 17:30",
    type: Request_Status_Type_Enum.Accepted,
    avatar: Images.avatar2,
    status: Onl_State_Types_Enum.Online,
  },
  {
    id: 1,
    name: "Ariana Foressi",
    time: new Date(2022,10,30),
    dateIn: "18:00 - 18:30",
    type: Request_Status_Type_Enum.Completed,
    avatar: Images.avatar3,
    status: Onl_State_Types_Enum.Offline,
  },
  {
    id: 1,
    name: "Alex Falcon",
    time: new Date(2022,11,5),
    dateIn: "12:00 - 12:30",
    type: Request_Status_Type_Enum.Unconfirmed,
    avatar: Images.avatar,
    status: Onl_State_Types_Enum.Offline,
  },
];
export const DATA_CURRENT_BOOKING = [
  {
    user: { id: 1, name: "Cristina Gomez", avatar: Images.avatar1 },
    onlineState: Onl_State_Types_Enum.JustLeave,
    type: Request_Status_Type_Enum.Unconfirmed,
    services: ["Tecnicas RCP", "Tecnicas Hemlich"],
    mile: 2,
    ageType: "Toddler",
    startTime: new Date(),
    meetingTime: "08:00 - 12:00",
    location: "Rochester, NY",
    dayInWeek: [
      {
        title: "Domingo",
        isActive: false,
      },
      {
        title: "Lunes",
        isActive: false,
      },
      {
        title: "Martes",
        isActive: true,
      },
      {
        title: "Miercoles",
        isActive: true,
      },
      {
        title: "Jueves",
        isActive: true,
      },
      {
        title: "Viernes",
        isActive: false,
      },
      {
        title: "Sabado",
        isActive: false,
      },
    ],
    price: "$15-$20/hr",
  },
];
export const DATA_PASS_BOOKING = [
  {
    user: { id: 1, name: "Ernest Park", avatar: Images.avatar8 },
    onlineState: Onl_State_Types_Enum.JustLeave,
    type: Request_Status_Type_Enum.Completed,
    services: ["Tecnicas RCP", "Tecnicas Hemlich"],
    mile: 2,
    ageType: "Toddler",
    startTime: new Date(),
    meetingTime: "08:00 - 12:00",
    location: "Rochester, NY",
    dayInWeek: [
      {
        title: "Domingo",
        isActive: false,
      },
      {
        title: "Lunes",
        isActive: false,
      },
      {
        title: "Martes",
        isActive: true,
      },
      {
        title: "Miercoles",
        isActive: true,
      },
      {
        title: "Jueves",
        isActive: true,
      },
      {
        title: "Viernes",
        isActive: false,
      },
      {
        title: "Sabado",
        isActive: false,
      },
    ],
    price: "$15-$20/hr",
  },
  {
    user: { id: 1, name: "Lenora Collins", avatar: Images.avatar3 },
    onlineState: Onl_State_Types_Enum.Online,
    type: Request_Status_Type_Enum.Accepted,
    services: ["Tecnicas RCP", "Tecnicas Hemlich"],
    mile: 2,
    ageType: "Toddler",
    startTime: new Date(),
    meetingTime: "09:00 - 09:30",
    location: "Rochester, NY",
    dayInWeek: [
      {
        title: "Domingo",
        isActive: false,
      },
      {
        title: "Lunes",
        isActive: false,
      },
      {
        title: "Martes",
        isActive: true,
      },
      {
        title: "Miercoles",
        isActive: true,
      },
      {
        title: "Jueves",
        isActive: true,
      },
      {
        title: "Viernes",
        isActive: false,
      },
      {
        title: "Sabado",
        isActive: false,
      },
    ],
    price: "$15-$20/hr",
  },
];
export const DATA_CURRENT_APPLICATION = [
  {
    user: { id: 1, name: "Cristina Gomez", avatar: Images.avatar1 },
    onlineState: Onl_State_Types_Enum.JustLeave,
    type: Request_Status_Type_Enum.Unconfirmed,
    services: ["Tecnicas RCP", "Tecnicas Hemlich"],
    mile: 2,
    ageType: "Toddler",
    startTime: new Date(),
    meetingTime: "08:00 - 12:00",
    location: "Rochester, NY",
    jobDescription: "Regular afterschool child caregiver needed.",
    dayInWeek: [
      {
        title: "Domingo",
        isActive: false,
      },
      {
        title: "Lunes",
        isActive: false,
      },
      {
        title: "Martes",
        isActive: true,
      },
      {
        title: "Miercoles",
        isActive: true,
      },
      {
        title: "Jueves",
        isActive: true,
      },
      {
        title: "Viernes",
        isActive: false,
      },
      {
        title: "Sabado",
        isActive: false,
      },
    ],
    price: "$15-$20/hr",
  },
];
export const DATA_PASS_APPLICATION = [
  {
    user: { id: 1, name: "Dollie Haynes", avatar: Images.avatar4 },
    onlineState: Onl_State_Types_Enum.JustLeave,
    type: Request_Status_Type_Enum.Unconfirmed,
    services: ["Tecnicas RCP", "Tecnicas Hemlich"],
    mile: 2,
    ageType: "Toddler",
    startTime: new Date(),
    meetingTime: "08:00 - 12:00",
    location: "Rochester, NY",
    jobDescription: "Babysitting for a few hours in weekdays.",
    dayInWeek: [
      {
        title: "Domingo",
        isActive: false,
      },
      {
        title: "Lunes",
        isActive: false,
      },
      {
        title: "Martes",
        isActive: true,
      },
      {
        title: "Miercoles",
        isActive: true,
      },
      {
        title: "Jueves",
        isActive: true,
      },
      {
        title: "Viernes",
        isActive: false,
      },
      {
        title: "Sabado",
        isActive: false,
      },
    ],
    price: "$15-$20/hr",
  },
  {
    user: { id: 2, name: "Ernest Park", avatar: Images.avatar6 },
    onlineState: Onl_State_Types_Enum.Online,
    type: Request_Status_Type_Enum.Completed,
    services: ["Tecnicas RCP", "Tecnicas Hemlich"],
    mile: 2,
    ageType: "Toddler",
    startTime: new Date(),
    meetingTime: "08:00 - 12:00",
    location: "Rochester, NY",
    jobDescription: "Babysitting for a few hours in weekdays.",
    dayInWeek: [
      {
        title: "Domingo",
        isActive: false,
      },
      {
        title: "Lunes",
        isActive: false,
      },
      {
        title: "Martes",
        isActive: true,
      },
      {
        title: "Miercoles",
        isActive: true,
      },
      {
        title: "Jueves",
        isActive: true,
      },
      {
        title: "Viernes",
        isActive: false,
      },
      {
        title: "Sabado",
        isActive: false,
      },
    ],
    price: "$15-$20/hr",
  },
];
export const ABILITY_DATA = [
  {
    id: 0,
    date: new Date(2022,10,25),
    title: "25 Octubre - 2 Noviembre",
  },
  {
    id: 1,
    type: Request_Type_Enum.Interview,
    date: new Date(2022,11,4),
    meeting_time: "17:00 - 17:30",
    title: "2 Noviembre - 9 Noviembre",
    user: {
      id: 1,
      name: "Cristina Gomez",
      avatar: Images.avatar1,
      onlineState: Onl_State_Types_Enum.Online,
    },
  },
  {
    id: 2,
    type: Request_Type_Enum.Interview,
    date: new Date(2022,11,11),
    meeting_time: "12:00 - 12:30",
    title: "9 Noviembre - 16 Noviembre",
    user: {
      id: 1,
      name: "Vanina Aranda",
      avatar: Images.avatar4,
      onlineState: Onl_State_Types_Enum.Offline,
    },
  },
  {
    id: 3,
    date: new Date(2022,11,16),
    title: "16 Noviembre - 23 Noviembre",
  }
];
