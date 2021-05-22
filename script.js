/*
  Johan Karlsson (DonKarlssonSan) 2018
  Referencing:
   * three.js
   * Noise lib
   * OrbitControls
*/

let scene;
let camera;
let renderer;
let simplex;
let plane;
let geometry;
let xZoom;
let yZoom;
let noiseStrength;

function setup() {
  setupNoise();
  setupScene();
  setupCamera();
  setupRenderer();
  setupPlane();
  setupLights();
  setupEventListeners();
}

function setupNoise() {
  // By zooming y more than x, we get the
  // appearence of flying along a valley
  xZoom = 6;
  yZoom = 6;
  noiseStrength = .3;
  simplex = new SimplexNoise();
}

function setupScene() {
  scene = new THREE.Scene();
}

function setupCamera() {
  let res = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, res, 0.1, 1000);
  camera.position.x = 0;
  camera.position.y = -20;
  camera.position.z = 3;

  let controls = new THREE.OrbitControls(camera);
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function setupPlane() {
  let side = 120;
  geometry = new THREE.PlaneGeometry(120, 40, side, side);
  const albedo = new THREE.TextureLoader().load( 'Assets/Textures/Ground/dry_ground_rocks_albedo_1k.jpg' );
  const roughness = new THREE.TextureLoader().load( 'Assets/Textures/Ground/dry_ground_rocks_rough_1k.jpg' );
  const normal = new THREE.TextureLoader().load( 'Assets/Textures/Ground/dry_ground_rocks_nor_1k.jpg' );
  let material = new THREE.MeshStandardMaterial({
    map: albedo,
    normalMap: normal,
    roughnessMap: roughness
  });

  plane = new THREE.Mesh(geometry, material);
  plane.castShadow = true;
  plane.receiveShadow = true;

  scene.add(plane);
}

function setupLights() {
  let ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  let spotLight = new THREE.SpotLight(0xcccccc);
  spotLight.position.set(-30, 60, 60);
  spotLight.castShadow = true;
  scene.add(spotLight);

  var textureLoader = new THREE.TextureLoader();
  textureLoader.load('Assets/Textures/Sky.jpg', function(texture) {
    var material = new THREE.MeshBasicMaterial();
    material.envMap = texture;
  });
}

function setupEventListeners() {
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function draw() {
  requestAnimationFrame(draw);
  let offset = Date.now() * 0.0004;
  adjustVertices(offset);
  adjustCameraPos(offset);
  renderer.render(scene, camera);
}

function adjustVertices(offset) {
  for (let i = 0; i < plane.geometry.vertices.length; i++) {
    let vertex = plane.geometry.vertices[i];
    let x = vertex.x / xZoom;
    let y = vertex.y / yZoom;
    let noise = simplex.noise2D(x, y + offset) * noiseStrength;
    vertex.z = noise;
  }
  geometry.verticesNeedUpdate = true;
  geometry.computeVertexNormals();
}

function adjustCameraPos(offset) {
  let x = camera.position.x / xZoom;
  let y = camera.position.y / yZoom;
  let noise = simplex.noise2D(x, y + offset) * noiseStrength + 1.5;
  camera.position.z = noise;
}

setup();
draw();
