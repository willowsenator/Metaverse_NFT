const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue')

// Camera and renderer configuration
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Settings scene lights
const ambient_light = new THREE.AmbientLight(0x404040);
const directional_light = new THREE.DirectionalLight(0xffffff, 1);
ambient_light.add(directional_light)
scene.add(ambient_light)

//Settings the flat plane of the Metaverse
const geometry_space = new THREE.BoxGeometry(100, 0.2, 50)
const material_space = new THREE.MeshPhongMaterial({ color: 0xffffff })
const space = new THREE.Mesh( geometry_space, material_space )
scene.add( space )


// Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.set(10, 10, 50);

function animate() {
    cube.rotateX(0.01);
    cube.rotateY(0.001);
    cube.rotateZ(0.0001);
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}

animate();