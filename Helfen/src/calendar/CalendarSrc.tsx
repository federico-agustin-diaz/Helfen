import React, { memo } from "react";
import { ImageBackground } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import Flex from "components/Flex";
import ButtonFill from "components/ButtonFill";
import AbilityItem from "./AbilityItem";
import { ABILITY_DATA } from "constants/Data";
import { CalendarStackParamList } from "navigation/types";

const CalendarSrc = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["calendar", "common"]);

  const DATA_SUGGESTION = [
    { title: t("suggestDescription1"), id: 0 },
    { title: t("suggestDescription2"), id: 1 },
    { title: t("suggestDescription3"), id: 2 },
  ];
  const getCurrentDate=()=>{
 
    var date = new Date().getDate();
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let monthName = months[new Date().getMonth()];
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    return ('El dia de hoy es ' + date + ' ' + monthName + ' ' + year).toString()
}
  const { navigate } = useNavigation<NavigationProp<CalendarStackParamList>>();
  const onPressAbility = () => navigate("AvailabilitySrc", { type: "Edit" });
  const onPressAddAbility = () => navigate("AvailabilitySrc", { type: "Add" });
  return (
    <Container style={styles.container}>
      <TopNavigation title={t("title").toString()} />
      <Content padder contentContainerStyle={styles.content}>
        {/* <ImageBackground
          source={Images.bgSuggestion}
          style={[
            styles.img,
            {
              width: width - 48,
              height: 130 * (height / 812),
            },
          ]}
          imageStyle={{}}
        >
          <Text category="h2" mt={20} status="primary" mb={12}>
            {t("suggestTitle")}
          </Text>
        </ImageBackground> */}
        <Text category="h6" mb={24}>
          {(getCurrentDate())}
        </Text>
        {ABILITY_DATA.map((item, i) => {
          return (
            <AbilityItem
              item={item}
              key={i}
              light={i === 0}
              onPress={onPressAbility}
              onPressAdd={onPressAddAbility}
            />
          );
        })}
      </Content>
      {/* <ButtonFill
        icon="plusImg"
        status="warning"
        size="large"
        style={[styles.addButton, { bottom: bottom + 32 }]}
      /> */}
    </Container>
  );
});

export default CalendarSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    //paddingTop: 32,
    paddingBottom: 80,
  },
  img: {
    alignSelf: "center",
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 99,
    marginTop: 8,
  },
  addButton: {
    position: "absolute",
    right: 24,
  },
});
const DATA_CALENDAR = [
  {
    id: 0,
    time_start: new Date(),
    list: [{ id: 0, time: "SEPTEMBER 30 - OCTOBER 6 " }],
  },
  {
    id: 1,
    time_start: new Date().getTime() + 518400000,
    list: [
      {
        weekend: "SEPTEMBER 30 - OCTOBER 6",
        title: "Cristina Gomez",
        meeting_time: "17:00 - 17:30",
      },
      {
        weekend: "OCTOBER 7 - 13",
      },
      {
        weekend: "OCTOBER 14 - 20",
      },
      {
        weekend: "OCTOBER 21 - 27",
      },
    ],
  },
];
