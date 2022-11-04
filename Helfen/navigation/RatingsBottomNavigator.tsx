import { createStackNavigator } from "@react-navigation/stack";
import React, { memo } from "react";
import RequestsInPast from "src/requests/RequestsInPass";
import RatingsSrc from "src/requests/RatingsSrc";

import { RatingsBottomStackParamList } from "./types";

const Stack = createStackNavigator<RatingsBottomStackParamList>();
const RatingsBottomNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="RatingsSrc"
    >
      <Stack.Screen name="RatingsSrc" component={RatingsSrc} />
    </Stack.Navigator>
  );
});
export default RatingsBottomNavigator;