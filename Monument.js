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
  renderer.setPixelRatio( window.devicePixelRatio );
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
Define a new geometry with vertices,
faces, a radius of 15 and 0 subdivision.
The radius is the size of the object,
and the subdivision is how much the
shape looks like a sphere.
*/
const geometry = new THREE.BufferGeometry();
geometry.name = "Joe";

/*const vertices = new Float32Array([
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0,
]);*/
const vertices = new Float32Array([
	-27.5,  0.0, -27.5,
	 27.5,  0.0, -27.5,
	 27.5,  0.0,  27.5,
  -27.5,  0.0,  27.5,
  
  -17.0,  500.0, -17.0,
	 17.0,  500.0, -17.0,
	 17.0,  500.0,  17.0,
  -17.0,  500.0,  17.0,
  
	  0.0, 555.0,  0.0,
]);

const indices = new Uint32Array([
	0, 2, 1,
  0, 2, 3,
]);
//console.log(geometry);
const indexAttribute = new THREE.BufferAttribute(indices, 3);
const vertexAttribute = new THREE.BufferAttribute(vertices, 3);
//console.log(indexAttribute);

geometry.setIndex(indexAttribute);
geometry.setAttribute("position", vertexAttribute);
console.log(geometry);

/*
Define a new material to apply to a new
shape. 0x509050 is hexadecimal for color.
It can be interpreted in this way:
0x: Hexadecimal indication
50: Red color value,   80  in decimal
90: Green color value, 144 in decimal
50; Blue color value,  80  in decimal
Roughness simply defines the roughness of
the surfaces. Lower roughness means a shinier
surface.
*/
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

/*
Add the cube geometry to the scene with
the material we defined earlier.
*/
test = new THREE.Mesh(geometry, material);
scene.add(test);

/*
Create an ambient light source
that is a soft white.
*/
const l = new THREE.AmbientLight(0x404040);
scene.add(l);

/*
Create a directional light that
is bright white and in location
(1, 1, 1). Add it to the scene.
*/
const dl = new THREE.DirectionalLight(0xffffff, 0.5);
dl.position.set(1, 1, 1);
scene.add(dl);

/*
I use the draw() function to enable
easier animation. I call it in the
animate() function to produce change
in the environment, thereby creating
the illusion of animation.
*/
test.applyMatrix4(new THREE.Matrix4().makeScale(0.1, 0.1, 0.1));
draw = function(){
	/*
  Rotate the cube by applying three
  rotation matrices, one for the x
  axis, one for the y axis, and one
  for the z axis.
  */
	test.applyMatrix4(new THREE.Matrix4().makeRotationX(0.05));
  test.applyMatrix4(new THREE.Matrix4().makeRotationY(0.05));
  test.applyMatrix4(new THREE.Matrix4().makeRotationZ(0.05));
}

/*
Call the animate() function. This function
is then re-called about 60 times per second,
so animations are produced by making small
changes in the scene for every call of animate()
*/
animate();
