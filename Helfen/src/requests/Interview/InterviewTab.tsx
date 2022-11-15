import React, { memo, useEffect } from "react";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import RequestInterviewItem from "../components/RequestInterviewItem";
import RequestInterviewItemConfirmed from "../components/RequestInterviewItemConfirmed";
import Text from "components/Text";
import { RequestPendientes, Request_Type_Enum } from "constants/Types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainBottomTabStackParamList } from "navigation/types";
import TitleList from "../components/TitleList";
import { View } from "react-native";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";
import EmptyData from "../components/EmptyData";
import Globales from "../../Globales"

const InterviewTab = memo(
  () => {
    const [listaDePendientes, setListaDePendientes] = React.useState([]);
    const [seSetearonLosPendientes, setSeSetearonLosPendientes] = React.useState(true);
    //esto deberia ser lo que muestre el numero de telefono del Cuidador a Familiar
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
        console.log("linea 39")
        console.log(data);
        if (data.possibleContacts.length > 0) {
          setListaDePendientes(data.possibleContacts)
          console.log("esta es la lista de pendientes")
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
            console.log("Entro al notification Relation")
            if (data.possibleContacts.length > 0) {
              var contactRelationFalseContactTrue = data.possibleContacts.filter((item) => item.contactConfirmated == true && item.relationConfirmated == false)
              listaDePendientes.push(contactRelationFalseContactTrue)
            }
          })
            .catch((error) => {
              console.log("error linea 61")
            });
        } else {
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
            console.log("Entro al notification Relation")
            if (data.possibleContacts.length > 0) {
              var contactRelationFalseContactTrue = data.possibleContacts.filter((item) => item.contactConfirmated == true && item.relationConfirmated == false)
              setListaDePendientes(contactRelationFalseContactTrue)
            }
          })
            .catch((error) => {
              console.log("error linea 61")
            });
        }
      })
        .catch((error) => {
          console.log("error linea 61")
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
            var posiblesContactosSinFiltrar: any = []
            posiblesContactosSinFiltrar = data.possibleContacts
            console.log("estos son los posibles sin filtrar de linea 97")
            console.log(posiblesContactosSinFiltrar)
            const posiblesContactos = posiblesContactosSinFiltrar.filter((item) => item.contactConfirmated == true && item.relationConfirmated == false);
            var mapPosiblesContactos = posiblesContactos.map(item => item.carer)
            console.log(mapPosiblesContactos)
            if (mapPosiblesContactos.length > 0) {
              console.log("entro al mapPosiblesContactos > 0")
              setListaDePendientes(mapPosiblesContactos)
              console.log("set varaibleGLobal")
            }
          } else {
            console.log("No tienes nuevas relaciones pendientes.")
          }
        })
          .catch((error) => {
            //alert("Hubo un error al obtener relaciones.")
            console.log("error linea 96")
            console.error(error);
          });
      }
    }
    useEffect(() => {
      if (seSetearonLosPendientes) {
        checkRelations()
        setSeSetearonLosPendientes(false)
        setInterval(checkRelations, 10000)
      }
    }, []);
    
    
    const { t } = useTranslation(["requests", "common"]);
    const { navigate } =
      useNavigation<NavigationProp<MainBottomTabStackParamList>>();
    const styles = useStyleSheet(themedStyles);
    console.log("listaPendientes")
    console.log(listaDePendientes)
    return (
      <View style={styles.container}>
        {listaDePendientes === (undefined) || listaDePendientes == (null) || listaDePendientes.length == 0 ? (
          <EmptyData
            image={Images.noInterview}
            title={t("noRequest")}
            description={t("noRequestTitle")}
          />
        ) : (
          <View>
            {listaDePendientes.map((item, i) => {
              if (Globales.variableGlobalTipo == 1) {
                return <RequestInterviewItem item={item.user} key={i} id={item.id} />;
                
              } else if (Globales.variableGlobalTipo == 2) {
                return <RequestInterviewItem item={item.familiar.user} key={i} />;
            }
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
