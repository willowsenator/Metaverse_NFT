import Movements from "./movements.js";
import blockchain from "./web3.js";
import {mint, withdraw} from "./web3.js";
import * as THREE from "three";
import { OrbitControls } from "../../libraries/controls/OrbitControls.js";


const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue')

// Camera and renderer configuration
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls
let controls = new OrbitControls( camera, renderer.domElement );

// Settings scene lights
const ambient_light = new THREE.AmbientLight(0x404040);
const directional_light = new THREE.DirectionalLight(0xffffff, 1);
ambient_light.add(directional_light)
scene.add(ambient_light)

//Settings the flat plane of the Metaverse
const geometry_space = new THREE.BoxGeometry(100, 0.2, 50);
const material_space = new THREE.MeshPhongMaterial({color: 0xffffff});
const space = new THREE.Mesh(geometry_space, material_space);
scene.add(space);

window.addEventListener("resize", onWindowResize);

camera.position.set(10, 10, 50);



function animate() {
    requestAnimationFrame(animate);
    controls.update();

    // Left Movement
    if (Movements.isPressed(37)) {
        camera.translateX(-0.05)
    }

    // Up Movement
    if (Movements.isPressed(38)) {
        camera.translateX(0.05)
        camera.translateY(0.05)
    }

    // Right Movement
    if (Movements.isPressed(39)) {
        camera.translateX(0.05)
    }

    // Down Movement
    if (Movements.isPressed(40)) {
        camera.translateX(-0.05)
        camera.translateY(-0.05)
    }

    camera.lookAt(space.position);

    renderer.render(scene, camera);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

animate();

// Web3 connection and add buildings to Metaverse
blockchain.then(result => {
    result.buildings.forEach((building, index) => {
        if (index < result.supply) {
            const geometry_nft = new THREE.BoxGeometry(building.w, building.h, building.d);
            const material_nft = new THREE.MeshPhongMaterial({color: 0x3affea});
            const nft = new THREE.Mesh(geometry_nft, material_nft);
            scene.add(nft);
            nft.position.set(building.x, building.y, building.z);
        }
    });
});


// Create NFT in the Metaverse
const mint_button = document.getElementById("mint");
mint_button.addEventListener("click", mint_NFT);

function mint_NFT() {
    const nft_name = document.getElementById("nft_name").value;
    const nft_width = document.getElementById("nft_width").value;
    const nft_height = document.getElementById("nft_height").value;
    const nft_depth = document.getElementById("nft_depth").value;
    const nft_posX = document.getElementById("nft_positionX").value;
    const nft_posY = document.getElementById("nft_positionY").value;
    const nft_posZ = document.getElementById("nft_positionZ").value;

    mint(nft_name, nft_width, nft_height, nft_depth, nft_posX, nft_posY, nft_posZ);

}

// Withdraw Balance from the Metaverse
const withdraw_button = document.getElementById("withdraw");
withdraw_button.addEventListener("click", withdraw_from_metaverse);

function withdraw_from_metaverse(){
    withdraw();
}