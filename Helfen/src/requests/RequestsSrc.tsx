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
  DATA_CURRENT_BOOKING,
  DATA_CURRENT_INTERVIEW,
  DATA_PASS_BOOKING,
  DATA_PAST_INTERVIEW,
  DATA_TODAY_INTERVIEW
} from "constants/Data";
import { RequestsStackParamList } from "navigation/types";
import InterviewTab from "./Interview/InterviewTab";
import InterviewTabConfirmed from "./Interview/InterviewTabConfirmed";

import BookingsTab from "./Bookings/BookingsTab";
import ApplicationsTab from "./Applications/ApplicationsTab";
import Globales from "src/Globales";

const RequestsSrc = memo((lista: Array <any>) => {
  const { navigate } = useNavigation<NavigationProp<RequestsStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["requests", "common"]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const shouldLoadComponent = (index: number) => index === activeIndex;



  const ListFooterComponent = React.useCallback(() => {
    
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
          />
          {/* <InterviewTabConfirmed
          /> */}
          <ApplicationsTab />
        </ViewPager>
      </View>
    );
  }, [activeIndex]);
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

export default RequestsSrc;

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
