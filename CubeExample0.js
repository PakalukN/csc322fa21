/*
Variables are declared in
advance to simplify things.
*/
let renderer, scene, camera, draw, counter = 0;

/*
I use init() as a way to get the basics out of the way.
The code in the function is absolutely necessary for any
THREE.js program in some form.
*/
function init(){
 	renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(0, 0, 100);
}

/*
This function, when called, is executed over
and over in an infinite loop in order to
produce an effect of animation. It is usually
executed around 60 times per second. I use
animate() to increase the frame count and
execute the draw() function, in which I put
everything I want to change.
*/
function animate(){
 	requestAnimationFrame(animate);
  counter++;
  draw();
  renderer.render(scene, camera); // render the scene
}

/*
Call init() to actually execute the basic stuff.
*/
init();

/*
Combinatorics can help determine the faces:

XYZ
XZY
YXZ
YZX
ZXY
ZYX

*/
const vertices = new Float32Array( [
	// front face
	+15.0, +15.0, +15.0,
	-15.0, +15.0, +15.0,
	-15.0, -15.0, +15.0,
  +15.0, +15.0, +15.0,
  -15.0, -15.0, +15.0,
  +15.0, -15.0, +15.0,
  // right face
  +15.0, +15.0, -15.0,
  +15.0, +15.0, +15.0,
  +15.0, -15.0, +15.0,
  +15.0, +15.0, -15.0,
  +15.0, -15.0, +15.0,
  +15.0, -15.0, -15.0,
  // back face
  -15.0, +15.0, -15.0,
  +15.0, +15.0, -15.0,
  +15.0, -15.0, -15.0,
  -15.0, +15.0, -15.0,
  +15.0, -15.0, -15.0,
  -15.0, -15.0, -15.0,
  // left face
  -15.0, +15.0, +15.0,
  -15.0, +15.0, -15.0,
  -15.0, -15.0, -15.0,
  -15.0, +15.0, +15.0,
  -15.0, -15.0, -15.0,
  -15.0, -15.0, +15.0,
  // top face
  +15.0, +15.0, -15.0,
  -15.0, +15.0, -15.0,
  -15.0, +15.0, +15.0,
  +15.0, +15.0, -15.0,
  -15.0, +15.0, +15.0,
  +15.0, +15.0, +15.0,
  // bottom face
  +15.0, -15.0, +15.0,
  -15.0, -15.0, +15.0,
  -15.0, -15.0, -15.0,
  +15.0, -15.0, +15.0,
  -15.0, -15.0, -15.0,
  +15.0, -15.0, -15.0,
] );

// Create the geometry, material, and cube.
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({color: 0x509050});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

/*
Rotate the cube by applying a
rotation matrix.
*/
draw = function(){
  cube.applyMatrix4(new THREE.Matrix4().makeRotationX(0.01));
  cube.applyMatrix4(new THREE.Matrix4().makeRotationY(0.01));
  cube.applyMatrix4(new THREE.Matrix4().makeRotationZ(0.01));
}

/*
Call the animate() function.
*/
animate();
