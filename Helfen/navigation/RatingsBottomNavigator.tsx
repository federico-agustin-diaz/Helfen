import { createStackNavigator } from "@react-navigation/stack";
import React, { memo } from "react";
import RequestsInPast from "src/requests/RequestsInPass";
import RequestsSrc from "src/requests/RequestsSrc";

import { RequestsBottomStackParamList } from "./types";

const Stack = createStackNavigator<RequestsBottomStackParamList>();
const RatingsBottomNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="RequestsSrc"
    >
      <Stack.Screen name="RequestsSrc" component={RequestsSrc} />
    </Stack.Navigator>
  );
});
export default RatingsBottomNavigator;