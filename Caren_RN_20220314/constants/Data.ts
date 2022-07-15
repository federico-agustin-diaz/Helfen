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
    name: "Marian Ramsey",
    title: "Regular afterschool child caregiver needed.",
    children: 1,
    online: true,
    avatar: Images.avatar1,
    ageType: "Toddler, Junior-High",
    location: "Rochester, NY",
    startTime: "Tue, Otc 14",
    hour: "08:00 - 12:00",
    applicants: 2,
    price: "$15-$25/hr",
    howOften: "Regularly",
    dayInWeek: [
      {
        title: "Sun",
        isActive: false,
      },
      {
        title: "Mon",
        isActive: false,
      },
      {
        title: "Tue",
        isActive: true,
      },
      {
        title: "Wed",
        isActive: true,
      },
      {
        title: "Thu",
        isActive: true,
      },
      {
        title: "Fri",
        isActive: false,
      },
      {
        title: "Sat",
        isActive: false,
      },
    ],
    mile: 2,
    mapLocation: {
      latitude: 37.793434,
      longitude: -122.413417,
    },
  },
  {
    id: 1,
    name: "Emily Clark",
    title: "Babysitting for a few hours",
    children: 2,
    online: false,
    avatar: Images.avatar2,
    ageType: "Toddler",
    location: "Manhattan, NY",
    startTime: "Tue, Otc 14",
    hour: "Flexible",
    applicants: 2,
    price: "$15-$25/hr",
    howOften: "Occasional",
    mile: 2,
    mapLocation: {
      latitude: 37.767734,
      longitude: -122.416417,
    },
  },
  {
    id: 2,
    name: "Mattie Harper",
    title: "Babysitting for two hours",
    children: 1,
    online: true,
    avatar: Images.avatar3,
    ageType: "Toddler",
    location: "Manhattan, NY",
    startTime: "Tue, Otc 14",
    hour: "Flexible",
    applicants: 2,
    price: "$15-$25/hr",
    howOften: "Occasional",
    mile: 3,
    mapLocation: {
      latitude: 37.774034,
      longitude: -122.399417,
    },
  },
  {
    id: 3,
    name: "Nina McGuire",
    title: "Babysitting for two hours",
    children: 1,
    online: true,
    avatar: Images.avatar4,
    ageType: "Toddler",
    location: "Manhattan, NY",
    startTime: "Tue, Otc 14",
    hour: "Flexible",
    applicants: 2,
    price: "$15-$25/hr",
    howOften: "Occasional",
    mile: 3,
    mapLocation: {
      latitude: 37.795934,
      longitude: -122.406417,
    },
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
    name: "Marian Ramsey",
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
    name: "Marian Ramsey",
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
export const DATA_CURRENT_INTERVIEW = [
  {
    id: 0,
    name: "Christine Bradley",
    time: new Date(),
    dateIn: "17:00 - 17:30",
    type: Request_Status_Type_Enum.Accepted,
    avatar: Images.avatar2,
    status: Onl_State_Types_Enum.Online,
  },
  {
    id: 1,
    name: "Lily McGee",
    time: new Date(),
    dateIn: "18:00 - 18:30",
    type: Request_Status_Type_Enum.Completed,
    avatar: Images.avatar3,
    status: Onl_State_Types_Enum.Offline,
  },
  {
    id: 1,
    name: "Lily Paris",
    time: new Date(),
    dateIn: "12:00 - 12:30",
    type: Request_Status_Type_Enum.Unconfirmed,
    avatar: Images.avatar,
    status: Onl_State_Types_Enum.Offline,
  },
];
export const DATA_CURRENT_BOOKING = [
  {
    user: { id: 1, name: "Christine Bradley", avatar: Images.avatar1 },
    onlineState: Onl_State_Types_Enum.JustLeave,
    type: Request_Status_Type_Enum.Unconfirmed,
    children: 1,
    mile: 2,
    ageType: "Toddler",
    startTime: new Date(),
    meetingTime: "08:00 - 12:00",
    location: "Rochester, NY",
    dayInWeek: [
      {
        title: "Sun",
        isActive: false,
      },
      {
        title: "Mon",
        isActive: false,
      },
      {
        title: "Tue",
        isActive: true,
      },
      {
        title: "Wed",
        isActive: true,
      },
      {
        title: "Thu",
        isActive: true,
      },
      {
        title: "Fri",
        isActive: false,
      },
      {
        title: "Sat",
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
    children: 2,
    mile: 2,
    ageType: "Toddler",
    startTime: new Date(),
    meetingTime: "08:00 - 12:00",
    location: "Rochester, NY",
    dayInWeek: [
      {
        title: "Sun",
        isActive: false,
      },
      {
        title: "Mon",
        isActive: false,
      },
      {
        title: "Tue",
        isActive: true,
      },
      {
        title: "Wed",
        isActive: true,
      },
      {
        title: "Thu",
        isActive: true,
      },
      {
        title: "Fri",
        isActive: false,
      },
      {
        title: "Sat",
        isActive: false,
      },
    ],
    price: "$15-$20/hr",
  },
  {
    user: { id: 1, name: "Lenora Collins", avatar: Images.avatar3 },
    onlineState: Onl_State_Types_Enum.Online,
    type: Request_Status_Type_Enum.Accepted,
    children: 1,
    mile: 2,
    ageType: "Toddler",
    startTime: new Date(),
    meetingTime: "09:00 - 09:30",
    location: "Rochester, NY",
    dayInWeek: [
      {
        title: "Sun",
        isActive: false,
      },
      {
        title: "Mon",
        isActive: true,
      },
      {
        title: "Tue",
        isActive: true,
      },
      {
        title: "Wed",
        isActive: true,
      },
      {
        title: "Thu",
        isActive: true,
      },
      {
        title: "Fri",
        isActive: true,
      },
      {
        title: "Sat",
        isActive: false,
      },
    ],
    price: "$15-$20/hr",
  },
];
export const DATA_CURRENT_APPLICATION = [
  {
    user: { id: 1, name: "Christine Bradley", avatar: Images.avatar1 },
    onlineState: Onl_State_Types_Enum.JustLeave,
    type: Request_Status_Type_Enum.Unconfirmed,
    children: 1,
    mile: 2,
    ageType: "Toddler",
    startTime: new Date(),
    meetingTime: "08:00 - 12:00",
    location: "Rochester, NY",
    jobDescription: "Regular afterschool child caregiver needed.",
    dayInWeek: [
      {
        title: "Sun",
        isActive: false,
      },
      {
        title: "Mon",
        isActive: false,
      },
      {
        title: "Tue",
        isActive: true,
      },
      {
        title: "Wed",
        isActive: true,
      },
      {
        title: "Thu",
        isActive: true,
      },
      {
        title: "Fri",
        isActive: false,
      },
      {
        title: "Sat",
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
    children: 1,
    mile: 2,
    ageType: "Toddler",
    startTime: new Date(),
    meetingTime: "08:00 - 12:00",
    location: "Rochester, NY",
    jobDescription: "Babysitting for a few hours in weekdays.",
    dayInWeek: [
      {
        title: "Sun",
        isActive: false,
      },
      {
        title: "Mon",
        isActive: false,
      },
      {
        title: "Tue",
        isActive: true,
      },
      {
        title: "Wed",
        isActive: true,
      },
      {
        title: "Thu",
        isActive: true,
      },
      {
        title: "Fri",
        isActive: false,
      },
      {
        title: "Sat",
        isActive: false,
      },
    ],
    price: "$15-$20/hr",
  },
  {
    user: { id: 2, name: "Ernest Park", avatar: Images.avatar6 },
    onlineState: Onl_State_Types_Enum.Online,
    type: Request_Status_Type_Enum.Completed,
    children: 1,
    mile: 2,
    ageType: "Toddler",
    startTime: new Date(),
    meetingTime: "08:00 - 12:00",
    location: "Rochester, NY",
    jobDescription: "Babysitting for a few hours in weekdays.",
    dayInWeek: [
      {
        title: "Sun",
        isActive: false,
      },
      {
        title: "Mon",
        isActive: false,
      },
      {
        title: "Tue",
        isActive: true,
      },
      {
        title: "Wed",
        isActive: true,
      },
      {
        title: "Thu",
        isActive: true,
      },
      {
        title: "Fri",
        isActive: false,
      },
      {
        title: "Sat",
        isActive: false,
      },
    ],
    price: "$15-$20/hr",
  },
];
export const ABILITY_DATA = [
  {
    id: 0,
    date: 1648647101000,
    title: "March 30 - April 6 ",
  },
  {
    id: 1,
    type: Request_Type_Enum.Interview,
    date: 1649338301000,
    meeting_time: "17:00 - 17:30",
    title: "April 7 - 13",
    user: {
      id: 1,
      name: "Christine Bradley",
      avatar: Images.avatar1,
      onlineState: Onl_State_Types_Enum.Online,
    },
  },
  {
    id: 2,
    type: Request_Type_Enum.Interview,
    date: 1649943101000,
    meeting_time: "12:00 - 12:30",
    title: "April 14 - 20",
    user: {
      id: 1,
      name: "Lela Ramos",
      avatar: Images.avatar4,
      onlineState: Onl_State_Types_Enum.Offline,
    },
  },
  {
    id: 3,
    date: 1650547901000,
    title: "April 21 - 27",
  },
  {
    id: 4,
    date: 1651152701000,
    title: "April 28 - May 4",
  },
];
