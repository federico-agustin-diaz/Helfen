import React, { memo } from "react";
import { View } from "react-native";
import Text from "components/Text";
import { Icon, StyleService, useStyleSheet } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import Flex from "components/Flex";
import { Rating, AirbnbRating } from 'react-native-ratings';

interface PersonalProps {
  name: string;
  rating: number;
  trustedFamily: boolean;
  carePro: boolean;
  mt?: number;
  mb?: number;
  speciality: string;
}
const Personal = memo(
  ({ name, speciality, rating, trustedFamily, carePro, mt, mb }: PersonalProps) => {
    const { t } = useTranslation(["find", "common"]);
    const styles = useStyleSheet(themedStyles);
    return (
      <View style={[styles.container, { marginTop: mt, marginBottom: mb }]}>
        <Text category="h3" center mb={24}>
          {name}
        </Text>
        <Text category="h6" center mb={24}>
          {speciality}
        </Text>
        <Rating
            readonly
            //aca tenes que poner lo que te devuelve backend
            startingValue={rating}
            type='star'
            ratingCount={10}
            imageSize={20}
          />
        <Flex center mb={24}>
          {trustedFamily ? (
            <View style={styles.trusted}>
              <Icon pack="assets" name="bgCheck" />
              <Text mh={8} category="h9-s" status={"primary"}>
                {t("trustedFamily")}
              </Text>
            </View>
          ) : null}
          {carePro ? (
            <View style={styles.carePro}>
              <Icon pack="assets" name="premiumAcc" />
              <Text mh={8} category="h9-s" status={"primary"}>
                {t("carePro")}
              </Text>
            </View>
          ) : null}
        </Flex>
      </View>
    );
  }
);

export default Personal;

const themedStyles = StyleService.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "background-basic-color-3",
  },
  trusted: {
    flexDirection: "row",
    backgroundColor: "color-success-200",
    marginRight: 8,
    borderRadius: 8,
    padding: 4,
    alignItems: "center",
  },
  carePro: {
    flexDirection: "row",
    backgroundColor: "color-primary-300",
    borderRadius: 8,
    padding: 4,
    alignItems: "center",
  },
});
