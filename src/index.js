
import {
  AxesHelper, 
  Color, 
  MeshPhongMaterial, 
  GridHelper, 
  Group, 
  Mesh,
  OrthographicCamera, 
  BoxBufferGeometry, 
  MeshBasicMaterial, 
  WebGLRenderer, 
  Scene, 
  PerspectiveCamera, 
  PointLight, 
  BoxGeometry,
  DirectionalLight
} from './three/three.module'

import OrbitControls from './controls/OrbitControls'
import {TransformControls} from './controls/TransformControls'
import { DragControls } from './controls/DragControls'



var renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild( renderer.domElement );
const aspect = window.innerWidth / window.innerHeight;


const container = document.body

const camera = new PerspectiveCamera( 50, aspect, 0.01, 3000 );
// const cameraOrtho = new OrthographicCamera( - 600 * aspect, 600 * aspect, 600, - 600, 0.01, 30000 );

camera.position.set( 0, 300, 1000 );

const scene = new Scene()
scene.add( new GridHelper( 1000, 10 ) );

var light = new DirectionalLight( 0xffffff, 2 );
light.position.set( 1, 1, 1 );
scene.add( light );


const controls = new OrbitControls(camera, renderer.domElement )
controls.enableDamping = true
controls.dampingFactor = 0.15
controls.target.set(0, 0, 0);
controls.update();
controls.addEventListener( 'change', render );
controls.start()

container.style.overflow = 'hidden'
container.style.margin = 0
container.appendChild(renderer.domElement)
renderer.setClearColor(0x3d3b33)
var control = new TransformControls( camera, renderer.domElement );
control.addEventListener( 'change', render );
control.addEventListener( 'dragging-changed', function ( event ) {

  controls.enabled = ! event.value;

} );
// var group = new Group();
// group.translateOnAxis( 100, 50, 50 );

var geometry1 = new BoxBufferGeometry( 200, 200, 200 );
geometry1.translate( 100, 50, 50 );
var material1 = new MeshPhongMaterial( {
  color: new Color('blue'),
  opacity: 0.5,
  transparent: true} 
);

var A1 = new Mesh( geometry1, material1 );
control.setMode( "translate" );

const a = [
  {x:  0, y: 0, z: 0, oX: 100, oY: 100, oZ: 100, color: "green" },
  {x:  100, y: 0, z: 0, oX: 100, oY: 100, oZ: 50, color: "red" },
  {x:  100, y: 0, z: 50, oX: 100, oY: 50, oZ: 50, color: "blue" },
  {x:  0, y: 0, z: 100, oX: 100, oY: 50, oZ: 50, color: "white" },
]

a.map(b => {
  var geometry2 = new BoxBufferGeometry( b.oX, b.oY, b.oZ );
  var material2 = new MeshBasicMaterial( {color: new Color(b.color)} );
  var A2 = new Mesh( geometry2, material2 );
  A2.position.set((b.oX / 2) + b.x, (b.oY / 2) + b.y, (b.oZ / 2) + b.z);
  A1.add(A2)
})


// var geometry2 = new BoxBufferGeometry( 100, 50, 50 );
// var material2 = new MeshBasicMaterial( {color: new Color('red')} );
// var A2 = new Mesh( geometry2, material2 );
// A2.position.set(50, 25, 25);
// A1.add(A2)


scene.add( A1 );
control.attach( A1 );
const axes = new AxesHelper(500);
axes.material.depthTest = false;
// axes.renderOrder = 1;
scene.add(axes);
scene.add(control);

//create a group and add the two cubes
//These cubes can now be rotated / scaled etc as a group
// var group = new Group();
// group.add( cubeA );
// group.add( cubeB );
// group.position.set(0, 0, 0);

// scene.add( group );
const dragControls = new DragControls( [ A1 ], camera, renderer.domElement );

dragControls.addEventListener( 'drag', render );

dragControls.addEventListener( 'dragging-changed', function ( event ) {

  controls.enabled = ! event.value;

} );

dragControls.addEventListener( 'dragstart', function ( event ) {
  controls.enabled = false
  event.object.material.emissive.set( 0xaaaaaa );
  console.log(event.value)

} );

dragControls.addEventListener( 'dragend', function ( event ) {
  controls.enabled = true
  event.object.material.emissive.set( 0x000000 );
  console.log(event.value)

} );


camera.position.z = 5;

var animate = function () {
  requestAnimationFrame( animate );

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update()
  renderer.render( scene, camera );
};

animate();
window.addEventListener('resize', onResize)
function onResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // composer.setSize(window.innerWidth, window.innerHeight)
}

function render() {

  renderer.render( scene, camera );

}

// /* Custom settings */
// const SETTINGS = {
//   useComposer: true
// }
// let composer
// let stats

// /* Init renderer and canvas */
// const container = document.body
// const renderer = new WebGLRenderer()
// container.style.overflow = 'hidden'
// container.style.margin = 0
// container.appendChild(renderer.domElement)
// renderer.setClearColor(0x3d3b33)

// /* Main scene and camera */
// const scene = new Scene()
// const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
// const controls = new OrbitControls(camera)
// camera.position.z = 10
// controls.enableDamping = true
// controls.dampingFactor = 0.15
// controls.start()

// /* Lights */
// const frontLight = new PointLight(0xFFFFFF, 1)
// const backLight = new PointLight(0xFFFFFF, 1)
// scene.add(frontLight)
// scene.add(backLight)
// frontLight.position.set(20, 20, 20)
// backLight.position.set(-20, -20, 20)


// var geometry = new BoxGeometry();
// var material = new MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new Mesh( geometry, material );
// scene.add( cube );
// // onResize();
// animate();

// /* Various event listeners */
// window.addEventListener('resize', onResize)

// // /* Preloader */
// // preloader.init(new ImageResolver(), new GLTFResolver(), new TextureResolver())
// // preloader.load([
// //   { id: 'searchImage', type: 'image', url: SMAAEffect.searchImageDataURL },
// //   { id: 'areaImage', type: 'image', url: SMAAEffect.areaImageDataURL },
// //   { id: 'helmet', type: 'gltf', url: 'assets/models/DamagedHelmet.glb' },
// //   { id: 'env', type: 'texture', url: 'assets/textures/pisa.jpg' }
// // ]).then(() => {
// //   initPostProcessing()
// //   onResize()
// //   animate()

// //   /* Actual content of the scene */
// //   const helmet = new Helmet()
// //   scene.add(helmet)
// // })

// /* some stuff with gui */
// // if (DEVELOPMENT) {
// //   const guigui = require('guigui')
// //   guigui.add(SETTINGS, 'useComposer')

// //   const Stats = require('stats.js')
// //   stats = new Stats()
// //   stats.showPanel(0)
// //   container.appendChild(stats.domElement)
// //   stats.domElement.style.position = 'absolute'
// //   stats.domElement.style.top = 0
// //   stats.domElement.style.left = 0
// // }

// /* -------------------------------------------------------------------------------- */
// function initPostProcessing () {
//   composer = new EffectComposer(renderer)
//   const bloomEffect = new BloomEffect()
//   const smaaEffect = new SMAAEffect(preloader.get('searchImage'), preloader.get('areaImage'))
//   const effectPass = new EffectPass(camera, smaaEffect, bloomEffect)
//   const renderPass = new RenderPass(scene, camera)
//   composer.addPass(renderPass)
//   composer.addPass(effectPass)
//   effectPass.renderToScreen = true
// }

// /**
//   Resize canvas
// */
// function onResize () {
//   camera.aspect = window.innerWidth / window.innerHeight
//   camera.updateProjectionMatrix()
//   renderer.setSize(window.innerWidth, window.innerHeight)
//   // composer.setSize(window.innerWidth, window.innerHeight)
// }

// /**
//   RAF
// */
// function animate() {
//   window.requestAnimationFrame(animate)
//   // render()
// }

// /**
//   Render loop
// */
// // function render () {
// //   if (DEVELOPMENT) {
// //     stats.begin()
// //   }

// //   controls.update()
// //   if (SETTINGS.useComposer) {
// //     composer.render()
// //   } else {
// //     renderer.clear()
// //     renderer.render(scene, camera)
// //   }

// //   if (DEVELOPMENT) {
// //     stats.end()
// //   }
// // }
