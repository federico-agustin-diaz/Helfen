import React from "react";
import { View, ViewStyle, TouchableOpacity } from "react-native";

import Text from "components/Text";
import {
  useStyleSheet,
  StyleService,
  Layout,
  Avatar,
  useTheme,
} from "@ui-kitten/components";
import { AbilityProps, Onl_State_Types_Enum, CalendarEventito } from "constants/Types";
import { globalStyle } from "styles/globalStyle";
import ButtonFill from "components/ButtonFill";
import dayjs from "dayjs";
import useLayout from "hooks/useLayout";

interface AbilityItemProps {
  item: CalendarEventito;
  style?: ViewStyle;
  onPress?(): void;
  light?: boolean;
  onPressAdd?(): void;
}

const AbilityItem = ({
  item,
  style,
  light,
  onPressAdd,
  onPress,
}: AbilityItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const { width } = useLayout();
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={{ width: 300 * (width / 375) }}>
        {/* <Text category="h9-s" status="placeholder" mb={16}>
          {item.carer.services[0]}
        </Text> */}
        {item ? (
          <TouchableOpacity activeOpacity={0.54} onPress={onPress}>
            <Layout level={"2"} style={styles.content}>
              <View>
                <Text category="h8" status={"placeholder"}>
                {item.date}
                </Text>
                <Text category="h7" mv={8} status={"link"}>
                {item.name} 
                </Text>
                <Text category="h8-s"  mv={8}>{item.time}</Text>
                <Text category="h8-s" mv={8}>
                {item.localAddress} 
                </Text>
                <Text category="h8-s" mv={8}>
                  {item.notes}
                </Text>
              </View>
            </Layout>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPressAdd} activeOpacity={0.54}>
            <Layout
              level={"6"}
              style={[
                styles.noDataContent,
                {
                  backgroundColor: light
                    ? theme["color-success-300"]
                    : theme["background-basic-color-3"],
                  shadowColor: light ? "rgba(29, 30, 44, 0.61)" : undefined,
                },
              ]}
            >
              <Text
                category="h7"
                status={light ? "completed" : "placeholder"}
                mb={4}
              >
                Disponible
              </Text>
            </Layout>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AbilityItem;

const themedStyles = StyleService.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cuadrado: {
    padding: 20,
  },
  time: {},
  content: {
    borderRadius: 16,
    padding: 16,
    ...globalStyle.shadow,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noDataContent: {
    borderRadius: 16,
    padding: 16,
    ...globalStyle.shadow,
  },
  onlState: {
    position: "absolute",
    bottom: 16,
    right: 8,
  },
});
