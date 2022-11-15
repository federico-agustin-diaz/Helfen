import React, { memo } from "react";
import { StyleSheet, Image, View } from "react-native";
import { Button } from "@ui-kitten/components";

import { SuccessScreenType } from "constants/Types";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { ScrollView, ScrollViewProps } from "react-native";

const About = memo(
  () => {
    const { width, top, height } = useLayout();
    const sizeIMG = 160 * (width / 375);

    return (
        <View style={styles.top}>
          <ScrollView>
          <Text category="h7-s" center mb={10} mh={5} mt={50}>
          {`Sobre Helfen

Te damos la bienvenida a Helfen, la mayor red dedicada al Cuidado y asistencia de personas.


Misión - ¿Qué hacemos?

La misión de Helfen es conectar a quien necesita un Cuidador o un Asistente Terapéutico, con dichos profesionales; bajo la premisas de sencillez y seguridad, para todos los usuarios. 


Visión - ¿Qué nos guía?

Encontrar al Cuidador/Asistente Terapéutico ideal para cada paciente.


Nosotros - ¿Quiénes somos?

Helfen nace en el año 2022, como nuestro proyecto final de carrera de Ingeniería en Sistemas de Información. 
Somos profesionales de sistemas, que quisimos dar solución a una necesidad que la vida nos presentó, y que descubrimos que muchísimas personas pasaron por lo mismo,
por lo que juntos decidimos hacer HELFEN.

Necesitar a una persona para cuidar a un ser querido, es un momento dificil de la vida, un momento de mucha angustia, porque necesitar que una persona
venga a cuidar a tu familiar, significa que tu familiar ahora está imposibilitado de manejarse por sus propios medios.

Cuando tenés un familiar que necesita cuidados especiales, querés que esté seguro, que sea tratado con respeto, y que tenga una buena atención.

Antes de HELFEN, no existía espacio en donde encontrar referencias acerca de cuidadores y AT. Si no tenías alguien que te recomiende, sólo quedaba confiar a ciegas.
Confiar a ciegas el bienestar de tu familiar, dejar entrar a un desconocido a tu casa.

Y para los cuidadores y Asistentes Terapéuticos... También era una situación complicada, el hecho de que la posibilidad de conseguir trabajo, dependiera en gran parte de una recomendación.

Helfen conecta estos dos grupos. Permite a los familiares encontrar al profesional que necesita su ser querido pudiendo basarse también en la experiencia de otros que también pasaron por lo mismo.
Y a los profesionales, tener acceso y contacto directo con un montón de oportunidades de nuevos pacientes.`}
          </Text>
          </ScrollView>
        </View>
    );
  }
);

export default About;

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
