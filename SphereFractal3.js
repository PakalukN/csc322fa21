/*
Add these:
<script src="https://threejs.org/build/three.js"></script>
body {
  margin: 0;
}
*/

// initialize
let renderer, scene, camera, draw, counter = 0;
function init(){
	renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(0, 0, 100);
}
function animate(){
	requestAnimationFrame(animate);
  counter++;
  draw();
  renderer.render(scene, camera);
}
init();

// begin the real stuff
let color, frac;
const TAU = 6.283185307179586;

var n = 5,
    d = 3,
    c = 0,
    t = 0;

for(let i = 1; i <= d + 1; i++){
	t += Math.pow(n, i);
}
  
// set up object
color = function(r, g, b){
 	return (r << 16) | (g << 8) | b;
}
frac = function(x, y, r, m, d, n, i, scene, positions){
  let rot = counter / 50.0;
  let a = ((2 * r) / (1 + m)) * (1 + m * (1 + Math.sin(rot * 2)) / 2), x1, y1;
  for(let k = 0; k < n; k++){
    x1 = x + 1 * Math.cos(d * rot + (k * TAU) / n) * (-r + a / 2);
    y1 = y + 1 * Math.sin(d * rot + (k * TAU) / n) * (-r + a / 2);
      
    if(positions.length < t){
      const geometry = new THREE.SphereGeometry(1, 20, 10);
      const material = new THREE.MeshStandardMaterial({color: color(80 * i, 255 - 80 * i , 80 * i), roughness: 0.25});
      const circle = new THREE.Mesh(geometry, material);

      circle.position.copy(new THREE.Vector3(x1, y1, 50 - 5 * i));

      scene.add(circle);
      positions.push(circle);
    }
    else{
    	positions[c].scale.set(a, a, a);
      positions[c].position.copy(new THREE.Vector3(x1, y1, 50 - 5 * i));
      c++;
    }
        
    if(i > 0){
      frac(x1, y1, a / 2, m, d * d, n, i - 1, scene, positions);
    }
  }
}
  
var positions = [];

frac(0, 0, 10, 2.5, 1.25, n, d, scene, positions);
c = 0;
  
const l = new THREE.AmbientLight(0x404040);
scene.add(l);

const dl = new THREE.DirectionalLight(0xffffff, 0.5);
dl.position.set(1, 1, 1);
scene.add(dl);

draw = function(){
  frac(0, 0, 10, 2.5, 1.25, n, d, scene, positions);
  c = 0;
}

animate();
