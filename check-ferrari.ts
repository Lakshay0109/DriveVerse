import https from 'https';
https.request('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/Ferrari.glb', { method: 'HEAD' }, (res) => {
    console.log(res.statusCode);
}).end();
