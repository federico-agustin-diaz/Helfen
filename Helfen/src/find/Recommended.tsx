import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import JobItem from "./components/JobItem";
import { RECOMMEND_DATA } from "constants/Data";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";
import Globales from "src/Globales";

const Recommended = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {Globales.variableGlobalCuidadores.map((item, i) => {
        console.log(item)
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              navigate("FindStack", {
                screen: "JobDetails",
                params: { name: item.user.name, rating: item.carerId },
              });
            }}
          >
            <JobItem item={item} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export default Recommended;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});
