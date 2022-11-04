import React, { memo } from "react";
import { View, FlatList } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  ViewPager,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Container from "components/Container";
import { globalStyle } from "styles/globalStyle";
import keyExtractor from "utils/keyExtractor";
import BasicTabBar from "components/BasicTabBar";
import {
  DATA_PAST_INTERVIEW,
  DATA_TODAY_INTERVIEW
} from "constants/Data";
import { RequestsStackParamList } from "navigation/types";
import InterviewTab from "./Interview/InterviewTab";
import InterviewTabConfirmed from "./Interview/InterviewTabConfirmed";

import BookingsTab from "./Bookings/BookingsTab";
import ApplicationsTab from "./Applications/ApplicationsTab";
import Globales from "src/Globales";

const RatingsSrc = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RequestsStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["requests", "common"]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const shouldLoadComponent = (index: number) => index === activeIndex;

  const [dataToday, setToday] = React.useState(DATA_TODAY_INTERVIEW);
  const [dataPendientes, setCurrent] = React.useState(DATA_TODAY_INTERVIEW);
  const [dataPast, setPast] = React.useState(DATA_PAST_INTERVIEW);

  const ListFooterComponent = React.useCallback(() => {
    //mapGlobales();
    return (
      <View style={styles.footer}>
        <ViewPager
          selectedIndex={activeIndex}
          onSelect={setActiveIndex}
          style={[globalStyle.flexOne]}
          swipeEnabled={false}
          shouldLoadComponent={shouldLoadComponent}
        >
          <InterviewTab
            dataCurrentRequest={dataPendientes}
            dataPassRequest={dataPast}
          />

          <ApplicationsTab />
        </ViewPager>
      </View>
    );
  }, [activeIndex, dataPendientes, dataPast]);
  const ListHeaderComponent = React.useCallback(() => {
    return (
      <Layout>
        <BasicTabBar
          style={styles.tabBar}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          tabs={[t("")]}
        />
      </Layout>
    );
  }, [activeIndex]);

  return (
    <Container style={styles.container}>
      <TopNavigation title={t("title").toString()} />
      <FlatList
        renderItem={() => <></>}
        stickyHeaderIndices={[0]}
        keyExtractor={keyExtractor}
        data={[0]}
        contentContainerStyle={styles.content}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
});

export default RatingsSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {},
  tabBar: {
    marginTop: 12,
    paddingHorizontal: 12,
  },
  footer: {
    marginHorizontal: 24,
    paddingBottom: 40,
  },
});
