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
 Define a new BufferGeometry and name it Monument
 */
const geometry = new THREE.BufferGeometry();
geometry.name = "Monument";

/*
Define the vertices array, which holds
the vertices of the monument.
*/
const vertices = [
 	 27.5,  0.0, -27.5,   // vertex 0: bottom front left
  -27.5,  0.0, -27.5,   // vertex 1: bottom back left
 	-27.5,  0.0,  27.5,   // vertex 2: bottom back right
   27.5,  0.0,  27.5,   // vertex 3: bottom front right
   
   17.0,  500.0, -17.0, // vertex 4: top front left
 	-17.0,  500.0, -17.0, // vertex 5: top back left
 	-17.0,  500.0,  17.0, // vertex 6: top back right
   17.0,  500.0,  17.0, // vertex 7: top front right
   
 	  0.0,  555.0,  0.0,  // vertex 8: top top
];

/*
Define the indices array, which holds the
indices of the faces. 
*/
const indices = [
	0, 1, 5, // front face, left triangle
  0, 5, 4, // front face, right triangle
  
  1, 2, 6, // left face, left triangle
  1, 6, 5, // left face, right triangle
  
  2, 3, 7, // back face, left triangle
  2, 7, 6, // back face, right triangle
  
  3, 0, 4, // right face, left triangle
  3, 4, 7, // right face, right triangle
  
  4, 5, 8, // front top triangle
  5, 6, 8, // left top triangle
  6, 7, 8, // back top triangle
  7, 4, 8, // right top triangle
];

/*
Define the color array. Each color is
assigned to a vertex, and when each
triangle is rendered, the color of
each point is determined by interpolating
between the vertex colors.
*/
const colors = [
	0.0, 0.0, 0.0, // black
	0.0, 0.0, 1.0, // cyan
  0.0, 1.0, 0.0, // green
  0.0, 1.0, 1.0, // blue
  1.0, 0.0, 0.0, // red
  1.0, 0.0, 1.0, // pink
  1.0, 1.0, 0.0, // yellow
  1.0, 1.0, 1.0, // white
  0.5, 0.5, 0.5, // gray
];

/*
Define the surface normal array,
one normal for each vertex.
*/
const normals = [
	1, 0, -1,
  -1, 0, -1,
  -1, 0, 1,
  1, 0, 1,
  1, 0.5, -1,
  -1, 0.5, -1,
  -1, 0.5, 1,
  1, 0.5, 1,
  0, 1, 0,
];

/*
Add the indices, vertices, normals, and
colors to the BufferGeometry
*/
geometry.setIndex(indices);
geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

 /*
 Define a new material to apply to a new
 shape. vertexColors is an input metric
 that simply tells the geometry to use
 the color array inputted below.
 */
const material = new THREE.MeshPhongMaterial({vertexColors: true});

 /*
 Add the monument geometry to the scene
 with the material we defined earlier.
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
 is bright white and points in
 the direction of the origin
 from (1, 1, 1)
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
test.position.set(0, -255, 0);
test.applyMatrix4(new THREE.Matrix4().makeScale(0.13, 0.13, 0.13));
draw = function(){
 	/*
   Rotate the monument by applying three
   rotation matrices, one for the x
   axis, one for the y axis, and one
   for the z axis.
   */
 	//test.applyMatrix4(new THREE.Matrix4().makeRotationX(0.05));
  test.applyMatrix4(new THREE.Matrix4().makeRotationY(0.05));
	//test.applyMatrix4(new THREE.Matrix4().makeRotationZ(0.05));
}

 /*
 Call the animate() function. This function
 is then re-called about 60 times per second,
 so animations are produced by making small
 changes in the scene for every call of animate()
 */
animate();
