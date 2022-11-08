import { createStackNavigator } from "@react-navigation/stack";
import React, { memo } from "react";
import LocationSrc from "src/requests/LocationSrc";

import { LocationBottomStackParamList } from "./types";

const Stack = createStackNavigator<LocationBottomStackParamList>();
const LocationBottomNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LocationSrc"
    >
      <Stack.Screen name="LocationSrc" component={LocationSrc} />
    </Stack.Navigator>
  );
});
export default LocationBottomNavigator;