import { createStackNavigator } from "@react-navigation/stack";
import React, { memo } from "react";
import JobDetails from "src/find/JobDetails";
import ViewOnMap from "src/find/ViewOnMap";
import ViewOnMapVivo from "src/find/ViewOnMapVivo";

import { FindStackParamList } from "./types";

const Stack = createStackNavigator<FindStackParamList>();
const FindNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ViewOnMap"
    >
      <Stack.Screen name="ViewOnMap" component={ViewOnMap} />
      <Stack.Screen name="ViewOnMapVivo" component={ViewOnMapVivo} />
      <Stack.Screen name="JobDetails" component={JobDetails} />
    </Stack.Navigator>
  );
});
export default FindNavigator;
