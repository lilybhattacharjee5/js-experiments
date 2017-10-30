var THREE = require("../node_modules/three");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function onMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  console.log(mouse.x + ' ' + mouse.y);
}

var render = function() {
  renderer.render(scene, camera);
}

window.addEventListener('mousemove', onMouseMove, false);
window.requestAnimationFrame(render);
