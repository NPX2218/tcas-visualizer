/////////////////////////////////////
// IMPORTING MODULES
/////////////////////////////////////

import React, { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  MeshPhysicalMaterial,
  Texture,
  Mesh,
  Vector3,
  Group,
  PlaneGeometry,
  Clock,
  TextureLoader,
  PCFSoftShadowMap,
  ACESFilmicToneMapping,
  Object3D,
} from "three";
import { OrbitControls } from "three-stdlib";
import { GLTFLoader } from "three-stdlib";
import { Mesh as ThreeMesh } from "three";
import GlobeInstructions from "./GlobeInstructions";

/////////////////////////////////////
// CONSTANTS
/////////////////////////////////////

const basePath = "/tcas-visualizer";
const letterVariants: Variants = {
  initial: { x: 0 },
  left: {
    x: "-220%",
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  right: {
    x: "220%",
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  back: {
    x: 0,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

/////////////////////////////////////
// INTERFACE: LOADING SCREEN
/////////////////////////////////////

interface LoadingScreenProps {
  loading: boolean;
  setLoading: (loading) => void;
  children: React.ReactNode;
  writingTransition: boolean;
}

/////////////////////////////////////
// COMPONENT: LOADING SCREEN
/////////////////////////////////////

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  loading,
  setLoading,
  children,
  writingTransition,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loading) return;

    /////////////////////////////////////
    // INITIAL SCENE SETUP
    /////////////////////////////////////

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 50);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.toneMapping = ACESFilmicToneMapping;

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const sunLight = new DirectionalLight("#FFFFFF", 2);
    sunLight.position.set(10, 20, 10);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const fillLight = new DirectionalLight(0xffffff, 0.2);
    fillLight.position.set(0, -10, -10);
    scene.add(fillLight);

    const textureLoader = new TextureLoader();
    const gltfLoader = new GLTFLoader();

    let trailTexture: Texture;
    let planeModel: Object3D;
    const planes: TCASPlane[] = [];

    /////////////////////////////////////
    // CLASS: TCAS PLANE
    /////////////////////////////////////

    class TCASPlane {
      group: Group;
      velocity: Vector3;
      alertState: "normal" | "advisory" | "conflict";

      constructor(group: Group, velocity: Vector3) {
        this.group = group;
        this.velocity = velocity.clone();
        this.alertState = "normal";
      }

      update(delta: number) {
        this.group.position.add(this.velocity.clone().multiplyScalar(delta));
        const dir = this.velocity.clone().normalize();
        this.group.lookAt(this.group.position.clone().add(dir));
      }
    }

    /////////////////////////////////////
    // FUNCTION: SET PLANE COLOR
    /////////////////////////////////////

    const setPlaneColor = (plane: TCASPlane) => {
      const colorMap = {
        normal: "#00ff00",
        advisory: "#ffff00",
        conflict: "#ff0000",
      };
      plane.group.traverse((obj) => {
        if (
          (obj as ThreeMesh).isMesh &&
          (obj as ThreeMesh).material &&
          "color" in (obj as ThreeMesh).material
        ) {
          ((obj as ThreeMesh).material as any).color.set(
            colorMap[plane.alertState]
          );
        }
      });
    };

    /////////////////////////////////////
    // FUNCTION: CHECK TCAS CONFLICTS
    /////////////////////////////////////

    const checkTCASConflicts = (planes: TCASPlane[]) => {
      const threshold = 30;
      const advisoryZone = 40;
      for (let i = 0; i < planes.length; i++) {
        for (let j = i + 1; j < planes.length; j++) {
          const p1 = planes[i];
          const p2 = planes[j];
          const dist = p1.group.position.distanceTo(p2.group.position);

          if (dist < threshold) {
            p1.alertState = p2.alertState = "conflict";
            p1.velocity.y = 0.5;
            p2.velocity.y = -0.5;
          } else if (dist < advisoryZone) {
            p1.alertState = p2.alertState = "advisory";
          } else {
            p1.alertState = p2.alertState = "normal";
            p1.velocity.y = 0;
            p2.velocity.y = 0;
          }

          setPlaneColor(p1);
          setPlaneColor(p2);

          if (dist > 90) {
            setLoading(false);
            p1.group.visible = false;
            p2.group.visible = false;
            renderer.setAnimationLoop(null);
            const loadingCanvas = document.getElementById("loading-canvas");
            if (loadingCanvas) loadingCanvas.remove();
          }
        }
      }
    };

    /////////////////////////////////////
    // FUNCTION: MAKE PLANE
    /////////////////////////////////////

    const makePlane = (model: Object3D, trailTex: Texture): Group => {
      const plane = model.clone();
      plane.scale.set(0.01, 0.01, 0.01);
      plane.traverse((obj) => {
        if ((obj as ThreeMesh).isMesh) {
          (obj as ThreeMesh).castShadow = true;
          (obj as ThreeMesh).receiveShadow = true;
        }
      });

      const trail = new Mesh(
        new PlaneGeometry(1, 2),
        new MeshPhysicalMaterial({
          transparent: true,
          opacity: 0.6,
          alphaMap: trailTex,
          roughness: 1,
          metalness: 0,
          transmission: 0,
          depthWrite: false,
          depthTest: true,
        })
      );
      trail.renderOrder = -1;
      trail.rotateX(Math.PI);
      trail.translateY(1.1);

      const group = new Group();
      group.add(plane);
      group.add(trail);
      scene.add(group);
      return group;
    };

    (async function init() {
      trailTexture = await textureLoader.loadAsync(
        basePath + "/assets/mask.png"
      );
      const gltf = await gltfLoader.loadAsync(
        basePath + "/assets/plane/scene.glb"
      );
      planeModel = gltf.scene.children[0];

      const plane1 = new TCASPlane(
        makePlane(planeModel, trailTexture),
        new Vector3(10.5, 0, 0)
      );
      const plane2 = new TCASPlane(
        makePlane(planeModel, trailTexture),
        new Vector3(-10.5, 0, 0)
      );

      plane1.group.position.set(-20, 0, 0);
      plane2.group.position.set(20, 0, 0);

      planes.push(plane1, plane2);

      const clock = new Clock();
      renderer.setAnimationLoop(() => {
        const delta = clock.getDelta();
        planes.forEach((p) => p.update(delta));
        checkTCASConflicts(planes);
        controls.update();
        renderer.render(scene, camera);
      });
    })();

    /////////////////////////////////////
    // FUNCTION: HANDLE RESIZE
    /////////////////////////////////////

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  /////////////////////////////////////
  // FUNCTION: GET LETTER STATE
  /////////////////////////////////////

  const getLetterState = (side: "left" | "right") => {
    if (loading) return "initial";
    if (writingTransition) return "back";
    return side;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        margin: 0,
      }}
    >
      {/* Background TCAS text */}
      <div className="w-full h-full flex items-center justify-center">
        <div className={`${loading ? "hidden" : "flex z-10"} rounded-full z-0`}>
          {children}
        </div>

        <div className="absolute top-1/2 left-1/2 flex gap-6 text-[8rem] md:text-[12rem] font-bold text-gray-300 pointer-events-none origin-center transform -translate-x-1/2 -translate-y-1/2 md:rotate-0 rotate-90 z-10">
          <motion.span
            variants={letterVariants}
            initial="initial"
            animate={getLetterState("left")}
          >
            T
          </motion.span>
          <motion.span
            variants={letterVariants}
            initial="initial"
            animate={getLetterState("left")}
          >
            C
          </motion.span>
          <motion.span
            variants={letterVariants}
            initial="initial"
            animate={getLetterState("right")}
          >
            A
          </motion.span>
          <motion.span
            variants={letterVariants}
            initial="initial"
            animate={getLetterState("right")}
          >
            S
          </motion.span>
        </div>
      </div>
      <GlobeInstructions
        writingTransition={writingTransition}
        loading={loading}
      />
      {/* Three.js canvas */}
      <div
        id="loading-canvas"
        ref={containerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "80%",
          height: "100%",
          zIndex: 2,
        }}
      />
    </div>
  );
};

/////////////////////////////////////
// EXPORTING LOADING SCREEN
/////////////////////////////////////

export default LoadingScreen;
