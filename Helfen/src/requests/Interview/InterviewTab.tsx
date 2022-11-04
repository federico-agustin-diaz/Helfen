import React, { memo } from "react";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import RequestInterviewItem from "../components/RequestInterviewItem";
import RequestInterviewItemConfirmed from "../components/RequestInterviewItemConfirmed";

import { RequestPendientes, Request_Type_Enum } from "constants/Types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainBottomTabStackParamList } from "navigation/types";
import TitleList from "../components/TitleList";
import { View } from "react-native";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";
import EmptyData from "../components/EmptyData";
import Globales from "../../Globales"

interface InterviewProps {
  dataPendientes: RequestPendientes[];
}

const InterviewTab = memo(
  ({ dataPendientes }: InterviewProps) => {
    const { t } = useTranslation(["requests", "common"]);
    const { navigate } =
      useNavigation<NavigationProp<MainBottomTabStackParamList>>();
    const styles = useStyleSheet(themedStyles);
    console.log("dataPendientes que le pase al interviewTab")
    console.log(dataPendientes)
    console.log(Globales.variableGlobalCuidadoresPendientes)
    const dataPendientesGlobales = Globales.variableGlobalTipo == 2 ? Globales.variableGlobalFamiliaresPendientes : Globales.variableGlobalCuidadoresPendientes;
    console.log(dataPendientesGlobales)
    return (
      <View style={styles.container}>
        {dataPendientesGlobales === (undefined) || dataPendientesGlobales == (null) || dataPendientesGlobales.length == 0 ? (
          <EmptyData
            image={Images.noInterview}
            title={t("noRequest")}
            description={t("noRequestTitle")}
          />
        ) : (
          <View>
            {dataPendientesGlobales.map((item, i) => {
              return <RequestInterviewItem item={item.user} key={i} />;
            })}
          </View>
        )}
      </View>
    );
  }
);

export default InterviewTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  empty: {},
});
