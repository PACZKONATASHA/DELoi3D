import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import './Model3DViewer.css';

export default function Model3DViewer({ url = null, title = 'Modelo 3D' }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  const loadModel = useCallback((modelUrl) => {
    if (!modelUrl || !sceneRef.current) return;
    
    setIsLoading(true);
    setError(null);

    const loader = new STLLoader();
    loader.load(
      modelUrl,
      (geometry) => {
        geometry.computeBoundingBox();
        geometry.center();

        const material = new THREE.MeshStandardMaterial({
          color: 0x00A9CE, // Celeste - tu color de marca
          metalness: 0.3,
          roughness: 0.5,
        });

        // Remove old mesh
        if (meshRef.current) {
          sceneRef.current.remove(meshRef.current);
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        sceneRef.current.add(mesh);
        meshRef.current = mesh;

        // Auto-scale camera
        const bbox = geometry.boundingBox;
        const maxDim = Math.max(
          bbox.max.x - bbox.min.x,
          bbox.max.y - bbox.min.y,
          bbox.max.z - bbox.min.z
        );
        const fov = cameraRef.current.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        cameraZ *= 1.5;
        cameraRef.current.position.z = cameraZ;

        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading STL:', error);
        setError('Error al cargar el modelo 3D');
        setIsLoading(false);
      }
    );
  }, []);

  // Initialize 3D scene
  useEffect(() => {
    if (!containerRef.current) return;

    // ── Setup Scene ──
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 100, 1000);
    sceneRef.current = scene;

    // ── Setup Camera ──
    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 500;
    
    console.log('Canvas dimensions:', width, 'x', height);
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 50);
    cameraRef.current = camera;

    // ── Setup Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    
    // Limpiar container antes de agregar nuevo renderer
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Lighting ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(100, 100, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // ── Handle Resize ──
    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;
      if (cameraRef.current) {
        cameraRef.current.aspect = newWidth / newHeight;
        cameraRef.current.updateProjectionMatrix();
      }
      if (rendererRef.current) {
        rendererRef.current.setSize(newWidth, newHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // ── Animation Loop ──
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (meshRef.current) {
        meshRef.current.rotation.x += 0.001;
        meshRef.current.rotation.y += 0.002;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Load model when URL changes
  useEffect(() => {
    if (url) {
      loadModel(url);
    }
  }, [url, loadModel]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !meshRef.current) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    meshRef.current.rotation.y += deltaX * 0.01;
    meshRef.current.rotation.x += deltaY * 0.01;

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !meshRef.current || e.touches.length !== 1) return;
    e.preventDefault();

    const deltaX = e.touches[0].clientX - touchStart.x;
    const deltaY = e.touches[0].clientY - touchStart.y;

    meshRef.current.rotation.y += deltaX * 0.01;
    meshRef.current.rotation.x += deltaY * 0.01;

    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['model/stl', 'application/octet-stream', 'text/plain'];
    const isValidType = validTypes.includes(file.type) || file.name.endsWith('.stl');

    if (!isValidType) {
      setError('Por favor carga un archivo STL o OBJ válido');
      return;
    }

    const url = URL.createObjectURL(file);
    loadModel(url);
  };

  return (
    <div className="model-3d-viewer">
      <div className="model-3d-viewer__header">
        <h3 className="model-3d-viewer__title">{title}</h3>
        <label className="model-3d-viewer__upload">
          <input
            type="file"
            accept=".stl,.obj"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <span className="model-3d-viewer__upload-btn">Cargar STL/OBJ</span>
        </label>
      </div>

      <div
        ref={containerRef}
        className="model-3d-viewer__canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        {isLoading && (
          <div className="model-3d-viewer__loading">
            <div className="spinner"></div>
            <p>Cargando modelo 3D...</p>
          </div>
        )}
        {error && (
          <div className="model-3d-viewer__error">
            <p>{error}</p>
          </div>
        )}
      </div>

      <div className="model-3d-viewer__info">
        <p>💡 Arrastra para rotar | Scroll para zoom</p>
      </div>
    </div>
  );
}
