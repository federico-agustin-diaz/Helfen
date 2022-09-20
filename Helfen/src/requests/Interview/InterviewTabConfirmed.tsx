import React, { memo } from "react";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import RequestInterviewItem from "../components/RequestInterviewItem";
import RequestInterviewItemConfirmed from "../components/RequestInterviewItemConfirmed";

import { RequestInterviewItemProps, Request_Type_Enum } from "constants/Types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainBottomTabStackParamList } from "navigation/types";
import TitleList from "../components/TitleList";
import { View } from "react-native";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";
import EmptyData from "../components/EmptyData";

interface InterviewProps {
  dataCurrentRequest: RequestInterviewItemProps[];
  dataPassRequest: RequestInterviewItemProps[];
}

const InterviewTabConfirmed = memo(
  ({ dataTodayRequest, dataCurrentRequest, dataPassRequest }: InterviewProps) => {
    const { t } = useTranslation(["requests", "common"]);
    const { navigate } =
      useNavigation<NavigationProp<MainBottomTabStackParamList>>();
    const styles = useStyleSheet(themedStyles);

    const onSeeAllPast = () => {
      navigate("Requests", {
        screen: "RequestsInPast",
        params: { requestType: Request_Type_Enum.Interview },
      });
    };

    return (
      <View style={styles.container}>
        {dataCurrentRequest && dataPassRequest === undefined ? (
          <EmptyData
            image={Images.noInterview}
            title={t("noRequest")}
            description={t("noRequestTitle")}
          />
        ) : (
          <View>
            <TitleList current={"actuales"} />
            {dataTodayRequest.map((item, i) => {
              return <RequestInterviewItemConfirmed item={item} key={i} />;
            })}
            <TitleList current={"realizados"} />
            {dataCurrentRequest.map((item, i) => {
              return <RequestInterviewItemConfirmed item={item} key={i} />;
            })}
            <TitleList
              current={"futuros"}
              //dataLength={dataPassRequest.length}
              mt={20}
              onSeeAll={onSeeAllPast}
            />
            {dataPassRequest.map((item, i) => {
              return <RequestInterviewItemConfirmed item={item} key={i} />;
            })}
          </View>
        )}
      </View>
    );
  }
);

export default InterviewTabConfirmed;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  empty: {},
});
