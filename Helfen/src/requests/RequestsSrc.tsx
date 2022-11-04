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

const RequestsSrc = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RequestsStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["requests", "common"]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const shouldLoadComponent = (index: number) => index === activeIndex;

  const [dataToday, setToday] = React.useState(DATA_TODAY_INTERVIEW);
  const [dataPendientes, setCurrent] = React.useState(DATA_TODAY_INTERVIEW);
  //const [dataPendientes, setCurrent] = Globales.variableGlobalTipo == 1 ? Globales.variableGlobalFamiliaresPendientes : Globales.variableGlobalCuidadoresPendientes;
  const [dataPast, setPast] = React.useState(DATA_PAST_INTERVIEW);
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var arrayCalendarEventsHoy = new Array(); 
  var arrayCalendarEventsPasados = new Array(); 
  var arrayCalendarEventsFuturos = new Array(); 

  // const mapGlobales = () => {
  //   Globales.variableGlobalEventosCalendario.forEach((element) =>  {
  //     element.stringDays.forEach((elementito) =>  {
  //       var datePart = elementito.match(/\d+/g),
  //       year = datePart[0],
  //       month = months[datePart[1]-1], 
  //       day = datePart[2];
  //       var dateFormatted = day+' de '+ month +' del '+year;
  //       var calendarObject = {
  //         dateParaElOrden: new Date(elementito),
  //         date: dateFormatted,
  //         name: element.familiar.user.name + " " + element.familiar.user.lastName,
  //         localAddress: element.familiar.user.localAddress,
  //         time: "Horario: Desde " + element.startEvent + " hasta las " + element.endEvent,
  //         notes: element.notes != "" ? ("Notas: " + element.notes) : ("No se detallaron Notas")
  //       }
  //       console.log(calendarObject.dateParaElOrden )
  //       console.log(calendarObject.dateParaElOrden > new Date())
  //       if (calendarObject.dateParaElOrden == new Date()) {
  //         arrayCalendarEventsHoy.push(calendarObject)
  //       } else if (calendarObject.dateParaElOrden > new Date()) {
  //         arrayCalendarEventsFuturos.push(calendarObject)
  //       } else if (calendarObject.dateParaElOrden < new Date()) {
  //         arrayCalendarEventsPasados.push(calendarObject)
  //       }
  //     }
  //     );
  //   }
  //   );
  //   // arrayCalendarEvents.sort(function(a,b){
  //   //   return (a.dateParaElOrden) - (b.dateParaElOrden)
  //   // })
  //   //falta ordenar segun la fecha
  // }

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
          <InterviewTabConfirmed
            dataTodayRequest = {dataToday}
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
          tabs={Globales.variableGlobalTipo == 1 ? [t("interview"), t("applications")] : [t("sin confirmar")]}
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
