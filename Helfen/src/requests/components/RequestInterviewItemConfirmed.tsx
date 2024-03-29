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
} from "constants/Types";
import { convertTime } from "utils/convertTime";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
import ButtonFill from "components/ButtonFill";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";

export interface InterviewItemProps {
  item: RequestInterviewItemProps;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

const RequestInterviewItemConfirmed = ({
  item,
  containerStyle,
  contentStyle,
}: InterviewItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      activeOpacity={0.54}
    >
      <Flex style={[contentStyle, styles.content]}>
        <View>
          <Text category="h7">{item.name}</Text>
          <Flex itemsCenter mv={8}>
            <Text category="h8-s" status={"placeholder"}>
              {convertTime(item.time)}
            </Text>
            <Layout style={styles.dot} level="5" />
            <Text category="h8-s" status={"placeholder"}>
              {item.dateIn}
            </Text>
          </Flex>
        </View>
      </Flex>
    </TouchableOpacity>
  );
};

export default RequestInterviewItemConfirmed;

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
