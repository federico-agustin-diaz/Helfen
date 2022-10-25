import React, { memo } from "react";
import { StyleSheet, Image, View } from "react-native";
import { Button } from "@ui-kitten/components";

import { SuccessScreenType } from "constants/Types";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { ScrollView, ScrollViewProps } from "react-native";

const FAQ = memo(
  () => {
    const { width, top, height } = useLayout();
    const sizeIMG = 160 * (width / 375);

    return (
        <View style={styles.top}>
          <ScrollView>
          <Text category="h7-s" center mb={10} mh={5} mt={50}>
          {`Quiero contactar un Cuidador/Asistente Terapéutico

¿Cómo hago para crear un usuario nuevo?

Se debe ingresar a la aplicación y seleccionar la opción Registrar Usuario, y completar todos los datos solicitados por la aplicación.

¿Cómo encuentro un cuidador?

Ingresá en la opción “Buscar cuidador”, seleccioná de la lista todos los servicios que necesitás que brinde el profesional buscado, completá la dirección de la persona a asistir  y hacé clic en “Buscar”. Te va a aparecer una lista con todos los profesionales que realicen los servicios seleccionados, ordenados del más cercano al más lejano del domicilio que indicaste.

¿Cómo me contacto con el cuidador?

En la lista que obtenés al buscar un cuidador (Ver “Cómo encuentro un cuidador”), al lado de cada profesional aparece el botón “Contactar Cuidador”, hacé clic en ese botón, y cuando el cuidador acepte el contacto, te vamos a notificar y podrás accede a su número de contacto.

¿Por qué no me llega la notificación con el teléfono del cuidador?

Desde que solicitaste contactarte con el profesional  (al seleccionar “Contactar Cuidador”), le enviamos una notificación. Si todavía no te llegó notificación es porque él aún no indicó si acepta o no el contacto. Podés contactar a todos los profesionales que consideres para elegir al ideal para tu familiar.

¿Para qué me sirve “Confirmar Empleo”?

Este paso es muy importante para poder aprovechar al máximo la seguridad que ofrece Helfen.
Una vez que le envíes los detalles de la propuesta al profesional a través de la app y él la acepte, vas a poder acceder a las funciones de “Ubicación en tiempo real” y “Valorar Profesional”

¿Cómo Confirmo el empleo?

Escribí la propuesta, completá la dirección y los días y horarios en los que el profesional estará con el paciente, envialo al profesional, y cuando confirme quedará registrado en la app y podrán acceder a las demás funciones.

¿Cómo veo la ubicación del profesional?

Para usar esta funcionalidad tenés que haber confirmado el empleo.
Ingresá al menú “Mis Profesionales”, seleccioná al profesional del que querés ver la ubicación, y hacé clic en “Consultar”
Recordá que sólo va a estar habilitada durante el horario informado en la confirmación del empleo.

¿Por qué no veo la ubicación de mi profesional?

Esto puede deberse a que el profesional no cuenta con internet en ese momento, o porque no activó los permisos para que consulten su ubicación.

¿A quienes puedo dejarles comentarios y/o valoraciones?
Solamente vas a poder hacerlo, a los profesionales con los que hayas alguna vez, confirmado un empleo. De lo contrario, no se te permitirá hacerlo.

-> Soy Cuidador

¿Cómo hago para crear un usuario nuevo? 
Se debe ingresar a la aplicación y seleccionar la opción Registrar Usuario, y completar todos los datos solicitados por la aplicación. Es importante aceptar los permisos de cámara para que la aplicación pueda tomarte una selfie para el validador facial. De no ser así, no podrás crear tu perfil en Helfen.


¿Por qué no me reconoce la foto el reconocedor facial?

Es importante que tomes tu foto en un lugar con luz de frente. Tu rostro debe estar centrado en la pantalla, y el celular a una distancia de aproximadamente un brazo extendido.

¿Puedo tomarme la selfie con lentes?

No, ya que las fotos del dni son siempre sin lentes. Si la selfie es tomada con lentes es muy probable que el reconocedor facial no las tome como la misma persona.

¿Cuánto cobra Helfen por los servicios?

El uso de Helfen es gratuito.

   +  ¿Helfen le mostrará a todos mi número de teléfono?
No. Helfen cuida tus datos personales. Solamente mostrará tu contacto a los usuarios que   autorices.

¿Para qué me sirve “Confirmar Empleo”?        ¿ESTA?

Este paso es muy importante para poder aprovechar al máximo la seguridad que ofrece Helfen.
Una vez que aceptes la propuesta de empleo a través de la app, vas a poder acceder a las funciones de “Agenda” y de recibir valoraciones para convertir en más atractivo a tu perfil.

  +     ¿Puedo agregar eventos a mi agenda?

Si. Además de los eventos creados automáticamente por la aplicación, podrás agregar notas y/o recordatorios personales.

¿Cualquier persona puede dejar comentarios o valorizaciones en mi perfil?
No. Solamente los usuarios que hayan estado en relación laboral con vos podrán dejarte estos comentarios y reseñas.`}
          </Text>
          </ScrollView>
        </View>
    );
  }
);

export default FAQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: "center",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 24,
    paddingHorizontal: 86,
  },
});
