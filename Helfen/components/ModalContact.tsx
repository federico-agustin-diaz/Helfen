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

import Text from "./Text";
import useLayout from "hooks/useLayout";
import { Images } from "assets/images";
import Flex from "./Flex";
interface ModalConfirmProps {
  name: string;
  style?: ViewStyle;
  avatar?: ImageRequireSource;
  onDetails?(): void;
  isOnl: boolean;
}

function ModalContact(
  { name, onDetails, avatar, style, isOnl }: ModalConfirmProps,
  ref: React.ForwardedRef<{ show: () => void; hide: () => void }>
) {
  const { t } = useTranslation("common");
  const { width, height, bottom } = useLayout();
  const themes = useTheme();

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
              children={` ha recibido tu solicitud.`}
            />
          </Text>
        </Flex>
        <View style={styles.buttonView}>
          {/* <TouchableOpacity
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
              OK, gracias!
            </Text>
          </TouchableOpacity> */}
        </View>
      </Layout>
    </Modal>
  );
}

export default React.forwardRef(ModalContact) as (
  props: ModalConfirmProps & {
    ref?: React.ForwardedRef<{ show: () => void; hide: () => void }>;
  }
) => ReturnType<typeof ModalContact>;

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
    marginTop: 32,
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
