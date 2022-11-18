import React, { memo, useEffect } from "react";
import { ImageBackground, View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";
import EmptyData from "src/requests/components/EmptyData";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import Flex from "components/Flex";
import ButtonFill from "components/ButtonFill";
import AbilityItem from "./AbilityItem";
import { ABILITY_DATA } from "constants/Data";
import { CalendarStackParamList } from "navigation/types";
import Globales from "src/Globales";

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
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var arrayCalendarEventsVAR = new Array(); 
  const [arrayCalendarEvents, setarrayCalendarEvents] = React.useState(arrayCalendarEventsVAR);
  
  const [seSetearonLosConfirmados, setSeSetearonLosConfirmados] = React.useState(true);
  const mapGlobales = () => {
    console.log("entro al mapGlobales")
    console.log(Globales.variableGlobalEventosCalendario)
    Globales.variableGlobalEventosCalendario.forEach((element) =>  {
      element.stringDays.forEach((elementito) =>  {
        var datePart = elementito.match(/\d+/g),
        year = datePart[0],
        month = months[datePart[1]-1], 
        day = datePart[2];
        var dateFormatted = day+' de '+ month +' del '+year;
        var calendarObject = {
          id: element.id,
          dateParaElOrden: new Date(elementito),
          date: dateFormatted,
          name: element.familiar.user.name + " " + element.familiar.user.lastName,
          localAddress: element.localAddress,
          time: "Horario: Desde " + element.startEvent + " hasta las " + element.endEvent,
          notesFamiliar: element.notes != "" ? (element.notes) : ("No se detallaron Notas")
        }
        console.log(calendarObject)
        arrayCalendarEventsVAR.push(calendarObject)
      }
      );
    }
    );
    arrayCalendarEventsVAR.sort(function(a,b){
      return (a.dateParaElOrden) - (b.dateParaElOrden)
    })
    console.log("este es el array de calendar eventsVAR")
    console.log(arrayCalendarEventsVAR)
    if (arrayCalendarEventsVAR.length > 0) {
      setarrayCalendarEvents(arrayCalendarEventsVAR)
      arrayCalendarEventsVAR = []
    }
    console.log("este es el array de calendar events")
    console.log(arrayCalendarEvents)
    //falta ordenar segun la fecha
  }
  React.useEffect(() => {
    if (seSetearonLosConfirmados) {
      mapGlobales()
      setSeSetearonLosConfirmados(false)
      setInterval(mapGlobales, 10000)
    }
  }, []);  

  
  return (
    <Container style={styles.container}>
      <TopNavigation title={t("title").toString()} />
      <Content padder contentContainerStyle={styles.content}>
        <Text category="h6" mb={24}>
          {(getCurrentDate())}
        </Text>
        {arrayCalendarEvents === (undefined) || arrayCalendarEvents == (null) || arrayCalendarEvents.length == 0 ? (
          <EmptyData
            image={Images.noBooking}
            title={"No tienes Eventos agendados"}
            description={t(" ")}
          />
        ) : (
          <View>
            {arrayCalendarEvents.map((item, i) => {
          return (
            <AbilityItem
              item={item}
              key={i}
              light={i === 0}
            />
          );
        })}
          </View>
        )}
      </Content>
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
    list: [{ id: 0, time: "Octubre 30 - Noviembre 6 " }],
  },
  {
    id: 1,
    time_start: new Date().getTime() + 518400000,
    list: [
      {
        weekend: "Octubre 30 - Noviembre 6",
        title: "Cristina Gomez",
        meeting_time: "17:00 - 17:30",
      },
      {
        weekend: "Noviembre 7 - 13",
      },
      {
        weekend: "Noviembre 14 - 20",
      },
      {
        weekend: "Noviembre 21 - 27",
      },
    ],
  },
];
