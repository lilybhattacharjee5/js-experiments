var THREE = require('../node_modules/three');

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

camera.position.z = 0;

var stars = [];
var geometry;
var material;
var sphere;
var sphere_size;
var sphere_x;
var sphere_y;
var sphere_z;
var hue;

var color_sphere = function() {
  var color_picker = Math.floor(Math.random() * 3);
  // blue
  if (color_picker == 0) {
    return "rgb(" + 0 + ", " + 0 + ", " + Math.floor(Math.random() * 256) + ")";
  }
  // red / orange
  else if (color_picker == 1) {
    return "rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + 0 + ")";
  }
  // yellow
  else {
    var red_value = Math.floor(Math.random() * 256)
    return "rgb(" + red_value + ", " +  Math.floor(red_value / 2) + ", " + 0 + ")";
  }
}

var create_sphere = function() {
  sphere_size = Math.random() * 3;
  geometry = new THREE.SphereGeometry(sphere_size);

  material = new THREE.MeshBasicMaterial( { color: color_sphere() });
  sphere = new THREE.Mesh( geometry, material );
  sphere_x = Math.floor(Math.random() * (camera.position.x + 100)) * neg_or_pos();
  sphere_y = Math.floor(Math.random() * (camera.position.y + 100)) * neg_or_pos();
  sphere_z = Math.floor(Math.random() * (camera.position.z + 100)) * neg_or_pos();
  sphere.position.set(sphere_x, sphere_y, sphere_z);
  stars.push(sphere);
  scene.add(sphere);
  THREE.GeometryUtils.merge(geometry, sphere);
}

var rotate_factor = 500;

var animate = function () {
  requestAnimationFrame( animate );

  if (stars.length < 10) {
    create_sphere();
  } else {
    scene.remove(stars[stars.length]);
    stars.pop();
  }

  for (var i = 0; i < stars.length; i++) {
    stars[i].rotation.x += stars[i].geometry.parameters.radius / rotate_factor;
    stars[i].rotation.y += stars[i].geometry.parameters.radius / rotate_factor;
    stars[i].rotation.z += stars[i].geometry.parameters.radius / rotate_factor;
  }

  camera.position.z++;

  renderer.render(scene, camera);
};

animate();
