import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Avatar,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { MainBottomTabStackParamList } from "navigation/types";
import { Images } from "assets/images";
import ProfileTag from "./components/ProfileTab";

const ProfileSrc = memo(() => {
  const { navigate } =
    useNavigation<NavigationProp<MainBottomTabStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["profile", "common"]);

  const _onEdit = () => navigate("More", { screen: "EditProfile" });
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("title").toString()}
        accessoryLeft={<NavigationAction />}
        accessoryRight={<NavigationAction icon="edit" onPress={_onEdit} />}
      />
      <Content contentContainerStyle={styles.content} padder>
        <ProfileTag label={t("fullName")} title="Edith Johnson" />
        <ProfileTag label={t("common:email")} title="lehieuds@gmail.com" />
        <ProfileTag
          label={t("Password")}
          title="Edith Johnson"
          secureTextEntry
        />
        <ProfileTag label={t("phoneNumber")} title="965-954-9111" />
        <ProfileTag
          label={t("homeAddress")}
          title="128 Lincoln St #105, Boston, NY"
        />
      </Content>
    </Container>
  );
});

export default ProfileSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 40,
  },
  avatar: {
    alignSelf: "center",
    marginBottom: 48,
  },
});
