import React, { memo,  useEffect, useState } from "react";
import { View, TouchableOpacity, Platform, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Modal,
  Button
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import TabBar from "../../components/BasicTabBar";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Images } from "assets/images";
import { RECOMMEND_DATA } from "constants/Data";
import Carousel from "react-native-snap-carousel";
import JobItem from "./components/JobItem";
import useModal from "hooks/useModal";
import { FindStackParamList } from "navigation/types";
import ButtonFill from "components/ButtonFill";
import Flex from "components/Flex";
import Geolocation from '@react-native-community/geolocation';
import Globales from "src/Globales";

const ViewOnMapVivo = memo(() => {
  const { navigate } = useNavigation<NavigationProp<FindStackParamList>>();
  const { height, width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["find", "common"]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [position, setPosition] = useState({
    latitude: Globales.variableGlobalLatitude,
    longitude: Globales.variableGlobalLongitude,
    latitudeDelta:  0.0421,
    longitudeDelta: 0.0421,
  });
  const refMap = React.useRef<MapView | null>(null);

  const [pin, setPin] = useState({
    latitude: Globales.variableGlobalLatitude,
    longitude: Globales.variableGlobalLongitude,
  });

  const { goBack } = useNavigation();
  useEffect(() => {
      setPosition({
        latitude: Globales.variableGlobalLatitude,
    longitude: Globales.variableGlobalLongitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
    })
    console.log(position)
  }, []);

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        accessoryLeft={<NavigationAction icon="close"/>}
        title={t("Seleccione su direccion").toString()}
        appearance="primary"
      />
      <View style={styles.flexazo}>
        <MapView
          ref={refMap}
          provider={PROVIDER_GOOGLE}
          region={position}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsScale
          onUserLocationChange={(event) => {
            console.log(event.nativeEvent.coordinate);
          }}
          style={[
            styles.mapView,
            {
              width: width,
              height: height
            },
          ]}
        >
          <Marker
            image={Images.pinLocation}
            coordinate={position}
          />
        </MapView>
        <Button onPress= {goBack} style={styles.button} children={"Ok"}/>
      </View>
    </Container>
  );
});

export default ViewOnMapVivo;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  contentJob: {
    position: "absolute",
    bottom: 0,
  },
  tabBar: {
    paddingLeft: 8,
    marginTop: 24,
  },
  content: {},
  mapView: {
    zIndex: -10,
    flex: 1
  },
  button: {
    marginBottom: 5,
    marginHorizontal:20
  },
  flexazo: {
    flex: 1,
  },
});
