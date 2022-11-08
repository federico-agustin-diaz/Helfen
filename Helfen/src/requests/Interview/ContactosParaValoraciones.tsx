import React, { memo } from "react";
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
    console.log(Globales.variableGlobalCuidadoresConfirmados)
    return (
      <View style={styles.container}>
        {Globales.variableGlobalCuidadoresConfirmados === (undefined) || Globales.variableGlobalCuidadoresConfirmados == (null) || Globales.variableGlobalCuidadoresConfirmados.length == 0 ? (
          <EmptyData
            image={Images.emptyMess}
            title={("No hay Contactos Confirmados para Valorar.")}
            description={(" ")}
          />
        ) : (
          <View>
            {Globales.variableGlobalCuidadoresConfirmados.map((item, i) => {
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
