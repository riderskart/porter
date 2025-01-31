import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeDBox = ({ width = 1, height = 1, depth = 1 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    camera.position.z = 3;

    // Set up renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);

    // Load texture for cardboard effect
    const textureLoader = new THREE.TextureLoader();
    const cardboardTexture = textureLoader.load("/textures/cardboard1.jpg");

    // Create a box geometry with customizable dimensions
    const geometry = new THREE.BoxGeometry(width / 10, height / 10, depth / 10);
    const material = new THREE.MeshStandardMaterial({
      map: cardboardTexture,
      roughness: 0.8, // Make it look less reflective
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add lighting for better material appearance
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Adjust on window resize
    const handleResize = () => {
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      mountRef?.current?.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, [width, height, depth]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default ThreeDBox;
