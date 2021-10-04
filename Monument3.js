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
Initialize the array that holds
the faces of the monument.
*/
const monument = [];

/*
Define the vertex, index, color, and normal
arrays. Each one has 8 elements, since there
are 8 faces in total. In the color and normal
arrays, for each face, each vertex is given
the same value, so that there is no interpolation.
*/
const vertices = [
	[
  	-27.5,  0.0, 27.5,
    27.5,  0.0, 27.5,
    17.0,  500.0, 17.0,
    -17.0,  500.0, 17.0,
  ],
  [
  	27.5,  0.0, 27.5,
    27.5,  0.0,  -27.5,
    17.0,  500.0, -17.0,
    17.0,  500.0,  17.0,
  ],
  [
  	27.5,  0.0,  -27.5,
   	-27.5,  0.0,  -27.5,
    -17.0,  500.0,  -17.0,
   	17.0,  500.0,  -17.0,
  ],
  [
  	-27.5,  0.0, -27.5,
    -27.5,  0.0, 27.5,
    -17.0,  500.0,  17.0,
    -17.0,  500.0, -17.0,
  ],
  [
  	-17.0,  500.0, 17.0,
 		17.0,  500.0, 17.0,
    0.0,  555.0,  0.0,
  ],
  [
  	17.0,  500.0, 17.0,
 		17.0,  500.0,  -17.0,
    0.0,  555.0,  0.0,
  ],
  [
  	17.0,  500.0,  -17.0,
   	-17.0,  500.0,  -17.0,
   	0.0,  555.0,  0.0,
  ],
  [
   	-17.0,  500.0,  -17.0,
   	-17.0,  500.0, 17.0,
   	0.0,  555.0,  0.0,
  ],
];
const indices = [
	[
  	0, 1, 2,
  	0, 2, 3,
  ],
  [
  	0, 1, 2,
  	0, 2, 3,
  ],
  [
  	0, 1, 2,
  	0, 2, 3,
  ],
  [
  	0, 1, 2,
  	0, 2, 3,
  ],
  [
  	0, 1, 2,
  ],
  [
  	0, 1, 2,
  ],
  [
  	0, 1, 2,
  ],
  [
  	0, 1, 2,
  ],
];
const colors = [
	[
		1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
	],
	[
  	0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
  ],
	[
  	0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
  ],
	[
  	1.0, 0.0, 1.0,
    1.0, 0.0, 1.0,
    1.0, 0.0, 1.0,
    1.0, 0.0, 1.0,
  ],
	[
  	1.0, 1.0, 0.0,
    1.0, 1.0, 0.0,
    1.0, 1.0, 1.0,
  ],
	[
  	0.0, 1.0, 1.0,
    0.0, 1.0, 1.0,
    0.0, 1.0, 1.0,
  ],
	[
  	1.0, 0.5, 0.0,
    1.0, 0.5, 0.0,
    1.0, 0.5, 0.0,
  ],
	[
		1.0, 1.0, 1.0,
  	1.0, 1.0, 1.0,
  	1.0, 1.0, 1.0,
	],
];
const normals = [
	[
  	0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
  ],
  [
  	1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
  ],
  [
  	0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
  ],
  [
  	-1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
  ],
  [
  	0, 0.5, 1,
    0, 0.5, 1,
    0, 0.5, 1,
  ],
  [
  	1, 0.5, 0,
    1, 0.5, 0,
    1, 0.5, 0,
  ],
  [
  	0, 0.5, -1,
    0, 0.5, -1,
    0, 0.5, -1,
  ],
  [
  	-1, 0.5, 0,
    -1, 0.5, 0,
    -1, 0.5, 0,
  ],
];

/*
Loop through the array of face vertices.
For each one, create a new geometry with
those vertices and give the vertices
color and normals.
*/
for(let i = 0; i < vertices.length; i++){
	const geometry = new THREE.BufferGeometry();
	geometry.setIndex(indices[i]);
	geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices[i], 3));
	geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals[i], 3));
	geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors[i], 3));
  const material = new THREE.MeshPhysicalMaterial({vertexColors: true, roughness: 0.25});
  const t = new THREE.Mesh(geometry, material);
  monument.push(t);
  scene.add(t);
}

/*
Create an ambient light source
that is a soft white.
*/
//const l = new THREE.AmbientLight(0x101010);
//scene.add(l);

/*
Disco
*/
for(let i = 0; i < 50; i++){
	const l = 100 * Math.random() + 25;
	const a = (255 * Math.random());
  const b = (255 * Math.random());
  const c = (255 * Math.random());
  const d = new THREE.Vector3().randomDirection().multiplyScalar(l);
	const light = new THREE.PointLight(a << 16 | b << 8 | c, 1, 1.25 * l, 2);
  light.position.copy(d);
  scene.add(light);
}

/*
Shift all the faces down by 255, then
scale them to fit in the screen.
*/
for(let i = 0; i < monument.length; i++){
	monument[i].position.set(0, -255, 0);
	monument[i].applyMatrix4(new THREE.Matrix4().makeScale(0.13, 0.13, 0.13));
}
draw = function(){
 	/*
   Rotate the monument by applying a
   rotation matrix to each face.
   */
  for(let i = 0; i < monument.length; i++){
  	monument[i].applyMatrix4(new THREE.Matrix4().makeRotationY(0.02));
  }
}

 /*
 Call the animate() function.
 */
animate();
