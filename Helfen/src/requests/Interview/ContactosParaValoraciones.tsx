import React, { memo, useEffect } from "react";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

import ContactosParaValoracionesItem from "../components/ContactosParaValoracionesItem";
import Text from "components/Text";

import { JobItemPropsPosta, Request_Type_Enum } from "constants/Types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainBottomTabStackParamList } from "navigation/types";
import { View } from "react-native";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";
import EmptyData from "../components/EmptyData";
import Globales from "src/Globales";

const ContactosParaValoraciones = memo(
  () => {
    const styles = useStyleSheet(themedStyles);

    const [seSetearonLosConfirmados, setSeSetearonLosConfirmados] = React.useState(true);
    const [listaDeConfirmados, setListaDeConfirmados] = React.useState([]);

    const getContactosConfirmados = () => {
      return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/relations/' + Globales.variableGlobalId, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          }
        })
        .then((response) =>  response.json())
        .then((data) => {
          console.log("Estos son los Cuidadores Confirmados para pedir los Reviews")
          console.log(data);
          if (data.possibleContacts.length > 0) {
            console.log(data.possibleContacts)
            setListaDeConfirmados(data.possibleContacts.map(item => item.carer))
            console.log(setListaDeConfirmados)
          } else {
            console.log("no tiene contactos confirmados")
          }
        })
          .catch((error) => {
            //alert("Hubo un error al obtener eventos del calendario.")
            console.log("error 249")
            console.error(error);
          });
  }
    useEffect(() => {
      if (seSetearonLosConfirmados) {
        getContactosConfirmados()
        setSeSetearonLosConfirmados(false)
        setInterval(getContactosConfirmados, 10000)
      }
    }, []);

    return (
      <View style={styles.container}>
        {listaDeConfirmados === (undefined) || listaDeConfirmados == (null) || listaDeConfirmados.length == 0 ? (
          <EmptyData
            image={Images.emptyMess}
            title={("No hay Contactos Confirmados para Valorar.")}
            description={(" ")}
          />
        ) : (
          <View>
            {listaDeConfirmados.map((item, i) => {
              return <ContactosParaValoracionesItem item={item.user} id={item.id} key={1} />;
            })}
          </View>
        )}
      </View>
    );
  }
);

export default ContactosParaValoraciones;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  text: {
    paddingBottom:20
  },
  empty: {},
});
