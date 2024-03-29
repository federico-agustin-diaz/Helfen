import React from "react";
import { View, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import Text from "components/Text";
import {
  useStyleSheet,
  StyleService,
  Avatar,
  Layout,
} from "@ui-kitten/components";
import {
  Onl_State_Types_Enum,
  RequestInterviewItemProps,
  RequestPendientes,
} from "constants/Types";
import { convertTime } from "utils/convertTime";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
import ButtonFill from "components/ButtonFill";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";
import Globales from "src/Globales";

export interface InterviewItemProps {
  item: RequestPendientes;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  id?: number;
}

const RequestInterviewItem = ({
  item,
  containerStyle,
  contentStyle,
  id
}: InterviewItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const onCrearEvento = React.useCallback(() => {
    if (Globales.variableGlobalTipo == 1) {
      console.log(id)
    navigate("RequestStack", {
      screen: "ConfirmEventInputs",
      params: { id: id },
    })
  }
  }, []);
  console.log(item)
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      activeOpacity={0.54}
      onPress={onCrearEvento}
    >
      <Flex style={[contentStyle, styles.content]}>
        <View>
          <Text category="h7">{item.name + " " + item.lastName}</Text>
        </View>
      </Flex>
    </TouchableOpacity>
  );
};

export default RequestInterviewItem;

const themedStyles = StyleService.create({
  container: {
    marginBottom: 24,
    backgroundColor: "background-basic-color-2",
    borderRadius: 16,
    padding: 16,
    ...globalStyle.shadow,
  },
  content: {
    alignItems: "center",
  },
  dot: {
    width: 2,
    height: 2,
    marginHorizontal: 8,
  },
  fillIcon: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
