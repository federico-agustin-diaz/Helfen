import React from "react";
import { View, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import Text from "components/Text";
import {
  useStyleSheet,
  StyleService,
  Avatar,
  Layout,
} from "@ui-kitten/components";
import {
  Onl_State_Types_Enum,
  RequestInterviewItemProps,
  RequestPendientes,
} from "constants/Types";
import { convertTime } from "utils/convertTime";
import Flex from "components/Flex";
import { globalStyle } from "styles/globalStyle";
import ButtonFill from "components/ButtonFill";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";
import Globales from "src/Globales";
import ViewOnMap from "src/find/ViewOnMap";
export interface ContactosParaUbicarItemProps {
  item: RequestPendientes;
  id: number;
}

const ContactosParaUbicarItem = ({
  item, id
}: ContactosParaUbicarItemProps) => {
    const onMap = React.useCallback(() => {
        navigate('FindStack', {screen: 'ViewOnMapVivo'});
      }, []);
    const getNumeroDia = () => {
        const d = new Date();
        return d.getDay().toString;
    }
    console.log(getNumeroDia())
    console.log(Globales.variableGlobalId)
    console.log(id)
    const getUbicacion = () => {
        return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/location?familiarId=' + Globales.variableGlobalId + '&carerId=' + id + '&eventDay=' + getNumeroDia(), {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })
      .then((response) =>  response.json())
      .then((data) => {
        console.log(data)
        if (data.latitude != null) {
            var latitudeFloat = parseFloat(data.latitude);
            var longitudeFloat = parseFloat(data.longitude);
            Globales.set_variableGlobalLatitude(latitudeFloat)
            Globales.set_variableGlobalLongitude(longitudeFloat)
            onMap();
        }
        if (data.message == "400 Bad Request Error. Event not found.") {
            return alert("No hay Eventos registrados a esta hora y dia.")
          }
        if (data.latitude == null) {
            return alert("El cuidador todavia no dio su ubicacion.")
        }
          console.log("se obtuvo la ubi")
      })
        .catch((error) => {
          console.log("error")
          console.error(error);
        });
    }
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={[styles.container]}
      activeOpacity={0.54}
      onPress={() => {
        getUbicacion()
      }}
    >
      <Flex style={[styles.content]}>
        <View>
          <Text category="h7">{item.name + " " + item.lastName}</Text>
        </View>
      </Flex>
    </TouchableOpacity>
  );
};

export default ContactosParaUbicarItem;

const themedStyles = StyleService.create({
  container: {
    marginBottom: 24,
    backgroundColor: "background-basic-color-2",
    borderRadius: 16,
    padding: 16,
    ...globalStyle.shadow,
  },
  content: {
    alignItems: "center",
  },
  dot: {
    width: 2,
    height: 2,
    marginHorizontal: 8,
  },
  fillIcon: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
