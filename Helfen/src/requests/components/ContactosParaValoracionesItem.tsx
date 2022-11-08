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

export interface ContactosParaValoracionesItemProps {
  item: RequestPendientes;
  id: number;
}

const ContactosParaValoracionesItem = ({
  item, id
}: ContactosParaValoracionesItemProps) => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={[styles.container]}
      activeOpacity={0.54}
      onPress={() => {
        navigate("RequestStack", {
          screen: "RatingDetails",
          params: { name: item.name + " " + item.lastName, id: id },
        });
      }}
    >
      <Flex style={[styles.content]}>
        <View>
          <Text category="h7">{item.name + " " + item.lastName}</Text>
        </View>
      </Flex>
    </TouchableOpacity>
  );
};

export default ContactosParaValoracionesItem;

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
