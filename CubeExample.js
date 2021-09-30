/*
Remember to add these:
html: <script src="https://threejs.org/build/three.js"></script>
css:  body {margin: 0;}
*/

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
This array defines the vertices of a 3D object.
In this case, that object is a cube. A cube has
8 vertices, so this array contains 24 elements.
Each set of 3 elements defines one vertex of the
polyhedron, which in this case is a cube. For
example, the first three elements of the array
are (-1, -1, -1), which is the (x, y, z) location
of a vertex.
*/
const vertices = [
    -1, -1, -1, // vertex 0
     1, -1, -1, // vertex 1
     1,  1, -1, // vertex 2
    -1,  1, -1, // vertex 3
    -1, -1,  1, // vertex 4
     1, -1,  1, // vertex 5
     1,  1,  1, // vertex 6
    -1,  1,  1, // vertex 7
];

/*
This array defines the faces of a 3D object.
In this case, that object is a cube. A cube
has 6 faces, and each face is a square. A
square is a quadrilateral though, and WebGL
can only render triangles. This means that
to define the 6 quadrilateral faces of a cube,
we need to define 12 triangle faces, two for
each quadrilateral. The faces are defined as
sets of three vertices from the vertex array.
For example, the first three elements of the
array are (2, 1, 0), which are the numbers for
the vertices 2, 1, and 0 in the vertex array.
This defines a triangle with vertices at vertex
2 of the cube, vertex 1 of the cube, and vertex
0 of the cube. Note that order matters for
backface culling of triangular faces.
*/
const faces = [
    2, 1, 0, // face 0
    0, 3, 2, // face 1
    0, 4, 7, // face 2
    7, 3, 0, // face 3
    0, 1, 5, // face 4
    5, 4, 0, // face 5
    1, 2, 6, // face 6
    6, 5, 1, // face 7
    2, 3, 7, // face 8
    7, 6, 2, // face 9
    4, 5, 6, // face 10
    6, 7, 4, // face 11
];

/*
Define a new geometry with vertices,
faces, a radius of 15 and 0 subdivision.
The radius is the size of the object,
and the subdivision is how much the
shape looks like a sphere.
*/
const geometry = new THREE.PolyhedronGeometry(vertices, faces, 15, 0);

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
const material = new THREE.MeshStandardMaterial({color: 0x509050, roughness: 0.25});

/*
Add the cube geometry to the scene with
the material we defined earlier.
*/
cube = new THREE.Mesh(geometry, material);
scene.add(cube);

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
draw = function(){
	/*
  Rotate the cube by applying three
  rotation matrices, one for the x
  axis, one for the y axis, and one
  for the z axis.
  */
	cube.applyMatrix4(new THREE.Matrix4().makeRotationX(0.01));
  cube.applyMatrix4(new THREE.Matrix4().makeRotationY(0.01));
  cube.applyMatrix4(new THREE.Matrix4().makeRotationZ(0.01));
}

/*
Call the animate() function. This function
is then re-called about 60 times per second,
so animations are produced by making small
changes in the scene for every call of animate()
*/
animate();
