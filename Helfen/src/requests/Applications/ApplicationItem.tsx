import React from "react";
import { View, TouchableOpacity } from "react-native";

import Text from "components/Text";
import {
  useStyleSheet,
  StyleService,
  Layout,
  Icon,
  Avatar,
  useTheme,
} from "@ui-kitten/components";
import { BookingItemProps } from "../components/BookingItem";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
import { Onl_State_Types_Enum } from "constants/Types";
import Weekdays from "src/find/components/Weekdays";
import dayjs from "utils/dayjs";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";
export interface ApplicationProps extends BookingItemProps {
  jobDescription: string;
}
export interface ApplicationItemProps {
  item: ApplicationProps;
}

const ApplicationItem = ({ item }: ApplicationItemProps) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const { width } = useLayout();
  const { t } = useTranslation(["requests", "common"]);
  return (
    <TouchableOpacity
      onPress={() => {
        navigate("RequestStack", {
          screen: "ApplicationDetails",
          params: { type: item.type },
        });
      }}
      activeOpacity={0.54}
    >
      <Layout style={styles.container} level="1">
        <Flex
          justify="flex-start"
          itemsCenter
          mv={16}
          mh={16}
          style={globalStyle.shadow}
        >
          <View
            style={[
              styles.onlineIcon,
              {
                backgroundColor:
                  item.onlineState === Onl_State_Types_Enum.Online
                    ? theme["color-success-100"]
                    : item.onlineState === Onl_State_Types_Enum.Offline
                    ? theme["color-basic-400"]
                    : item.onlineState === Onl_State_Types_Enum.LiveStream
                    ? theme["color-danger-100"]
                    : item.onlineState === Onl_State_Types_Enum.JustLeave
                    ? theme["color-primary-100"]
                    : theme["color-warning-100"],
              },
            ]}
          />
          <View>
            <Text category="h7" ml={16} maxWidth={231}>
              {item.user.name}
            </Text>
            <Text category="h8" ml={16} status={"warning"} mt={8}>
              {item.type}
            </Text>
          </View>
        </Flex>
        <Layout level={"2"} style={styles.bottom}>
          <Text category="h7" mb={16} numberOfLines={1} maxWidth={295} center>
            {item.jobDescription}
          </Text>
          <Flex justify="flex-start" itemsCenter mb={8}>
            <Icon pack="assets" name="baby" style={styles.icon} />
            <Text category="h8" ml={8}>
              {item.children} Children
            </Text>
            <View style={styles.dot} />
            <Text category="h8-s">{item.ageType}</Text>
          </Flex>
          <Flex justify="flex-start" itemsCenter mb={8}>
            <Icon pack="assets" name="location16" style={styles.icon} />
            <Text category="h8-s" ml={8}>
              {item.location}
            </Text>
            <View style={styles.dot} />
            <Text category="h8-s">{item.mile} miles</Text>
          </Flex>
          <Flex justify="flex-start">
            <Icon pack="assets" name="bookmarkActive" style={styles.icon} />
            <Flex>
              <View style={styles.startTime}>
                <Text category="h8" status={"placeholder"}>
                  Start
                </Text>
                <Text category="h8-s" status={"basic"}>
                  {dayjs(item.startTime).format("ddd, MMM DD")}
                </Text>
                <Weekdays data={item.dayInWeek} />
              </View>
              <View>
                <Text category="h8" status={"placeholder"}>
                  Hours
                </Text>
                <Text category="h8-s" status={"basic"}>
                  {item.meetingTime}
                </Text>
              </View>
            </Flex>
          </Flex>
          <Flex mt={12} mr={16}>
            <View
              style={[
                styles.tag,
                {
                  width: 92 * (width / 375),
                },
              ]}
            >
              <Text category="h9" status={"primary"}>
                {t("common:regularly")}
              </Text>
            </View>
            <Text category="h3">{item.price}</Text>
          </Flex>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );
};

export default ApplicationItem;

const themedStyles = StyleService.create({
  container: {
    marginBottom: 24,
    ...globalStyle.shadowFade,
    borderRadius: 16,
  },
  bottom: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: "background-basic-color-3",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: "text-placeholder-color",
  },
  dot: {
    backgroundColor: "text-placeholder-color",
    width: 3,
    height: 3,
    marginHorizontal: 8,
  },
  startTime: {
    marginLeft: 8,
    width: 124,
  },
  onlineIcon: {
    width: 14,
    height: 14,
    position: "absolute",
    borderRadius: 99,
    borderWidth: 2,
    borderColor: "background-basic-color-2",
    bottom: 0,
    left: 48,
  },
  tag: {
    paddingVertical: 8,
    marginLeft: 24,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 6,
    height: 30,
    backgroundColor: "button-basic-color",
  },
});
