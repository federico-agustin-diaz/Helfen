import React, { memo } from "react";
import { View, Alert } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Datepicker,
  Icon,
  CheckBox,
  Button,
  Input
} from "@ui-kitten/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { NotesScreenNavigationProp } from "navigation/types";
import NavigationAction from "components/NavigationAction";
import dayjs from "dayjs";
import Flex from "components/Flex";
import TimePicker from "./TimePicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { globalStyle } from "styles/globalStyle";
import Globales from "src/Globales";

const NotesSrc = memo(() => {
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["calendar", "common"]);
  const route = useRoute<NotesScreenNavigationProp>();
  const [notes, setNotes] = React.useState(route.params.notes);
  const onSave = () => {
    console.log("esta es la info del modify")
    console.log(route.params.notes)
    console.log(route.params.id)
    var idString = route.params.id.toString();
    return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/event', {
        method: 'PUT',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": idString,
           "notes": notes,
        })
      })
      .then((response) => {
        console.log("data del modificar evento")
        goBack();
         Alert.alert("Aviso","Se han modificado las Notas para este evento")
      })
        .catch((error) => {
         Alert.alert("Aviso","Ha habido un error al modificar las Notas.")
          console.log("error")
          console.error(error);
        });
  }
  console.log(route.params.notes)

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={`Notas`}
      />
        <Input
              label={"Estas son las Notas, presione para editarlas"}
              onChangeText={(value) => setNotes(value)}
              value={notes}
              multiline
              style={styles.inputValoracion}
            />
      <Button
              children={t("common:save").toString()}
              onPress={onSave}
              style={styles.button}
            />
    </Container>
  );
});

export default NotesSrc;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 32,
  },
  button: {
    bottom: 0,
    marginBottom: 0,
    marginHorizontal: 10
  },
  inputValoracion: {
    marginTop: 20,
    minHeight: 200,
    marginHorizontal: 20
  },
});
