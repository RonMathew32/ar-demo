import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroMaterials,
  ViroAnimations,
  ViroTrackingStateConstants,
  Viro3DObject,
  ViroAmbientLight,
} from "@viro-community/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

// const HelloWorldSceneAR = () => {
//   const [text, setText] = useState("Initializing AR...");

//   function onInitialized(state, ViroTrackingReason) {
//     console.log("onInitialized", state, ViroTrackingReason);
//     if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
//       setText("Hello World!");
//     } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
//       // Handle loss of tracking
//     }
//   }

//   return (
//     <ViroARScene onTrackingUpdated={onInitialized}>
//       <ViroText
//         text={text}
//         scale={[0.5, 0.5, 0.5]}
//         position={[0, 0, -1]}
//         style={styles.helloWorldTextStyle}
//       />
//     </ViroARScene>
//   );
// };

const PizzaInitialScene = () =>{
  const [rotation, setRotation] = useState([-45,50,40])
  const [position, setPosition] = useState([0,0,-5])
  const [scalePizza, setScalePizza] = useState([0.05,0.05,0.05])

  const onInitialized =(state, ViroTrackingReason) => {
    console.log("onInitialized", state, ViroTrackingReason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  ViroMaterials.createMaterials({
    texture: {
      diffuseTexture: require('./assets/pizza/Textures/uvw_pizza_texture1.jpg')
    }
  })

  ViroAnimations.registerAnimations({
    rotate: {
      duration: 2500,
      properties: {
        rotateY: '+=90'
      }
    }
  })

  const moveObject = (newPosition) => {
    setPosition(newPosition)
  }

  const rotateObject = (rotateState, rotationFactor, source) => {
    if(rotateState === 3){
      let currentRotation = [rotationFactor[0], rotationFactor[1], rotationFactor[2]]
      setRotation(currentRotation)
    }
  }

  const scalePizzaObject = (pinchState, scaleFactor, source) => {
    if(pinchState === 3){
      let currentScale = scalePizza[0]
      let newScale = currentScale*scaleFactor
      let newScaleArray = [newScale, newScale, newScale]
      setScalePizza(newScaleArray)
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color='#fff' />
      <Viro3DObject 
      source={require('./assets/pizza/coffee_cup_obj.obj')}
      type="OBJ"
      // position={position}
      // scale={scalePizza}
      // rotation={rotation}
      // onDrag={moveObject}
      // onRotate={rotateObject}
      // onPinch={scalePizzaObject}
      />
    </ViroARScene>
  )
}

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: PizzaInitialScene,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
