import React from "react";
import {
  View,
  StyleSheet,
  ImageRequireSource,
  ViewStyle,
  TouchableOpacity,
  Image,
  Alert,
  TextInput
} from "react-native";
import { useTheme, Modal, Avatar, Layout, Input } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import Globales from "src/Globales";
import Text from "./Text";
import useLayout from "hooks/useLayout";
import { Images } from "assets/images";
import Flex from "./Flex";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";

interface ModalConfirmProps {
  name: string;
  style?: ViewStyle;
  avatar?: ImageRequireSource;
  onDetails?(): void;
  isOnl: boolean;
  id: number;
  telefono?: number;
  relationId: number;
  modalConfirmarEvento?: boolean;
  eventId: number;
}

function ModalRequest(
  { name, onDetails, avatar, style, isOnl, id, telefono, relationId, modalConfirmarEvento, eventId }: ModalConfirmProps,
  ref: React.ForwardedRef<{ show: () => void; hide: () => void }>
) {
  const { t } = useTranslation("common");
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { width, height, bottom } = useLayout();
  const themes = useTheme();
  const [notas, setNotas] = React.useState("")

  const confirmarEvento = () => {
    console.log("entro a confirmar evento")
    //var eventIdString = Globales.variableGlobalEventid.toString()
    console.log(Globales.variableGlobalEventid)
    Globales.variableGlobalEventid.forEach((element) =>  {
      console.log("ejecuto crear evento para eventid")
      console.log(element)
     fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/event/' + element, {
        method: 'PATCH',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })
      .then((response) =>  {
        fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/event/' + element, {
        method: 'PATCH',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": element,
          "notes": notas,
        })
      })
      .then((response) =>  response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        //alert("Hubo un error al confirmar eventos.")
        console.log("error 75")
        console.error(error);
      });
    })
      .catch((error) => {
        //alert("Hubo un error al confirmar eventos.")
        console.log("error 81")
        console.error(error);
      });
    })
    console.log("entro al realtionConfirm")
      return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/relation/confirm', {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "carer": Globales.variableGlobalId,
        "familiar": id,
        "relationConfirmated": true
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      console.log(data);
    })
     .catch((error) => {
        //alert("Hubo un error al confirmar eventos.")
        console.log("error 104")
        console.error(error);
      });
  }

  const onCancelarContacto = () => {
    console.log("este es el id que recibio modal")
    console.log(relationId)
    modalRef.current?.hide();
    var idString = relationId.toString()
    console.log(idString)
      return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/contact/' + idString, {
        method: 'DELETE',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })
      .then((response) =>  {
        console.log("este es el id que recibio del eventId linea 82")
        console.log(eventId)
        var eventIdString = Globales.variableGlobalEventid.toString()
        console.log(eventIdString)
          return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/event/' + eventIdString, {
            method: 'DELETE',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            }
          })
          .then((response) =>  {
            
          })
          .then((data) => {
          })
            .catch((error) => {
            });
      })
      .then((data) => {
      })
        .catch((error) => {
        });
  }

  const onCancelarContactoYEliminarEvento = () => {
    console.log("este es el id que recibio modal")
    console.log(relationId)
    modalRef.current?.hide();
    var idString = relationId.toString()
    console.log(idString)
      return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/contact/' + idString, {
        method: 'DELETE',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        }
      })
      .then((response) =>  response.json())
      .then((data) => {
      })
        .catch((error) => {
        });
  }

  const onConfirmContactoDeCuidadorAFamiliar = () => {
    setNotas(notas)
    console.log(notas)
    modalRef.current?.hide();
      return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/contact/confirm', {
        method: 'PUT',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "carer": Globales.variableGlobalId,
          "familiar": id,
          "contactConfirmated": true
        })
      })
      .then((response) =>  response.json())
      .then((data) => {
        confirmarEvento();
        if (Globales.variableGlobalTipo == 1) {
       // handleEventInputs();
        }
        console.log(data);
        if (data.possibleContacts =! null) {
         Alert.alert("Aviso","Se ha confirmado el Contacto. El Familiar se comunicara por telefono.")
        } else {
         Alert.alert("Aviso","Ha habido un error al confirmar contacto.")
        }
      })
        .catch((error) => {
         Alert.alert("Aviso","Ha habido un error al confirmar contacto.")
          console.log("error")
          console.error(error);
        });
  }

  const onConfirmRelacionDeFamiliarACuidador = () => {
    modalRef.current?.hide();
    console.log("el id es");
    console.log(id);
    console.log(Globales.variableGlobalId);
    return fetch('https://urchin-app-vjpuw.ondigitalocean.app/helfenapi/relation', {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "carer": id,
        "familiar": Globales.variableGlobalId,
        "relationConfirmated": false,
        "resume": ""
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      
      console.log(data);
      //handleEventInputs();
      if (data.message == "404 Not Found Error. The relation not exist.") {
       Alert.alert("Aviso","Ha habido un error, la relacion no existe")
      }
    })
      .catch((error) => {
        
       Alert.alert("Aviso","Ha habido un error al confirmar contacto.")
        console.log("error")
        console.error(error);
      });
}

  const modalRef = React.useRef<Modal>(null);

  React.useImperativeHandle(ref, () => ({
    show: () => {
      modalRef.current?.show();
    },
    hide: () => {
      modalRef.current?.hide();
    },
  }));

  const hide = React.useCallback(() => {
    modalRef.current?.hide();
  }, []);

  if (Globales.variableGlobalTipo == 2 && modalConfirmarEvento==false) {
    console.log("entro linea 81")
  return (
    <Modal
      ref={modalRef}
      onBackdropPress={hide}
      backdropStyle={[styles.container]}
    >
      <Layout style={{ flex: 1, borderRadius: 16 }}>
        <Image
          source={Images.modalBg}
          style={{
            width: width - 80,
            height: 334 * (height / 812),
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          }}
        />
        <Flex
          mh={32}
          mt={32}
          style={{
            maxWidth: 231 * (width / 375),
            backgroundColor: "transparent",
          }}
        >
          <Text category="h7" center>
            {name}
            <Text
              category="para-m"
              ml={4}
              fontFamily="GothamPro-Medium"
              children={` te ha enviado una solicitud.`}
            />
          </Text>
        </Flex>
        <View style={styles.buttonView}>
        <TouchableOpacity
            activeOpacity={0.54}
            onPress={onConfirmContactoDeCuidadorAFamiliar}
          >
            <Text category="h7" status={"link"} center mt={16} mb={20}>
              Confirmar Solicitud!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.54}
            onPress={onCancelarContacto}
          >
            <Text category="h7" status={"warning"} center mb={20}>
              Rechazar Solicitud
            </Text>
          </TouchableOpacity>
        </View>
      </Layout>
    </Modal>
  );
          } else if (Globales.variableGlobalTipo == 2 && modalConfirmarEvento == true) {
            //Modal de creacion de evento
            return (
              <Modal
                ref={modalRef}
                // onBackdropPress={hide}
                backdropStyle={[styles.container]}
              >
                <Layout style={{ flex: 1, borderRadius: 16 }}>
                  <Image
                    source={Images.modalBg}
                    style={{
                      width: width - 80,
                      height: 334 * (height / 812),
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                    }}
                  />
                  <Flex
                    mh={32}
                    mt={32}
                    style={{
                      maxWidth: 231 * (width / 375),
                      backgroundColor: "transparent",
                    }}
                  >
                      <Text
                        category="para-m"
                        ml={4}
                        fontFamily="GothamPro-Medium"
                        children={`Se ha solicitado el siguiente evento.`}
                      />
                  </Flex>
                  <View style={styles.buttonView}>
                  <Text category="h7" center>
                  <Text
                        category="para-m"
                        ml={4}
                        fontFamily="GothamPro-Medium"
                        children={`Desde el Dia: `}
                      />
                      {Globales.variableGlobalEventStart}
                    </Text>
                    <Text category="h7" center>
                  <Text
                        category="para-m"
                        ml={4}
                        fontFamily="GothamPro-Medium"
                        children={`Hasta el Dia: `}
                      />
                      {Globales.variableGlobalEventFinish}
                    </Text>
                    <Text category="h7" center>
                  <Text
                        category="para-m"
                        ml={4}
                        fontFamily="GothamPro-Medium"
                        children={`Desde las: `}
                      />
                      {Globales.variableGlobalEventHoraStart}
                    </Text>
                    <Text category="h7" center>
                  <Text
                        category="para-m"
                        ml={4}
                        fontFamily="GothamPro-Medium"
                        children={`Hasta las: `}
                      />
                      {Globales.variableGlobalEventHoraFinish}
                    </Text>
                <Input
                  label={t("Ingrese Notas para el evento").toString()}
                  // value={notas}
                  style={styles.inputNotas}
                  keyboardType="email-address"
                />
                  <TouchableOpacity
                      activeOpacity={0.54}
                      onPress={onConfirmContactoDeCuidadorAFamiliar}
                    >
                      <Text category="h7" status={"link"} center mt={16} mb={20}>
                        Confirmar Evento!
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.54}
                      onPress={onCancelarContactoYEliminarEvento}
                    >
                      <Text category="h7" status={"warning"} center mb={20}>
                        Rechazar Evento
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Layout>
              </Modal>
            )
          }
          else if (Globales.variableGlobalTipo == 1) {
            console.log("entro linea 152")
            return (
              <Modal
                ref={modalRef}
                onBackdropPress={hide}
                backdropStyle={[styles.container]}
              >
                <Layout style={{ flex: 1, borderRadius: 16 }}>
                  <Image
                    source={Images.modalBg}
                    style={{
                      width: width - 80,
                      height: 334 * (height / 812),
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                    }}
                  />
                  <Flex
                    mh={32}
                    mt={32}
                    style={{
                      maxWidth: 231 * (width / 375),
                      backgroundColor: "transparent",
                    }}
                  >
                    <Text category="h7" center>
                      {name}
                      <Text
                        category="para-m"
                        ml={4}
                        fontFamily="GothamPro-Medium"
                        children={` ha confirmado la solicitud.`}
                      />
                    </Text>
                  </Flex>
                  <Flex
                    mh={32}
                    mt={10}
                    style={{
                      maxWidth: 231 * (width / 375),
                      backgroundColor: "transparent",
                    }}
                  >
                    <Text category="h7" center>
                      {telefono}
                      <Text
                        category="para-m"
                        ml={4}
                        fontFamily="GothamPro-Medium"
                        children={` es su numero de telefono.`}
                      />
                    </Text>
                  </Flex>
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      activeOpacity={0.54}
                      onPress ={onConfirmRelacionDeFamiliarACuidador}
                      style={[
                        styles.btnOk,
                        {
                          borderColor: themes["background-basic-color-1"],
                        },
                      ]}
                    >
                      <Text
                        category="para-m"
                        center
                        status={"link"}
                        mt={16}
                        mb={10}
                      >
                        Ok
                      </Text>
                    </TouchableOpacity>
                  </View>
                  
                </Layout>
              </Modal>
            );       
          }
}

export default React.forwardRef(ModalRequest) as (
  props: ModalConfirmProps & {
    ref?: React.ForwardedRef<{ show: () => void; hide: () => void }>;
  }
) => ReturnType<typeof ModalRequest>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(30, 31, 32, 0.86)",
  },
  modal: {
    flex: 1,
    borderRadius: 24,
  },
  avatarView: {
    alignSelf: "center",
    marginTop: 40,
  },
  buttonView: {
    marginTop: 15,
  },
  button: {
    marginTop: 12,
  },
  avatar: {
    alignSelf: "center",
    marginTop: 16,
  },
  btnOk: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  inputNotas: {
    minHeight: 50,
    marginTop: 10,
    marginHorizontal: 10
  },
  onlineIcon: {
    width: 16,
    height: 16,
    position: "absolute",
    borderRadius: 99,
    borderWidth: 2,
    bottom: 0,
    right: 0,
  },
});
