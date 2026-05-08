/* ══════════════════════════════════════════════════════
   CLITUS PC — ULTIMATE 3D ENGINE
   Three.js r160 | Cinematic | Apple/Tesla/Nike style
══════════════════════════════════════════════════════ */
(function () {
'use strict';

var THREE = window.THREE;

/* ─────────────────────────────────────────
   UTILS
───────────────────────────────────────── */
function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function rand(a, b) { return a + Math.random() * (b - a); }

/* ─────────────────────────────────────────
   1. LOADING SCREEN 3D
───────────────────────────────────────── */
function initLoading() {
  var overlay = document.getElementById('loadingScreen');
  var canvas  = document.getElementById('loadingCanvas');
  if (!overlay || !canvas || !THREE) return;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(200, 200);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  var scene  = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50);
  camera.position.z = 3.2;

  var geo  = new THREE.TorusKnotGeometry(0.75, 0.22, 120, 18);
  var mat  = new THREE.MeshStandardMaterial({ color: 0x1a56db, emissive: 0x3b82f6, emissiveIntensity: 0.4, metalness: 0.9, roughness: 0.1 });
  var mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);
  scene.add(new THREE.AmbientLight(0x0f172a, 2));
  var pl = new THREE.PointLight(0x3b82f6, 6, 12); pl.position.set(3, 3, 3); scene.add(pl);
  var pl2 = new THREE.PointLight(0x7c3aed, 4, 10); pl2.position.set(-3, -2, 2); scene.add(pl2);

  var progress = 0;
  var bar = document.getElementById('loadingBar');
  var pct = document.getElementById('loadingPct');

  (function loop() {
    if (!overlay.classList.contains('active')) { renderer.dispose(); return; }
    requestAnimationFrame(loop);
    mesh.rotation.x += 0.018; mesh.rotation.y += 0.025;
    progress = Math.min(progress + 1.1, 100);
    if (bar) bar.style.width = progress + '%';
    if (pct) pct.textContent = Math.floor(progress) + '%';
    renderer.render(scene, camera);
  })();

  setTimeout(function () {
    overlay.style.opacity = '0';
    setTimeout(function () { overlay.style.display = 'none'; overlay.classList.remove('active'); }, 700);
  }, 1600);
}

/* ─────────────────────────────────────────
   2. HERO — FULL 3D CINEMATIC SCENE
   AI Core + Robot + Planet + Hologram text
   Camera parallax on mouse
───────────────────────────────────────── */
function initHero3D() {
  var canvas = document.getElementById('hero3DCanvas');
  if (!canvas || !THREE) return;

  var W = window.innerWidth, H = window.innerHeight;
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  var scene  = new THREE.Scene();
  scene.fog  = new THREE.FogExp2(0x020818, 0.035);
  var camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 300);
  camera.position.set(0, 1, 12);

  /* ── AI CORE (centre orb) ── */
  var coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // Inner energy sphere
  var coreGeo = new THREE.SphereGeometry(1.0, 64, 64);
  var coreMat = new THREE.MeshStandardMaterial({
    color: 0x1a56db, emissive: 0x3b82f6, emissiveIntensity: 0.8,
    metalness: 1.0, roughness: 0.0, transparent: true, opacity: 0.9
  });
  var coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreGroup.add(coreMesh);

  // Outer glass shell
  var shellGeo = new THREE.SphereGeometry(1.25, 64, 64);
  var shellMat = new THREE.MeshPhysicalMaterial({
    color: 0x3b82f6, transparent: true, opacity: 0.12,
    roughness: 0, metalness: 0, transmission: 0.9,
    thickness: 0.5, side: THREE.DoubleSide
  });
  coreGroup.add(new THREE.Mesh(shellGeo, shellMat));

  // Orbit rings
  function makeRing(r, tube, color, rx, ry, rz) {
    var g = new THREE.TorusGeometry(r, tube, 16, 120);
    var m = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.55 });
    var mesh = new THREE.Mesh(g, m);
    mesh.rotation.set(rx, ry, rz);
    return mesh;
  }
  var ring1 = makeRing(1.8, 0.018, 0x3b82f6, Math.PI/2.5, 0, 0);
  var ring2 = makeRing(2.1, 0.012, 0x7c3aed, Math.PI/4, Math.PI/6, 0);
  var ring3 = makeRing(2.5, 0.008, 0x06b6d4, Math.PI/6, Math.PI/3, Math.PI/5);
  coreGroup.add(ring1, ring2, ring3);
  coreGroup.position.set(3.5, 0.5, -2);

  /* ── PLANET (background) ── */
  var planetGroup = new THREE.Group();
  var planetGeo = new THREE.SphereGeometry(2.8, 64, 64);
  var planetMat = new THREE.MeshStandardMaterial({
    color: 0x0e1a3a, emissive: 0x0e3a8a, emissiveIntensity: 0.2,
    metalness: 0.3, roughness: 0.8
  });
  var planet = new THREE.Mesh(planetGeo, planetMat);
  planetGroup.add(planet);

  // Planet wireframe
  var pwGeo = new THREE.SphereGeometry(2.82, 20, 20);
  var pwMat = new THREE.MeshBasicMaterial({ color: 0x1a56db, wireframe: true, transparent: true, opacity: 0.08 });
  planetGroup.add(new THREE.Mesh(pwGeo, pwMat));

  // Atmosphere
  var atmGeo = new THREE.SphereGeometry(3.1, 32, 32);
  var atmMat = new THREE.MeshBasicMaterial({ color: 0x1a56db, transparent: true, opacity: 0.05, side: THREE.BackSide });
  planetGroup.add(new THREE.Mesh(atmGeo, atmMat));

  // Saturn-like ring
  var satGeo = new THREE.TorusGeometry(4.2, 0.35, 4, 200);
  var satMat = new THREE.MeshStandardMaterial({ color: 0x1e3a6e, emissive: 0x0e3a8a, emissiveIntensity: 0.3, transparent: true, opacity: 0.5 });
  var satRing = new THREE.Mesh(satGeo, satMat);
  satRing.rotation.x = Math.PI / 2.2;
  planetGroup.add(satRing);

  planetGroup.position.set(-5, -1, -8);
  scene.add(planetGroup);

  /* ── AI ROBOT (geometric) ── */
  var robotGroup = new THREE.Group();
  var robotMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, emissive: 0x1a56db, emissiveIntensity: 0.3, metalness: 0.9, roughness: 0.1 });
  var accentMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x3b82f6, emissiveIntensity: 0.8, metalness: 1.0, roughness: 0.0 });

  // Head
  var head = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), robotMat.clone());
  head.position.y = 2.2;
  robotGroup.add(head);
  // Eye glow
  [-0.22, 0.22].forEach(function(x) {
    var eye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), accentMat.clone());
    eye.position.set(x, 2.25, 0.46);
    robotGroup.add(eye);
  });
  // Body
  var body = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.2, 0.7), robotMat.clone());
  body.position.y = 1.1;
  robotGroup.add(body);
  // Chest panel
  var chest = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.05), accentMat.clone());
  chest.position.set(0, 1.15, 0.38);
  robotGroup.add(chest);
  // Arms
  [-0.75, 0.75].forEach(function(x) {
    var arm = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 1.0, 8), robotMat.clone());
    arm.position.set(x, 1.0, 0);
    arm.rotation.z = x > 0 ? -0.2 : 0.2;
    robotGroup.add(arm);
    var hand = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), accentMat.clone());
    hand.position.set(x * 1.05, 0.45, 0);
    robotGroup.add(hand);
  });
  // Legs
  [-0.3, 0.3].forEach(function(x) {
    var leg = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 1.0, 8), robotMat.clone());
    leg.position.set(x, 0.0, 0);
    robotGroup.add(leg);
  });
  // Neck connector
  var neck = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.25, 8), accentMat.clone());
  neck.position.y = 1.75;
  robotGroup.add(neck);

  robotGroup.position.set(-3.5, -0.5, -1);
  robotGroup.scale.setScalar(0.85);
  scene.add(robotGroup);

  /* ── HOLOGRAM TEXT PLANES ── */
  var holoGroup = new THREE.Group();
  var holoMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
  // Horizontal scan lines
  for (var i = 0; i < 8; i++) {
    var lineGeo = new THREE.PlaneGeometry(3.5, 0.015);
    var lineMesh = new THREE.Mesh(lineGeo, new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.25 + Math.random() * 0.2 }));
    lineMesh.position.set(0, -0.8 + i * 0.22, 0);
    holoGroup.add(lineMesh);
  }
  holoGroup.position.set(0, 2.5, 0);
  scene.add(holoGroup);

  /* ── CYBER GRID FLOOR ── */
  var gridHelper = new THREE.GridHelper(60, 60, 0x1a56db, 0x0e3a8a);
  gridHelper.position.y = -3.5;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.25;
  scene.add(gridHelper);

  // Neon grid lines (vertical)
  var vGridMat = new THREE.LineBasicMaterial({ color: 0x1a56db, transparent: true, opacity: 0.12 });
  for (var vi = -15; vi <= 15; vi += 3) {
    var vPts = [new THREE.Vector3(vi, -3.5, -30), new THREE.Vector3(vi, -3.5, 10)];
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(vPts), vGridMat));
  }

  /* ── FLOATING TECH ICONS (geometric) ── */
  var floatIcons = [];
  var iconShapes = [
    new THREE.OctahedronGeometry(0.18),
    new THREE.TetrahedronGeometry(0.2),
    new THREE.IcosahedronGeometry(0.15),
    new THREE.BoxGeometry(0.22, 0.22, 0.22),
    new THREE.DodecahedronGeometry(0.16)
  ];
  var iconColors = [0x1a56db, 0x7c3aed, 0x06b6d4, 0x3b82f6, 0x8b5cf6];
  for (var fi = 0; fi < 22; fi++) {
    var iGeo = iconShapes[fi % iconShapes.length];
    var iMat = new THREE.MeshStandardMaterial({
      color: iconColors[fi % iconColors.length],
      emissive: iconColors[fi % iconColors.length],
      emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.2,
      transparent: true, opacity: 0.75
    });
    var icon = new THREE.Mesh(iGeo, iMat);
    icon.position.set(rand(-9, 9), rand(-2, 4), rand(-10, 0));
    icon.userData = { vx: rand(-0.003, 0.003), vy: rand(0.002, 0.006), vz: 0, phase: rand(0, Math.PI * 2) };
    scene.add(icon);
    floatIcons.push(icon);
  }

  /* ── STAR FIELD ── */
  var starCount = 800;
  var starPos = new Float32Array(starCount * 3);
  for (var si = 0; si < starCount; si++) {
    starPos[si*3]   = rand(-80, 80);
    starPos[si*3+1] = rand(-40, 40);
    starPos[si*3+2] = rand(-80, -5);
  }
  var starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  var starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.6 });
  scene.add(new THREE.Points(starGeo, starMat));

  /* ── CYBER PARTICLES ── */
  var cpCount = 400;
  var cpPos = new Float32Array(cpCount * 3);
  for (var ci = 0; ci < cpCount; ci++) {
    cpPos[ci*3]   = rand(-15, 15);
    cpPos[ci*3+1] = rand(-5, 8);
    cpPos[ci*3+2] = rand(-12, 2);
  }
  var cpGeo = new THREE.BufferGeometry();
  cpGeo.setAttribute('position', new THREE.BufferAttribute(cpPos, 3));
  var cpMat = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.05, transparent: true, opacity: 0.5 });
  var cyberParticles = new THREE.Points(cpGeo, cpMat);
  scene.add(cyberParticles);

  /* ── LIGHTS ── */
  scene.add(new THREE.AmbientLight(0x020818, 3));
  var sun = new THREE.PointLight(0x3b82f6, 8, 40); sun.position.set(8, 8, 5); scene.add(sun);
  var fill = new THREE.PointLight(0x7c3aed, 5, 30); fill.position.set(-8, -4, 4); scene.add(fill);
  var rim = new THREE.PointLight(0x06b6d4, 4, 20); rim.position.set(0, 6, -5); scene.add(rim);
  var coreLight = new THREE.PointLight(0x3b82f6, 6, 8); coreLight.position.copy(coreGroup.position); scene.add(coreLight);

  /* ── MOUSE PARALLAX ── */
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  document.addEventListener('mousemove', function (e) {
    mouse.tx = (e.clientX / W - 0.5) * 2;
    mouse.ty = -(e.clientY / H - 0.5) * 2;
  });

  /* ── SCROLL CAMERA ── */
  var scrollY = 0;
  window.addEventListener('scroll', function () { scrollY = window.scrollY; }, { passive: true });

  /* ── RESIZE ── */
  window.addEventListener('resize', function () {
    W = window.innerWidth; H = window.innerHeight;
    camera.aspect = W / H; camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  });

  /* ── ANIMATE ── */
  var clock = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    var t = clock.getElapsedTime();

    // Mouse lerp
    mouse.x = lerp(mouse.x, mouse.tx, 0.04);
    mouse.y = lerp(mouse.y, mouse.ty, 0.04);

    // Camera parallax + scroll
    camera.position.x = lerp(camera.position.x, mouse.x * 1.5, 0.05);
    camera.position.y = lerp(camera.position.y, 1 + mouse.y * 0.8 - scrollY * 0.003, 0.05);
    camera.position.z = lerp(camera.position.z, 12 - scrollY * 0.008, 0.05);
    camera.lookAt(0, 0.5, 0);

    // AI Core
    coreGroup.rotation.y += 0.008;
    coreMesh.scale.setScalar(1 + Math.sin(t * 1.8) * 0.04);
    coreMat.emissiveIntensity = 0.6 + Math.sin(t * 2) * 0.3;
    ring1.rotation.z += 0.012;
    ring2.rotation.x += 0.008;
    ring3.rotation.y += 0.006;
    coreLight.intensity = 5 + Math.sin(t * 2) * 2;

    // Planet
    planetGroup.rotation.y += 0.002;
    satRing.rotation.z += 0.003;

    // Robot idle animation
    robotGroup.position.y = -0.5 + Math.sin(t * 0.7) * 0.12;
    robotGroup.rotation.y = Math.sin(t * 0.3) * 0.15;
    head.rotation.y = Math.sin(t * 0.5) * 0.2;
    // Eye blink
    if (Math.sin(t * 3) > 0.97) {
      robotGroup.children.forEach(function(c) {
        if (c.material && c.material.emissiveIntensity > 0.7) c.scale.y = 0.1;
      });
    } else {
      robotGroup.children.forEach(function(c) {
        if (c.material && c.material.emissiveIntensity > 0.7) c.scale.y = 1;
      });
    }

    // Hologram scan
    holoGroup.children.forEach(function(line, i) {
      line.material.opacity = 0.1 + Math.abs(Math.sin(t * 1.5 + i * 0.4)) * 0.35;
    });
    holoGroup.position.y = 2.5 + Math.sin(t * 0.4) * 0.1;

    // Floating icons
    floatIcons.forEach(function(icon) {
      icon.rotation.x += 0.01;
      icon.rotation.y += 0.015;
      icon.position.y += Math.sin(t + icon.userData.phase) * 0.003;
      icon.position.x += icon.userData.vx;
      if (Math.abs(icon.position.x) > 10) icon.userData.vx *= -1;
    });

    // Cyber particles drift
    cyberParticles.rotation.y += 0.0003;

    // Grid pulse
    gridHelper.material.opacity = 0.18 + Math.sin(t * 0.5) * 0.08;

    renderer.render(scene, camera);
  })();
}

/* ── 3. GLOBE 3D ── */
function initGlobe3D(){
  var cv=document.getElementById('globe3DCanvas');if(!cv||!T)return;
  var W=cv.offsetWidth||480,H=cv.offsetHeight||480;
  var r=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true});r.setSize(W,H);r.setPixelRatio(Math.min(devicePixelRatio,2));
  var sc=new T.Scene(),cam=new T.PerspectiveCamera(45,W/H,0.1,100);cam.position.z=3.8;
  sc.add(new T.Mesh(new T.SphereGeometry(1,64,64),new T.MeshPhysicalMaterial({color:0x020c1b,emissive:0x0e3a8a,emissiveIntensity:0.12,metalness:0.2,roughness:0.8})));
  sc.add(new T.Mesh(new T.SphereGeometry(1.005,28,28),new T.MeshBasicMaterial({color:0x1a56db,wireframe:true,transparent:true,opacity:0.12})));
  sc.add(new T.Mesh(new T.SphereGeometry(1.18,32,32),new T.MeshBasicMaterial({color:0x1a56db,transparent:true,opacity:0.07,side:T.BackSide})));
  function ll(lat,lon,rad){var phi=(90-lat)*(Math.PI/180),theta=(lon+180)*(Math.PI/180);return new T.Vector3(-rad*Math.sin(phi)*Math.cos(theta),rad*Math.cos(phi),rad*Math.sin(phi)*Math.sin(theta));}
  var coords=[[10.8,106.6],[21,105.8],[1.3,103.8],[13.7,100.5],[35.7,139.7],[22.3,114.2],[37.6,127],[39.9,116.4],[51.5,-0.1],[48.8,2.3],[40.7,-74],[37.8,-122.4],[-33.9,151.2],[-23.5,-46.6],[19.4,-99.1],[55.7,37.6]];
  var vecs=[],nodes=[];
  coords.forEach(function(d){var v=ll(d[0],d[1],1.02);vecs.push(v);
    var n=new T.Mesh(new T.SphereGeometry(0.028,8,8),new T.MeshBasicMaterial({color:0x3b82f6}));n.position.copy(v);n.userData.phase=Math.random()*Math.PI*2;sc.add(n);nodes.push(n);
    var pr=new T.Mesh(new T.RingGeometry(0.03,0.055,16),new T.MeshBasicMaterial({color:0x3b82f6,transparent:true,opacity:0.6,side:T.DoubleSide}));pr.position.copy(v.clone().multiplyScalar(1.03));pr.lookAt(v.clone().multiplyScalar(3));pr.userData.phase=Math.random()*Math.PI*2;sc.add(pr);nodes.push(pr);});
  var am=new T.LineBasicMaterial({color:0x3b82f6,transparent:true,opacity:0.35});
  [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[0,4],[2,8],[5,10],[3,9],[1,7],[6,12]].forEach(function(p){
    if(!vecs[p[0]]||!vecs[p[1]])return;var pts=[];for(var i=0;i<=24;i++){var t=i/24;var pt=new T.Vector3().lerpVectors(vecs[p[0]],vecs[p[1]],t);pt.normalize().multiplyScalar(1.02+Math.sin(Math.PI*t)*0.18);pts.push(pt);}
    sc.add(new T.Line(new T.BufferGeometry().setFromPoints(pts),am.clone()));});
  sc.add(new T.AmbientLight(0x1e293b,2));var gl=new T.PointLight(0x3b82f6,4,12);gl.position.set(3,3,3);sc.add(gl);
  var drag=false,px=0,py=0,ry=0,rx=0;
  cv.addEventListener('mousedown',function(e){drag=true;px=e.clientX;py=e.clientY;});
  window.addEventListener('mouseup',function(){drag=false;});
  window.addEventListener('mousemove',function(e){if(!drag)return;ry+=(e.clientX-px)*0.005;rx+=(e.clientY-py)*0.005;px=e.clientX;py=e.clientY;});
  cv.addEventListener('touchstart',function(e){drag=true;px=e.touches[0].clientX;py=e.touches[0].clientY;},{passive:true});
  cv.addEventListener('touchend',function(){drag=false;});
  cv.addEventListener('touchmove',function(e){if(!drag)return;ry+=(e.touches[0].clientX-px)*0.005;rx+=(e.touches[0].clientY-py)*0.005;px=e.touches[0].clientX;py=e.touches[0].clientY;},{passive:true});
  window.addEventListener('resize',function(){var w=cv.offsetWidth,h=cv.offsetHeight;cam.aspect=w/h;cam.updateProjectionMatrix();r.setSize(w,h);});
  var gc=new T.Clock();
  (function loop(){requestAnimationFrame(loop);var t=gc.getElapsedTime();if(!drag)ry+=0.004;
    sc.children[0].rotation.y=ry;sc.children[0].rotation.x=rx;
    nodes.forEach(function(n){if(n.userData.phase!==undefined){n.material.opacity=0.3+Math.abs(Math.sin(t*1.8+n.userData.phase))*0.7;n.scale.setScalar(1+Math.sin(t*2+n.userData.phase)*0.4);}});
    r.render(sc,cam);})();
}

/* ── 4. PORTFOLIO 3D LAPTOP ── */
function initPortfolio3D(){
  var cv=document.getElementById('portfolio3DCanvas');if(!cv||!T)return;
  var W=cv.offsetWidth||700,H=cv.offsetHeight||400;
  var r=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true});r.setSize(W,H);r.setPixelRatio(Math.min(devicePixelRatio,2));r.toneMapping=T.ACESFilmicToneMapping;
  var sc=new T.Scene();sc.fog=new T.Fog(0x020818,15,40);var cam=new T.PerspectiveCamera(45,W/H,0.1,100);cam.position.set(0,2,8);cam.lookAt(0,0,0);
  var lg=new T.Group();var bm=new T.MeshStandardMaterial({color:0x1e293b,metalness:0.9,roughness:0.15});
  lg.add(new T.Mesh(new T.BoxGeometry(4,0.12,2.8),bm));
  var sg=new T.Group();sg.position.set(0,0.06,-1.4);
  sg.add(new T.Mesh(new T.BoxGeometry(4,2.6,0.1),bm.clone()));
  sg.add(new T.Mesh(new T.BoxGeometry(3.8,2.4,0.06),new T.MeshStandardMaterial({color:0x0f172a,metalness:0.5,roughness:0.3})));
  var sm=new T.MeshStandardMaterial({color:0x0a1628,emissive:0x1a56db,emissiveIntensity:0.4,metalness:0,roughness:1});
  var scr=new T.Mesh(new T.PlaneGeometry(3.5,2.1),sm);scr.position.set(0,1.3,0.08);sg.add(scr);
  sg.add(new T.Mesh(new T.PlaneGeometry(3.5,0.22),new T.MeshBasicMaterial({color:0x1a56db,transparent:true,opacity:0.8}))).position.set(0,2.3,0.09);
  [[-0.9,1.7],[-0.1,1.7],[0.7,1.7],[-0.9,1.2],[-0.1,1.2],[0.7,1.2]].forEach(function(bp,i){var bk=new T.Mesh(new T.PlaneGeometry(0.65,0.38),new T.MeshBasicMaterial({color:[0x1a56db,0x7c3aed,0x06b6d4,0x3b82f6][i%4],transparent:true,opacity:0.25}));bk.position.set(bp[0],bp[1],0.09);sg.add(bk);});
  sg.rotation.x=-Math.PI*0.08;lg.add(sg);sc.add(lg);
  var pg=new T.GridHelper(20,30,0x1a56db,0x0e3a8a);pg.position.y=-0.08;pg.material.transparent=true;pg.material.opacity=0.2;sc.add(pg);
  sc.add(new T.AmbientLight(0x0f172a,2));var pl=new T.PointLight(0x3b82f6,5,20);pl.position.set(5,5,5);sc.add(pl);var sl=new T.PointLight(0x3b82f6,2,5);sl.position.set(0,1.5,1);sc.add(sl);
  window.addEventListener('resize',function(){var w=cv.offsetWidth,h=cv.offsetHeight;cam.aspect=w/h;cam.updateProjectionMatrix();r.setSize(w,h);});
  var pc=new T.Clock();
  (function loop(){requestAnimationFrame(loop);var t=pc.getElapsedTime();
    lg.rotation.y=Math.sin(t*0.25)*0.4;lg.position.y=Math.sin(t*0.5)*0.08;
    sg.rotation.x=-Math.PI*(0.06+Math.sin(t*0.2)*0.02);sm.emissiveIntensity=0.35+Math.sin(t*1.2)*0.15;sl.intensity=1.5+Math.sin(t*1.2)*0.8;
    var sec=cv.closest?cv.closest('section'):null;
    if(sec){var rc=sec.getBoundingClientRect();var p=clamp(1-rc.top/window.innerHeight,0,1);cam.position.x=lerp(-3,0,p);cam.position.y=lerp(4,2,p);cam.position.z=lerp(12,7,p);}
    cam.lookAt(0,0.5,0);r.render(sc,cam);})();
}

/* ── 5. DASHBOARD 3D ── */
function initDashboard3D(){
  var cv=document.getElementById('dashboard3DCanvas');if(!cv||!T)return;
  var W=cv.offsetWidth||700,H=cv.offsetHeight||320;
  var r=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true});r.setSize(W,H);r.setPixelRatio(Math.min(devicePixelRatio,2));
  var sc=new T.Scene(),cam=new T.PerspectiveCamera(50,W/H,0.1,100);cam.position.set(0,3.5,9);cam.lookAt(0,0,0);
  var bars=[];[0.45,0.72,0.55,0.88,0.63,0.79,0.38,0.71,0.58,0.84,0.47,0.66].forEach(function(v,i){var h=v*3.5;var b=new T.Mesh(new T.BoxGeometry(0.38,h,0.38),new T.MeshStandardMaterial({color:i%3===0?0x1a56db:i%3===1?0x7c3aed:0x06b6d4,emissive:i%3===0?0x0e3a8a:i%3===1?0x4c1d95:0x0e7490,emissiveIntensity:0.5,metalness:0.7,roughness:0.2}));b.position.set((i-5.5)*0.65,h/2-1.8,0);b.userData={base:h,phase:i*0.28};sc.add(b);bars.push(b);});
  var fl=new T.GridHelper(14,28,0x1a56db,0x0e3a8a);fl.position.y=-1.8;fl.material.transparent=true;fl.material.opacity=0.25;sc.add(fl);
  var dps=[];for(var i=0;i<40;i++){var dp=new T.Mesh(new T.SphereGeometry(0.04,6,6),new T.MeshBasicMaterial({color:0x3b82f6,transparent:true,opacity:0.6}));dp.position.set(rand(-6,6),rand(-1,3),rand(-3,1));dp.userData.vel=new T.Vector3(rand(-0.008,0.008),rand(-0.006,0.006),0);sc.add(dp);dps.push(dp);}
  sc.add(new T.AmbientLight(0x1e293b,2));var dl=new T.PointLight(0x3b82f6,5,20);dl.position.set(0,6,5);sc.add(dl);var dl2=new T.PointLight(0x7c3aed,3,15);dl2.position.set(-6,3,3);sc.add(dl2);
  window.addEventListener('resize',function(){var w=cv.offsetWidth,h=cv.offsetHeight;cam.aspect=w/h;cam.updateProjectionMatrix();r.setSize(w,h);});
  var dc=new T.Clock();
  (function loop(){requestAnimationFrame(loop);var t=dc.getElapsedTime();
    bars.forEach(function(b){var nh=b.userData.base*(0.75+Math.sin(t*0.8+b.userData.phase)*0.25);b.scale.y=nh/b.userData.base;b.position.y=(b.userData.base*b.scale.y)/2-1.8;b.material.emissiveIntensity=0.3+Math.sin(t+b.userData.phase)*0.3;});
    dps.forEach(function(dp){dp.position.add(dp.userData.vel);if(Math.abs(dp.position.x)>6)dp.userData.vel.x*=-1;if(Math.abs(dp.position.y)>3)dp.userData.vel.y*=-1;dp.material.opacity=0.3+Math.abs(Math.sin(t*1.5+dp.position.x))*0.5;});
    cam.position.x=Math.sin(t*0.12)*2;cam.lookAt(0,0,0);r.render(sc,cam);})();
}

/* ── 6. AI ASSISTANT 3D (bubble) ── */
function initAIAssistant3D(){
  var cv=document.getElementById('aiAssistant3DCanvas');if(!cv||!T)return;
  var r=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true});r.setSize(80,80);r.setPixelRatio(Math.min(devicePixelRatio,2));
  var sc=new T.Scene(),cam=new T.PerspectiveCamera(50,1,0.1,20);cam.position.z=2.8;
  var om=new T.MeshStandardMaterial({color:0x1a56db,emissive:0x3b82f6,emissiveIntensity:0.7,metalness:0.9,roughness:0.05});
  var orb=new T.Mesh(new T.SphereGeometry(0.7,32,32),om);sc.add(orb);
  var rr1=new T.Mesh(new T.TorusGeometry(1,0.025,8,60),new T.MeshBasicMaterial({color:0x3b82f6,transparent:true,opacity:0.6}));rr1.rotation.x=Math.PI/3;sc.add(rr1);
  var rr2=new T.Mesh(new T.TorusGeometry(1.15,0.015,8,60),new T.MeshBasicMaterial({color:0x7c3aed,transparent:true,opacity:0.4}));rr2.rotation.x=Math.PI/5;rr2.rotation.z=Math.PI/4;sc.add(rr2);
  sc.add(new T.AmbientLight(0x0f172a,2));var al=new T.PointLight(0x3b82f6,4,8);al.position.set(2,2,2);sc.add(al);
  var ac=new T.Clock();
  (function loop(){requestAnimationFrame(loop);var t=ac.getElapsedTime();orb.scale.setScalar(1+Math.sin(t*2)*0.06);om.emissiveIntensity=0.5+Math.sin(t*2)*0.3;rr1.rotation.z+=0.015;rr2.rotation.y+=0.01;r.render(sc,cam);})();
}

/* ── 7. CARDS 3D HOVER ── */
function initCards3D(){
  if(window.innerWidth<768)return;
  document.querySelectorAll('.service-card,.project-card,.team-card,.cv-item').forEach(function(card){
    card.addEventListener('mousemove',function(e){var rc=card.getBoundingClientRect();var x=(e.clientX-rc.left)/rc.width-0.5,y=(e.clientY-rc.top)/rc.height-0.5;card.style.transition='none';card.style.transform='perspective(700px) rotateX('+(-y*22)+'deg) rotateY('+(x*22)+'deg) translateZ(16px) scale(1.04)';card.style.boxShadow='0 24px 64px rgba(26,86,219,0.45),'+(-x*24)+'px '+(-y*24)+'px 40px rgba(124,58,237,0.25)';card.style.borderColor='rgba(59,130,246,0.6)';var px=(e.clientX-rc.left)/rc.width*100,py=(e.clientY-rc.top)/rc.height*100;card.style.background='radial-gradient(circle at '+px+'% '+py+'%, rgba(26,86,219,0.18) 0%, transparent 60%), var(--dark2,#1e293b)';});
    card.addEventListener('mouseleave',function(){card.style.transition='all 0.55s cubic-bezier(0.23,1,0.32,1)';card.style.transform='';card.style.boxShadow='';card.style.borderColor='';card.style.background='';});
  });
}

/* ── 8. SCROLL CINEMATIC ── */
function initScrollCinematic(){
  var items=document.querySelectorAll('.service-card,.project-card,.team-card,.cv-item,.workflow-step,.testi-card,.cert-item');
  var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('reveal-in');io.unobserve(e.target);}});},{threshold:0.1,rootMargin:'0px 0px -30px 0px'});
  items.forEach(function(el,i){el.classList.add('reveal-init');el.style.transitionDelay=(i%5)*0.07+'s';io.observe(el);});
  window.addEventListener('scroll',function(){var h3=document.getElementById('hero3DCanvas');if(h3)h3.style.opacity=clamp(1-window.scrollY/500,0,1);},{passive:true});
}

/* ── 9. CYBER BG ── */
function initCyberBG(){
  var cv=document.getElementById('heroParticles');if(!cv)return;
  var ctx=cv.getContext('2d'),W,H,pts=[];
  function resize(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight;}resize();window.addEventListener('resize',resize);
  for(var i=0;i<140;i++)pts.push({x:rand(0,1)*W,y:rand(0,1)*H,vx:(rand(0,1)-0.5)*0.45,vy:(rand(0,1)-0.5)*0.45,r:rand(0.4,1.8),a:rand(0.2,0.6),col:rand(0,1)>0.55?'26,86,219':rand(0,1)>0.5?'124,58,237':'6,182,212'});
  var mx=-9999,my=-9999;window.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  (function draw(){requestAnimationFrame(draw);ctx.clearRect(0,0,W,H);
    ctx.strokeStyle='rgba(26,86,219,0.06)';ctx.lineWidth=0.5;for(var gx=0;gx<W;gx+=60){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}for(var gy=0;gy<H;gy+=60){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}
    for(var i=0;i<pts.length;i++){for(var j=i+1;j<pts.length;j++){var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<110){ctx.beginPath();ctx.strokeStyle='rgba(26,86,219,'+(0.18*(1-d/110))+')';ctx.lineWidth=0.6;ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();}}var mdx=pts[i].x-mx,mdy=pts[i].y-my,md=Math.sqrt(mdx*mdx+mdy*mdy);if(md<160){ctx.beginPath();ctx.strokeStyle='rgba(59,130,246,'+(0.35*(1-md/160))+')';ctx.lineWidth=1;ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(mx,my);ctx.stroke();}}
    pts.forEach(function(p){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba('+p.col+','+p.a+')';ctx.fill();});})();
}

/* ── METRICS ── */
function initMetrics(){setInterval(function(){var c=document.getElementById('d3cpu'),q=document.getElementById('d3req'),l=document.getElementById('d3lat');if(c)c.textContent=(72+Math.floor(Math.random()*24))+'%';if(q)q.textContent=(1100+Math.floor(Math.random()*400)).toLocaleString();if(l)l.textContent=(18+Math.floor(Math.random()*15))+'ms';},1800);}

/* ── BOOT ── */
document.addEventListener('DOMContentLoaded',function(){
  initLoading();initCyberBG();initCards3D();initScrollCinematic();initMetrics();
  if(!T)return;
  initHero3D();initAIAssistant3D();
  function lazy(id,fn){var el=document.getElementById(id);if(!el)return;var ob=new IntersectionObserver(function(e){if(e[0].isIntersecting){fn();ob.disconnect();}},{threshold:0.05});ob.observe(el);}
  lazy('globe3DCanvas',initGlobe3D);lazy('portfolio3DCanvas',initPortfolio3D);lazy('dashboard3DCanvas',initDashboard3D);
});

})();
