// initialize
let renderer, scene, camera, draw;

// other stuff
var counter = 0.0;
let color, frac;
const TAU = 6.283185307179586;

init();
animate();

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
 	color = function(r, g, b){
  	return (r << 16) | (g << 8) | b;
  }
  frac = function(x, y, r, m, d, n, i, scene){
  	let rot = counter / 50.0;
    //let rot = 5.730;
    let a = ((2 * r) / (1 + m)) * (1 + m * (1 + Math.sin(rot * 2)) / 2), x1, y1;
    for(let k = 0; k < n; k++){
    	x1 = x + Math.cos(d * rot + (k * TAU) / n) * (-r + a / 2);
      y1 = y + Math.sin(d * rot + (k * TAU) / n) * (-r + a / 2);
      
      const geometry = new THREE.SphereGeometry(a, 32, 16);
      const material = new THREE.MeshStandardMaterial({color: color(255 * i, 255 - 255 * i , 255 * i), roughness: 0.25});
      const circle = new THREE.Mesh(geometry, material);
      
      circle.position.copy(new THREE.Vector3(x1, y1, 50 - 5 * i));
      
      /*c++;
      if(positions.length){
      	//positions[c] = 
      }
      else{*/
      	scene.add(circle);
        //positions.push(new THREE.Vector3(x, y, 50));
      //}
      if(i > 0){
        frac(x1, y1, a / 2, m, -d * d, n, i - 1, scene);
      }
    }
	}
  
  //var positions = [], c = 0;
  
  frac(0, 0, 10, 2.5, 1.25, 5, 1, scene);
  
  const l = new THREE.AmbientLight(0x404040);
	scene.add(l);
  
  const dl = new THREE.DirectionalLight(0xffffff, 0.5);
  dl.position.set(1, 1, 1);
	scene.add(dl);
  
  renderer.render(scene, camera);
  
  draw = function(){
  	scene.clear();
    
    camera.position.set(0, 0, 100);
    
    const l = new THREE.AmbientLight(0x404040);
		scene.add(l);
  
  	const dl = new THREE.DirectionalLight(0xffffff, 0.5);
  	dl.position.set(1, 1, 1);
		scene.add(dl);
    
    frac(0, 0, 10, 2.5, 1.25, 5, 1, scene);
    
    renderer.render(scene, camera);
  	
  }
  
}

function animate(){
	requestAnimationFrame(animate);
  
  counter++;
  
  if(counter < 125){
    draw();
  }
  
}

