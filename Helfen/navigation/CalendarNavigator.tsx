import { createStackNavigator } from "@react-navigation/stack";
import React, { memo } from "react";
import AvailabilitySrc from "src/calendar/AvailabilitySrc";
import CalendarSrc from "src/calendar/CalendarSrc";
import NotesSrc from "src/calendar/NotesSrc";

import { CalendarStackParamList } from "./types";

const Stack = createStackNavigator<CalendarStackParamList>();
const CalendarNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CalendarSrc"
    >
      <Stack.Screen name="CalendarSrc" component={CalendarSrc} />
      <Stack.Screen name="AvailabilitySrc" component={AvailabilitySrc} />
      <Stack.Screen name="NotesSrc" component={NotesSrc} />
    </Stack.Navigator>
  );
});
export default CalendarNavigator;
