import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import ButtonOptional, {
  ButtonOptionalProps,
} from "./components/ButtonOptional";
import useToggle from "hooks/useToggle";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";
import HeaderMoreOption from "./components/HeaderMoreOption";

const MoreSrc = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["more", "common"]);

  const [darkMode, setDarkMode] = useToggle(false);
  const DATA_DETAILS: ButtonOptionalProps[] = [
    {
      title: t("myJobProfile"),
      icon: "myPost",
      status: "facebook",
      navigateSrc: "MyJobProfile",
    },
    {
      title: t("myStats"),
      icon: "stats",
      status: "warning",
      navigateSrc: "MyStats",
    },
  ];
  const DATA_APPLICATION: ButtonOptionalProps[] = [
    {
      title: t("setting"),
      icon: "setting",
      status: "twitter-3",
      navigateSrc: "MyJobProfile",
    },
    {
      title: t("aboutHelfen"),
      icon: "stats",
      status: "basic",
      navigateSrc: "MyJobProfile",
    },
    {
      title: t("helpFAQ"),
      icon: "helpWhite",
      status: "placeholder",
      navigateSrc: "MyJobProfile",
    },
    {
      title: t("boostProfileGuideline"),
      icon: "term",
      status: "green",
      navigateSrc: "ReferFriend",
    },
  ];
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Container style={styles.container}>
      <Content padder contentContainerStyle={styles.content}>
        <HeaderMoreOption
          name={"Edith Johnson"}
          avatar={Images.avatar2}
          email={"lehieuds@gmail.com"}
        />
        <View style={styles.details}>
          <Text category="h6">{t("myDetails")}</Text>
          {DATA_DETAILS.map((item, i) => {
            return (
              <ButtonOptional
                icon={item.icon}
                title={item.title}
                status={item.status}
                key={i}
                navigateSrc={item.navigateSrc}
              />
            );
          })}
          <ButtonOptional
            title={t("changeTheJobType")}
            icon={"changeJob"}
            status={"neutral"}
            navigateSrc={"ReferFriend"}
            onPress={() => {
              navigate("ChangeJobType");
            }}
          />
        </View>
        <View style={styles.application}>
          <Text category="h6">{t("application")}</Text>
          {DATA_APPLICATION.map((item, i) => {
            return (
              <ButtonOptional
                icon={item.icon}
                title={item.title}
                status={item.status}
                key={i}
                navigateSrc={item.navigateSrc}
              />
            );
          })}
          <ButtonOptional
            withToggle
            icon="darkMode"
            title={t("switchDarkMode")}
            status={"danger"}
            checked={darkMode}
            onPress={setDarkMode}
            navigateSrc={undefined}
          />
        </View>
      </Content>
    </Container>
  );
});

export default MoreSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 24,
    paddingBottom: 80,
  },

  details: {
    marginBottom: 48,
  },
  application: {},
});
