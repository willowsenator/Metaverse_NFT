import Movements from "./movements.js";
import blockchain from "./web3.js";

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


// Geometric figure: Cube
/*const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Geometric figure: Cone
const geometry_cone = new THREE.ConeGeometry(5, 20, 32);
const material_cone = new THREE.MeshPhongMaterial({color: 0x0aedf1});
const cone = new THREE.Mesh(geometry_cone, material_cone);
cone.position.set(10, 10, 0)
scene.add(cone);

// Geometric figure: Cylinder
const geometry_cylinder = new THREE.CylinderGeometry( 5, 5, 20, 32 );
const material_cylinder = new THREE.MeshPhongMaterial( {color: 0xffff00} );
const cylinder = new THREE.Mesh( geometry_cylinder, material_cylinder );
scene.add( cylinder );
cylinder.position.set(-10, 10, 0)
scene.add(cylinder);*/


camera.position.set(10, 10, 50);

function animate() {
   /* cube.rotateX(0.01);
    cube.rotateY(0.001);
    cube.rotateZ(0.0001);

    cone.rotateX(0.01);
    cone.rotateY(0.02);

    cylinder.rotateY(0.05)
    cylinder.rotateX(0.03)*/


    requestAnimationFrame( animate );

    // Left Movement
    if(Movements.isPressed(37)){
        camera.translateX(-0.05)
    }

    // Up Movement
    if(Movements.isPressed(38)){
        camera.translateX(0.05)
        camera.translateY(0.05)
    }

    // Right Movement
    if(Movements.isPressed(39)){
        camera.translateX(0.05)
    }

    // Down Movement
    if(Movements.isPressed(40)){
        camera.translateX(-0.05)
        camera.translateY(-0.05)
    }

    camera.lookAt(space.position);

    renderer.render( scene, camera );
}

animate();