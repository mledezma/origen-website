
// once everything is loaded, we run our Three.js stuff.
function init() {
	
	// create a scene, that will hold all our elements such as objects, cameras and lights.
	var scene = new THREE.Scene();

	// create a camera, which defines where we're looking at.
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

	// create a render and set the size
	var webGLRenderer = new THREE.WebGLRenderer();
	webGLRenderer.setClearColor(new THREE.Color(0xcccccc, 1.0));
	webGLRenderer.setSize(window.innerWidth, window.innerHeight);
	webGLRenderer.shadowMapEnabled = true;

	// position and point the camera to the center of the scene
	camera.position.x = 150;
	camera.position.y = 150;
	camera.position.z = 150;
	camera.lookAt(new THREE.Vector3(0, 20, 0));

	// add spotlight for the shadows
	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(150, 150, 150);
	spotLight.intensity = 2;
	scene.add(spotLight);

	// add the output of the renderer to the html element
	document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

	// model from http://www.thingiverse.com/thing:69709
	var loader = new THREE.ColladaLoader();

	var mesh;
	loader.load("../assets/models/dae/Truck_dae.dae", function (result) {
		mesh = result.scene.children[0].children[0].clone();
		mesh.scale.set(3.5, 3.5, 3.5);
		scene.add(mesh);
	});


	render();


	function render() {
		// render using requestAnimationFrame
		requestAnimationFrame(render);
		webGLRenderer.render(scene, camera);
	}
	
	function onResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		webGLRenderer.setSize(window.innerWidth, window.innerHeight);
	}
	
	// listen to the resize events
	window.addEventListener('resize', onResize, false);
}
window.onload = init;