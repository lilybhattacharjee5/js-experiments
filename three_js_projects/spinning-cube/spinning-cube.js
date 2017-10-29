var THREE = require('./node_modules/three');

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var neg_or_pos = function() {
  var generator = Math.round(Math.random());
  if (generator == 0) {
    return -1;
  } else {
    return 1;
  }
}

camera.position.z = 100;

cubes = [];
var geometry;
var material;
var cube;
var cube_size;
var cube_x;
var cube_y;
var cube_z;
var hue;
var num_cubes = (Math.round(Math.random() * 300))

for (var i = 0; i < num_cubes; i++) {
  cube_size = Math.floor(Math.random() * 10)
  geometry = new THREE.BoxGeometry(cube_size, cube_size, cube_size);

  var hue;
  for (var j = 0; j < geometry.faces.length; j ++ ) {
      if (j % 2 == 0) {
        hue = Math.random() * 0xffffff;
      }
      var face = geometry.faces[j];
      face.color.setHex( hue );
  }

  material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors });
  cube = new THREE.Mesh( geometry, material );
  cube_x = Math.floor(Math.random() * camera.position.z) * neg_or_pos();
  cube_y = Math.floor(Math.random() * camera.position.z) * neg_or_pos();
  cube_z = Math.floor(Math.random() * camera.position.z) * neg_or_pos();
  cubes.push(cube);
  scene.add(cube);
  cubes[i].position.set(cube_x, cube_y, cube_z);
  THREE.GeometryUtils.merge(geometry, cube);
}

var rotate_factor = 1500;
var toggle_x;

var animate = function () {
  requestAnimationFrame( animate );

  for (var i = 0; i < cubes.length; i++) {
    cubes[i].rotation.x += cubes[i].geometry.parameters.width / rotate_factor;
    cubes[i].rotation.y += cubes[i].geometry.parameters.width / rotate_factor;
    cubes[i].rotation.z += cubes[i].geometry.parameters.width / rotate_factor;
  }

  renderer.render(scene, camera);
};

animate();
