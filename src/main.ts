import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.sass";

// Canvas
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Scene
const scene = new THREE.Scene();

// Primitive Geometry
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
	color: 0xffffff,
	flatShading: true,
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// Primitive Geometry WIREFRAME
const wireMat = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	wireframe: true,
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.0001);
mesh.add(wireMesh);

// Lights
const hemLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemLight);

function animate() {
	requestAnimationFrame(animate);
	// mesh.rotation.y = 0.0001 * t;
	renderer.render(scene, camera);
	controls.update();
}
animate();
