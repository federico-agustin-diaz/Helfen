import React, { memo } from "react";
import { View } from "react-native";
import {
  useTheme,
  useStyleSheet,
  Icon,
  StyleService,
} from "@ui-kitten/components";
import { MainBottomTabStackParamList } from "./types";
import Text from "components/Text";
import { globalStyle } from "styles/globalStyle";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MoreSrc from "src/more/MoreSrc";
import useLayout from "hooks/useLayout";
import FindSrc from "src/find/FindSrc";
import ModalRequest from "components/ModalRequest";
import useModal from "hooks/useModal";
import { Images } from "assets/images";
import MessagesSrc from "src/messages/MessagesSrc";
import RequestsBottomNavigator from "./RequestsBottomNavigator";
import RatingsBottomNavigator from "./RatingsBottomNavigator";
import CalendarNavigator from "./CalendarNavigator";
import MoreNavigator from "./MoreNavigator";
import Globales from "src/Globales";

interface ButtonTabProps {
  focused: boolean;
  icon: string;
  numberNotification?: number;
  onPress?: void;
}

const BottomTab = createBottomTabNavigator<MainBottomTabStackParamList>();

const MainBottomTab = memo(() => {
  const theme = useTheme();
  const { height, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { modalRef, show, hide } = useModal();
  const [contactName, setContactName] = React.useState("")
  const [familiarId, setFamiliarId] = React.useState(0)
  const [cuidadorId, setCuidadorId] = React.useState(0)
  const [cuidadorTelefono, setCuidadorTelefono] = React.useState(0)

  const checkRelations = () => {
    if (Globales.variableGlobalTipo == 2) {
    return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/contact/' + Globales.variableGlobalId, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data);
      if (data.possibleContacts.length > 0) {
        console.log(data.possibleContacts[0].carer.user.name)
        console.log(data.possibleContacts.length)
        setContactName(data.possibleContacts[0].familiar.user.name + " " + data.possibleContacts[0].carer.user.lastName)
        setFamiliarId(data.possibleContacts[0].familiar.id)
        Globales.set_variableGlobalFamiliaresPendientes(data.data.possibleContacts[0].familiar)
        //checkRelationsvar = true
        console.log(contactName)
        modalRef.current?.show();
      } else {
        //alert("No tienes nuevas relaciones pendientes.")
      }
    })
      .catch((error) => {
        alert("Hubo un error al obtener relaciones.")
        console.log("error")
        console.error(error);
      });
    } else if (Globales.variableGlobalTipo == 1) {
      console.log("entro a contacts")
      return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/contacts/' + Globales.variableGlobalId, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })
      .then((response) =>  response.json())
      .then((data) => {
        console.log(data);
        if (data.possibleContacts.length > 0) {
          console.log(data.possibleContacts[0].carer.user.name)
          var posiblesContactosSinFiltrar: any = []
          posiblesContactosSinFiltrar = data.possibleContacts
          console.log(posiblesContactosSinFiltrar)
          //creo que es false y false
          const posiblesContactos = posiblesContactosSinFiltrar.filter(item => item.contactConfirmated == true && item.relationConfirmated == false);
          console.log(posiblesContactos)
          var mapPosiblesContactos = posiblesContactos.map(item => item.carer)
          console.log("el map")
          console.log(mapPosiblesContactos)
          if (mapPosiblesContactos > 0) {
          Globales.set_variableGlobalCuidadoresPendientes(mapPosiblesContactos)
          console.log(Globales.variableGlobalCuidadoresPendientes)
          setContactName(Globales.variableGlobalCuidadoresPendientes[0].user.name + " " + Globales.variableGlobalCuidadoresPendientes[0].user.lastName)
          console.log(contactName)
          setCuidadorTelefono(Globales.variableGlobalCuidadoresPendientes[0].user.phoneNumber)
          setCuidadorId(Globales.variableGlobalCuidadoresPendientes[0].id)
          console.log(cuidadorTelefono)
          console.log(cuidadorId)
          modalRef.current?.show();
          }
        } else {
          alert("No tienes nuevas relaciones pendientes.")
        }
      })
        .catch((error) => {
          alert("Hubo un error al obtener relaciones.")
          console.log("error")
          console.error(error);
        });
    }
  }

  const findNotificationRelation = () => {
    return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/relation/' + Globales.variableGlobalId, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data);
      if (data.possibleContacts.length > 0) {
        var contactRelationFalseContactTrue = data.possibleContacts.filter((item) => item.contactConfirmated == true && item.relationConfirmated == false)
        console.log (contactRelationFalseContactTrue)
        console.log (Globales.variableGlobalId)
        console.log (contactRelationFalseContactTrue[0].familiar.id)
        var familiarID = contactRelationFalseContactTrue[0].familiar.id
        var familiarNombre = contactRelationFalseContactTrue[0].familiar.user.name + contactRelationFalseContactTrue[0].familiar.user.lastName
        console.log(familiarNombre)
        return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/relation/confirm', {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "carer": Globales.variableGlobalId,
        "familiar": familiarID,
        "relationConfirmated": true
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data);
      if (data.possibleContacts) {
        return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/events/?careId='+ Globales.variableGlobalId +'&familiarId=' + familiarID, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          }
        })
        .then((response) =>  response.json())
        .then((data) => {
          if (data.events > 0) {
          console.log(data);
          var eventId = data.events[0].id
          console.log(eventId)
          
          //agregar el accept
          return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/event/' + eventId, {
              method: 'PATCH',
              headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
              }
            })
            .then((response) =>  response.json())
            .then((data) => {
              console.log(data);
              if (data.event != null) {
              alert("Se confirmaron nuevos Eventos. Puede visualizarlos en el Calendario");
            } else {
              console.log("Hubo un error al confirmar evento")
            }
            })
              .catch((error) => {
                alert("Hubo un error al aceptar eventos.")
                console.log("error")
                console.error(error);
              });
          }
        })
          .catch((error) => {
            alert("Hubo un error al obtener eventos.")
            console.log("error")
            console.error(error);
          });
        //alert("Se confirmaron una nueva relacion con " + familiarNombre)
      } else {
        //alert("No tienes nuevas relaciones pendientes.")
      }
    })
      .catch((error) => {
        alert("Hubo un error al confirmar eventos.")
        console.log("error")
        console.error(error);
      });
        // console.log(contactName)
        // modalRef.current?.show();
      } else {
        //alert("No tienes nuevas relaciones pendientes.")
      }
    })
      .catch((error) => {
        alert("Hubo un error al obtener relaciones.")
        console.log("error")
        console.error(error);
      });
  }
  
//variableGlobalEventosCalendario

const getCalendarEvents = () => {
  if (Globales.variableGlobalTipo == 2) {
  return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/calendar/' + Globales.variableGlobalId, {
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    }
  })
  .then((response) =>  response.json())
  .then((data) => {
    console.log("Estos son los eventos del calendario")
    console.log(data);
    if (data.events.length > 0) {
      console.log(data.events)
      Globales.variableGlobalEventosCalendario = data.events
    } else {
      //alert("No tienes eventos en el calendario.")
    }
  })
    .catch((error) => {
      alert("Hubo un error al obtener eventos del calendario.")
      console.log("error")
      console.error(error);
    });
}
}
  const ButtonTab = React.useCallback(
    ({ focused, icon, numberNotification }: ButtonTabProps) => {
      React.useEffect(() => {
        if (focused && icon == "bookmark") {
          setTimeout(() => {
            checkRelations();
          }, 1200);
          clearTimeout();
        if (Globales.variableGlobalTipo == 2) {
            findNotificationRelation();
            getCalendarEvents();
        }
      } 
      }, [focused]);  
      return (
        <View
          style={{
            width: 40,
            height: 40,
            ...globalStyle.center,
          }}
        >
          {numberNotification ? (
            focused ? null : (
              <View style={styles.notification}>
                <Text center category="h9" status="primary">
                  {numberNotification}
                </Text>
              </View>
            )
          ) : null}
          <Icon
            pack="assets"
            name={!focused ? icon : `${icon}Active`}
            style={{
              width: 24,
              height: 24,
              tintColor: focused
                ? theme["button-basic-color"]
                : theme["text-placeholder-color"],
            }}
          />
        </View>
      );
    },
    [modalRef]
  );

  if (Globales.variableGlobalTipo == 1) {
    return (
      <View style={styles.container}>
        <BottomTab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarLabelStyle: styles.styleLabel,
            tabBarStyle: [
              styles.tabBarStyle,
              {
                height: (54 + bottom) * (height / 812),
              },
            ],
          }}
        >
          <BottomTab.Screen
            name="Buscar"
            component={FindSrc}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab
                  focused={focused}
                  icon="search"
                  numberNotification={undefined}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Solicitudes"
            component={RequestsBottomNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab
                  focused={focused}
                  icon="bookmark"
                  numberNotification={undefined}
                />
              ),
            }}
          />
           <BottomTab.Screen
            name="Ubicacion"
            component={RequestsBottomNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab
                  focused={focused}
                  icon="pinMap"
                  numberNotification={undefined}
                />
              ),
            }}
          />
           <BottomTab.Screen
            name="Valoraciones"
            component={RatingsBottomNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab
                  focused={focused}
                  icon="comment"
                  numberNotification={undefined}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Mas"
            component={MoreNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab focused={focused} icon="more" />
              ),
            }}
          />
        </BottomTab.Navigator>
        {/* Modal request job notification*/}
        <ModalRequest
          name={contactName}
          id={cuidadorId}
          telefono={cuidadorTelefono}
          ref={modalRef}
          avatar={Images.avatar3}
          isOnl={true}
          onDetails={hide}
        />
      </View>
    );
  } else if (Globales.variableGlobalTipo == 2) {
    return (
      <View style={styles.container}>
        <BottomTab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarLabelStyle: styles.styleLabel,
            tabBarStyle: [
              styles.tabBarStyle,
              {
                height: (54 + bottom) * (height / 812),
              },
            ],
          }}
        >
          <BottomTab.Screen
            name="Solicitudes"
            component={RequestsBottomNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab
                  focused={focused}
                  icon="bookmark"
                  numberNotification={undefined}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Calendario"
            component={CalendarNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab
                  focused={focused}
                  icon="calendar"
                  numberNotification={undefined}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="Mas"
            component={MoreNavigator}
            options={{
              tabBarIcon: ({ focused }) => (
                <ButtonTab focused={focused} icon="more" />
              ),
            }}
          />
        </BottomTab.Navigator>
        {/* Modal request job notification*/}
        <ModalRequest
          name={contactName}
          id={familiarId}
          ref={modalRef}
          avatar={Images.avatar3}
          isOnl={true}
          onDetails={hide}
        />
      </View>
    );
  }
});
export default MainBottomTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -44,
    paddingTop: 12,
  },
  styleLabel: {
    fontFamily: "GothamPro-Medium",
    fontSize: 11,
    lineHeight: 24,
  },
  buttonTab: {
    borderRadius: 12,
    height: 40,
    width: 40,
  },
  notification: {
    position: "absolute",
    borderRadius: 99,
    backgroundColor: "button-basic-color",
    width: 16,
    height: 16,
    zIndex: 10,
    top: 2,
    right: 1,
  },
});
