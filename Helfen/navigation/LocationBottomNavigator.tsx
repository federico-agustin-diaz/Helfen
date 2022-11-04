import { createStackNavigator } from "@react-navigation/stack";
import React, { memo } from "react";
import RequestsSrc from "src/requests/RequestsSrc";

import { LocationBottomStackParamList } from "./types";

const Stack = createStackNavigator<LocationBottomStackParamList>();
const LocationBottomNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LocationSrc"
    >
      <Stack.Screen name="LocationSrc" component={RequestsSrc} />
    </Stack.Navigator>
  );
});
export default LocationBottomNavigator;