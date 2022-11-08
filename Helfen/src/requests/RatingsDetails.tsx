import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  Button,
  Input
} from "@ui-kitten/components";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import {
  RatingDetailsScreenNavigationProp,
  RootStackParamList,
} from "navigation/types";
import { Rating, AirbnbRating } from 'react-native-ratings';
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import Flex from "components/Flex";
import dayjs from "utils/dayjs";
import { globalStyle } from "styles/globalStyle";
import Weekdays from "src/find/components/Weekdays";
import Globales from "src/Globales";

const RatingDetails = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { width, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<RatingDetailsScreenNavigationProp>();
  const carerName = route.params.name;
  const carerId = route.params.id;
  const [comment, setComment] = React.useState("");
  const [rating, setRating] = React.useState(0);
  
  const onAccept = () => {
    console.log("el rating es")
    console.log(rating)
    return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/review', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            carerId: carerId,
            familiarId: Globales.variableGlobalId,
            comment: comment,
            classification: rating
        })
      })
      .then((response) =>  response.json())
      .then((data) => {
        console.log(data);
        if (data.review != null) {
          alert("Se ha enviado la valoracion")
        } else {
          console.log("no puedo realizarse el rating")
        }
      })
        .catch((error) => {
          alert("Hubo un error al realizar el rating.")
          console.log("error")
          console.error(error);
        });
  };
  const onDecline = () => {
    goBack();
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Valoraciones"}
        accessoryLeft={<NavigationAction />}
      />
      <Text
        center
        category="h2"
        status={
          "basic"
        }
        mb={8}
      >
        {carerName}
      </Text>
      <Rating
            //aca tenes que poner lo que te devuelve backend
            startingValue={0}
            type='star'
            ratingCount={5}
            imageSize={50}
            onFinishRating={setRating}
          />
          <Input
              label={"Describa su valoracion"}
              onChangeText={(value) => setComment(value)}
              value={comment}
              multiline
              style={styles.inputValoracion}
            />
        <Flex level="2" style={styles.bottom} padder pb={bottom + 8}>
          <Button
            children={"Enviar"}
            style={[globalStyle.flexOne]}
            onPress={onAccept}
          />
        </Flex>
    </Container>
  );
});

export default RatingDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 80,
  },
  iconCalendar: {
    ...globalStyle.icon16,
    tintColor: "text-placeholder-color",
    marginRight: 8,
  },
  tag: {
    backgroundColor: "color-twitter-100",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 12,
  },
  details: {
    marginVertical: 40,
  },
  cancelInterview: {
    alignSelf: "center",
    marginBottom: 40,
  },
  additional: {
    marginBottom: 40,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...globalStyle.shadowFade,
    paddingTop: 14,
    ...globalStyle.topBorder24,
  },
  fitBottom: {
    left: 24,
    right: 24,
    bottom: 0,
    position: "absolute",
  },
  inputValoracion: {
    marginTop: 20,
    minHeight: 50,
    marginHorizontal: 20
  },
});