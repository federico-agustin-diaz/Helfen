import React, { memo } from "react";
import { View, TextInput } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Button,
  Layout,
} from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
import dayjs from "utils/dayjs";
import { Request_Status_Type_Enum } from "constants/Types";
import { InterviewDetailsScreenNavigationProp } from "navigation/types";
import UserField from "../components/UserField";

const InterviewDetails = memo(() => {
  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["requests", "common"]);

  const route = useRoute<InterviewDetailsScreenNavigationProp>();
  const StatusRequest = route.params.type;

  const onAddToCalendar = () => {};
  const onSendMessage = () => {};
  const onAccept = () => {};
  const onDecline = () => {};

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("requestDetails").toString()}
        accessoryLeft={<NavigationAction />}
      />
      <Content padder contentContainerStyle={styles.content}>
        <Text category="h6" mv={24}>
          {"Brinde su Valoracion"}
        </Text>
        <Rating
            startingValue={0}
            type='star'
            ratingCount={10}
            imageSize={33}
          />
        <View style={styles.additional}>
          <Text category="h6">{("Deje una reseña")}</Text>
          <TextInput mt={16}>
          </TextInput>
        </View>
        
      </Content>
      {StatusRequest == Request_Status_Type_Enum.Completed ||
      StatusRequest == Request_Status_Type_Enum.Accepted ? (
        <Layout
          level="2"
          style={{ marginBottom: bottom + 8, paddingHorizontal: 24 }}
        >
          <Button
            children={t("Enviar").toString()}
            style={[globalStyle.shadowBtn]}
            onPress={onSendMessage}
          />
        </Layout>
      ) : null}
      {StatusRequest === Request_Status_Type_Enum.Unconfirmed ? (
        <Flex level="2" style={styles.bottom} padder pb={bottom + 8}>
          <Button
            children={t("common:decline").toString()}
            status="outline"
            style={globalStyle.flexOne}
            onPress={onDecline}
          />
          <Button
            children={t("common:accept").toString()}
            style={[globalStyle.flexOne, { marginLeft: 16 }]}
            onPress={onAccept}
          />
        </Flex>
      ) : null}
    </Container>
  );
});

export default InterviewDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingBottom: 120,
  },
  personal: {
    padding: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    ...globalStyle.shadow,
    marginBottom: 40,
  },
  cancelInterview: {
    alignSelf: "center",
    marginBottom: 40,
  },
  dot: {
    width: 2,
    height: 2,
    marginHorizontal: 8,
    alignSelf: "center",
  },
  contact: {
    marginBottom: 40,
  },
  iconCalendar: {
    ...globalStyle.icon16,
    tintColor: "text-placeholder-color",
    marginRight: 8,
  },
  details: {
    marginVertical: 40,
  },
  additional: {
    top: 40,
    marginBottom: 40,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...globalStyle.shadowFade,
    paddingTop: 14,
    ...globalStyle.topBorder24,
  },
});
