import React from "react";
import {
  View,
  StyleSheet,
  ImageRequireSource,
  ViewStyle,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTheme, Modal, Avatar, Layout } from "@ui-kitten/components";
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
}

function ModalRequest(
  { name, onDetails, avatar, style, isOnl, id, telefono }: ModalConfirmProps,
  ref: React.ForwardedRef<{ show: () => void; hide: () => void }>
) {
  const { t } = useTranslation("common");
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { width, height, bottom } = useLayout();
  const themes = useTheme();
  const onConfirmContactoDeCuidadorAFamiliar = () => {
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
        
        handleEventInputs();
        console.log(data);
        if (data.possibleContacts =! null) {
          alert("Se ha confirmado el Contacto. El Familiar se comunicara por telefono.")
        } else {
          alert("Ha habido un error al confirmar contacto.")
        }
      })
        .catch((error) => {
          alert("Ha habido un error al confirmar contacto.")
          console.log("error")
          console.error(error);
        });
  }

  const handleEventInputs = React.useCallback(() => {
    navigate("RequestStack", {
      screen: "ConfirmEventInputs"
    })
  }, []);

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
        "relationConfirmated": false
      })
    })
    .then((response) =>  response.json())
    .then((data) => {
      
      console.log(data);
      handleEventInputs();
      if (data.message == "404 Not Found Error. The relation not exist.") {
        alert("Ha habido un error, la relacion no existe")
      }
    })
      .catch((error) => {
        
        alert("Ha habido un error al confirmar contacto.")
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

  if (Globales.variableGlobalTipo == 2) {
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
            onPress={hide}
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
              status={"placeholder"}
              mt={16}
              mb={10}
            >
              OK, confirmare luego
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.54}
            onPress={onConfirmContactoDeCuidadorAFamiliar}
          >
            <Text category="h7" status={"link"} center mt={16} mb={20}>
              Confirmar Contacto!
            </Text>
          </TouchableOpacity>
        </View>
      </Layout>
    </Modal>
  );
          } else if (Globales.variableGlobalTipo == 1) {
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
                        children={` es su numero telefonico.`}
                      />
                    </Text>
                  </Flex>
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      activeOpacity={0.54}
                      onPress={hide}
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
                        status={"placeholder"}
                        mt={16}
                        mb={10}
                      >
                        OK, confirmare luego
                      </Text>
                    </TouchableOpacity>
                  </View>
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
                        Confirmar Contacto
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
