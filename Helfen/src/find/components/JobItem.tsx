import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import Text from "components/Text";
import { Rating, AirbnbRating } from 'react-native-ratings';

import {
  Avatar,
  Icon,
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
import Weekdays from "./Weekdays";
import { JobItemPropsPosta } from "constants/Types";
import useLayout from "hooks/useLayout";

interface ItemProps {
  item: JobItemPropsPosta;
}

const JobItem = memo(({ item }: ItemProps) => {
  const {
    services,
    qualification,
    user,
    distance
  } = item;
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const { width } = useLayout();
  return (
    <Layout style={styles.container} level="1">
      <Flex
        justify="flex-start"
        itemsCenter
        mv={16}
        mh={16}
        style={globalStyle.shadow}
      >
        {/* <Avatar source={avatar} size="medium" shape="square" /> */}
        {/* <View
          style={[
            styles.onlineIcon,
            {
              backgroundColor: !online
                ? theme["color-warning-100"]
                : theme["color-success-100"],
            },
          ]}
        /> */}
        <Text category="h5" ml={16} maxWidth={231} lineHeight={24}>
          {user.name+ " " +user.lastName}
        </Text>
      </Flex>
      <Layout level={"2"} style={styles.bottom}>
        <Flex justify="flex-start" itemsCenter mb={8}>
          <Icon pack="assets" name="baby" style={styles.icon} />
          <Text category="h6" ml={5} mr={40}>
            Servicios Proporcionados: {services.join(",  ")}
          </Text>
          
        </Flex>
        <Flex justify="flex-start" itemsCenter mb={8}>
          <Icon pack="assets" name="map" style={styles.icon} />
          <Text category="h7" ml={5} mr={0}>
          {distance.toFixed(0) + "km de distancia"}
          </Text>
        </Flex>
        
          <Rating
            readonly
            //aca tenes que poner lo que te devuelve backend
            startingValue={qualification}
            type='star'
            ratingCount={5}
            imageSize={20}
          />
      </Layout>
    </Layout>
  );
});

export default JobItem;

const themedStyles = StyleService.create({
  container: {
    marginBottom: 24,
    ...globalStyle.shadow,
    borderRadius: 16,
  },
  bottom: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: "background-basic-color-3",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "text-placeholder-color",
    marginLeft: 16,
  },
  dot: {
    backgroundColor: "text-placeholder-color",
    width: 3,
    height: 3,
    marginHorizontal: 8,
  },
  startTime: {
    marginLeft: 8,
    marginRight: 16,
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
    marginLeft: 40,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 6,
    height: 30,
  },
});
