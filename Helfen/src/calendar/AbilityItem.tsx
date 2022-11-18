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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CalendarStackParamList } from "navigation/types";

interface AbilityItemProps {
  item: CalendarEventito;
  style?: ViewStyle;
  light?: boolean;
}

const AbilityItem = ({
  item,
  style,
  light,
}: AbilityItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const { width } = useLayout();
  const theme = useTheme();
  const onPress = () => navigate("NotesSrc", { id: item.id, notes:item.notesFamiliar });
  const { navigate } = useNavigation<NavigationProp<CalendarStackParamList>>();

  return (
    <View style={[styles.container, style]}>
      <View style={{ width: 300 * (width / 375) }}>
        {/* <Text category="h9-s" status="placeholder" mb={16}>
          {item.carer.services[0]}
        </Text> */}
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
              </View>
            </Layout>
          </TouchableOpacity>
        
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
