import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import JobItem from "./components/JobItem";
import { RECOMMEND_DATA } from "constants/Data";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";

const Recommended = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {RECOMMEND_DATA.map((item, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              navigate("FindStack", {
                screen: "JobDetails",
                params: { name: item.name },
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
