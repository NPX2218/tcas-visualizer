// ✅ TCASVisualizer.tsx — React version with full 3D spherical control
// and animated planes using the orbiting method from original vanilla JS version

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CameraControls } from "three-stdlib";
import { useTime } from "framer-motion";

const TCASVisualizer: React.FC<any> = ({
  writingTransition,
  loading,
  setWritingTransition,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planetRotationRef = useRef(0.25);
  const planetScaleRef = useRef(1); // Starts at normal scale
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Optional: check scroll direction or zoom threshold here
      transitionToWriting();
      window.removeEventListener("wheel", handleWheel); // Only trigger once
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const transitionToWriting = () => {
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        planetRotationRef.current += 0.1;
        planetScaleRef.current = Math.max(0, planetScaleRef.current - 0.005);
      }, i * 10);
    }

    if (controlsRef.current) {
      controlsRef.current.enableZoom = false;
      controlsRef.current.enablePan = false; // optional: also disable panning
    }

    setWritingTransition(true);

    setTimeout(() => {
      const loadingCanvas = document.getElementById("loading-canvas");
      if (loadingCanvas) loadingCanvas.remove();
    }, 1000); // delay 1 second before removing
  };

  useEffect(() => {
    if (loading) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 50);

    //make it 100vh
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if (containerRef.current)
      containerRef.current.appendChild(renderer.domElement);

    const sunLight = new THREE.DirectionalLight(
      new THREE.Color("#FFFFFF").convertSRGBToLinear(),
      3.5
    );
    sunLight.position.set(10, 20, 10);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const moonLight = new THREE.DirectionalLight(
      new THREE.Color("#77ccff").convertSRGBToLinear(),
      0
    );
    moonLight.position.set(-10, 20, 10);
    moonLight.castShadow = true;
    scene.add(moonLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls; // ⬅️ store reference

    const clock = new THREE.Clock();

    const makePlane = (
      model: THREE.Object3D,
      trailTexture: THREE.Texture,
      scene: THREE.Scene
    ) => {
      const plane = model.clone();
      plane.scale.set(0.003, 0.003, 0.003);
      plane.position.set(0, 0, 0);
      plane.rotation.set(0, 0, 0);
      plane.updateMatrixWorld();

      plane.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).castShadow = true;
          (child as THREE.Mesh).receiveShadow = true;
        }
      });

      const group = new THREE.Group();
      group.add(plane);
      scene.add(group);

      return {
        group,
        yOff: 10.5 + Math.random() * 1.0,
        rot: Math.PI * 2,
        rad: Math.random() * Math.PI * 0.45 + Math.PI * 0.05,
        axis: new THREE.Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1
        ).normalize(),
        axisRot: Math.random() * Math.PI * 2,
      };
    };

    const radius = 15;
    let otherPlanes: ReturnType<typeof makePlane>[] = [];

    const animate = () => {
      const delta = clock.getDelta();
      if (sphere) {
        sphere.rotation.y = planetRotationRef.current;
        sphere.scale.setScalar(planetScaleRef.current);
      }
      otherPlanes.forEach((p) => {
        const plane = p.group;
        plane.position.set(0, 0, 0);
        plane.rotation.set(0, 0, 0);
        plane.updateMatrixWorld();

        p.rot += delta * 0.25;
        plane.rotateOnAxis(p.axis, p.axisRot);
        plane.rotateOnAxis(new THREE.Vector3(0, 1, 0), p.rot);
        plane.rotateOnAxis(new THREE.Vector3(0, 0, 1), p.rad);
        plane.translateY(p.yOff);
        plane.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI * 0.5);
      });

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const load = async () => {
      const textures = {
        bump: await new THREE.TextureLoader().loadAsync(
          "/tcas-visualizer/assets/earthbump.jpg"
        ),
        map: await new THREE.TextureLoader().loadAsync(
          "/tcas-visualizer/assets/earthmap.jpg"
        ),
        spec: await new THREE.TextureLoader().loadAsync(
          "/tcas-visualizer/assets/earthspec.jpg"
        ),
        trail: await new THREE.TextureLoader().loadAsync(
          "/tcas-visualizer/assets/mask.png"
        ),
      };

      sphere = new THREE.Mesh(
        new THREE.SphereGeometry(10, 70, 70),
        new THREE.MeshPhysicalMaterial({
          map: textures.map,
          roughnessMap: textures.spec,
          bumpMap: textures.bump,
          bumpScale: 0.05,
          sheen: 1,
          sheenRoughness: 0.75,
          sheenColor: new THREE.Color("#ff8a00").convertSRGBToLinear(),
          clearcoat: 0.5,
        })
      );
      sphere.rotation.y += Math.PI * 1.25;
      sphere.receiveShadow = true;
      scene.add(sphere);
      sphereRef.current = sphere;

      const gltf = await new GLTFLoader().loadAsync(
        "/tcas-visualizer/assets/plane/scene.glb"
      );
      const planeModel = gltf.scene.children[0];

      for (let i = 0; i < 5; i++) {
        const groupData = makePlane(planeModel, textures.trail, scene);
        otherPlanes.push(groupData);
      }

      animate();
    };
    let sphere: THREE.Mesh;

    load();

    return () => {
      if (containerRef.current)
        containerRef.current.removeChild(renderer.domElement);
    };
  }, [loading]);

  return (
    <div
      id="tcas-planet-canvas"
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    ></div>
  );
};

export default TCASVisualizer;
