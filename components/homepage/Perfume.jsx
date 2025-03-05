import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Perfume(props) {
  const { nodes, materials } = useGLTF("/sauvage_perfume.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.026}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.2}>
          <group
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[159.717, 159.717, 255.862]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.sauvage_Sauvage_glass_0.geometry}
              material={materials.Sauvage_glass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.sauvage_tube_0.geometry}
              material={materials.tube}
            />
          </group>
          <group
            position={[0, 345.939, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[83.481, 83.481, 91.412]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cap_cap_0.geometry}
              material={materials.material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.cap_Material003_0.geometry}
              material={materials["Material.003"]}
            />
          </group>
          <group
            position={[0.326, -137.955, -158.517]}
            rotation={[Math.PI, 0, -Math.PI]}
            scale={75.004}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Text001_text_0.geometry}
              material={materials.text}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Text001_text_0_1.geometry}
              material={materials.text}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.metal_1_metal_0.geometry}
            material={materials.metal}
            position={[0, 332.546, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={76.684}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.metal_2_metal_0.geometry}
            material={materials.metal}
            position={[0, 371.508, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={34.278}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder006_text_0.geometry}
            material={materials.text}
            position={[-0.44, 384.226, -31.167]}
            scale={[7.222, 7.222, 2.093]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text_text_0.geometry}
            material={materials.text}
            position={[3.822, 90.465, -190.18]}
            rotation={[Math.PI, 0, -Math.PI]}
            scale={[58.599, 69.493, 58.599]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text003_text_0.geometry}
            material={materials.text}
            position={[-0.166, 39.467, -167.873]}
            rotation={[Math.PI, 0, -Math.PI]}
            scale={17.539}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.tube_tube_0.geometry}
            material={materials.tube}
            position={[3.474, 242.25, 4.788]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={9.013}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/sauvage_perfume.glb");
