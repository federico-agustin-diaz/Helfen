import { createStackNavigator } from "@react-navigation/stack";
import React, { memo } from "react";
import RequestsInPast from "src/requests/RequestsInPass";
import RequestsSrc from "src/requests/RequestsSrc";

import { RequestsBottomStackParamList } from "./types";

interface RequestProps {
  lista: Array<any>;
}

const Stack = createStackNavigator<RequestsBottomStackParamList>();
const RequestsBottomNavigator = memo(({ lista }: RequestProps) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="RequestsSrc"
    >
      <Stack.Screen name="RequestsSrc" component={RequestsSrc} />
    </Stack.Navigator>
  );
});
export default RequestsBottomNavigator;
