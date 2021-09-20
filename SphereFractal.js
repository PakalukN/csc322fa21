// initialize
let renderer, scene, camera;

// frame count
let frameCount;

init();

function init(){
	// renderer stuff
	renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // scene stuff
  scene = new THREE.Scene();
  
  // camera stuff
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(0, 0, 100);
  
  // set up object
  const TAU = 6.283185307179586;
  function frac(x, y, r, m, d, n, i, scene){
    var g = 5.730;
    var a = ((2 * r) / (1 + m)) * (1 + m * (1 + Math.sin(g * 2)) / 2), x1, y1;
    for(var k = 0; k < n; k++){
    	x1 = x + Math.cos(d * g + (k * TAU) / n) * (-r + a / 2);
      y1 = y + Math.sin(d * g + (k * TAU) / n) * (-r + a / 2);
      
      const geometry = new THREE.SphereGeometry(a, 32, 16);
      const material = new THREE.MeshStandardMaterial({color: 0x33cc33});
      const circle = new THREE.Mesh(geometry, material);
      
      circle.position.copy(new THREE.Vector3(x, y, 50));
      
      scene.add(circle);
      if(i > 0){
        frac(x1, y1, a / 2, m, -d * d, n, i - 1, scene);
      }
    }
	}
  frac(0, 0, 20, 2.5, 1.25, 5, 3, scene);
  
  const l = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add(l);
  
  let dl = new THREE.DirectionalLight(0xffffff, 0.5);
  dl.position = new THREE.Vector3(10, 10, 10);
  //dl.castShadow = true;
	scene.add(dl);
  
  renderer.render(scene, camera);
}

function animate(){
	requestAnimationFrame(animate);
  
  
}



