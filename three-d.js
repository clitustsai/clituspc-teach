/* ── CLITUS PC 3D EFFECTS (Three.js) ── */
(function() {
'use strict';

// ── 1. LOADING SCREEN 3D ──
function initLoadingScreen() {
  var overlay = document.getElementById('loadingScreen');
  if (!overlay) return;
  var canvas = document.getElementById('loadingCanvas');
  if (!canvas || !window.THREE) return;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(200, 200);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 3;

  // Torus knot loading spinner
  var geo = new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16);
  var mat = new THREE.MeshStandardMaterial({
    color: 0x1a56db, emissive: 0x0e3a8a, metalness: 0.8, roughness: 0.2,
    wireframe: false
  });
  var mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  var light1 = new THREE.PointLight(0x3b82f6, 3, 10);
  light1.position.set(2, 2, 2);
  scene.add(light1);
  var light2 = new THREE.PointLight(0x7c3aed, 2, 10);
  light2.position.set(-2, -1, 1);
  scene.add(light2);
  scene.add(new THREE.AmbientLight(0x1e293b, 1));

  var progress = 0;
  var bar = document.getElementById('loadingBar');
  var pct = document.getElementById('loadingPct');

  function animateLoading() {
    if (!overlay.classList.contains('active')) { renderer.dispose(); return; }
    requestAnimationFrame(animateLoading);
    mesh.rotation.x += 0.02;
    mesh.rotation.y += 0.03;
    progress = Math.min(progress + 0.8, 100);
    if (bar) bar.style.width = progress + '%';
    if (pct) pct.textContent = Math.floor(progress) + '%';
    renderer.render(scene, camera);
  }
  animateLoading();

  setTimeout(function() {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.6s ease';
    setTimeout(function() { overlay.classList.remove('active'); overlay.style.display = 'none'; }, 600);
  }, 1800);
}

// ── 2. HERO 3D SCENE (AI Orb + Logo xoay + Hologram) ──
function initHero3D() {
  var canvas = document.getElementById('hero3DCanvas');
  if (!canvas || !window.THREE) return;

  var W = canvas.offsetWidth || window.innerWidth;
  var H = canvas.offsetHeight || window.innerHeight;
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
  camera.position.set(0, 0, 8);

  // ── AI ORB (trung tâm) ──
  var orbGeo = new THREE.SphereGeometry(1.2, 64, 64);
  var orbMat = new THREE.MeshStandardMaterial({
    color: 0x1a56db, emissive: 0x0e3a8a,
    metalness: 0.9, roughness: 0.1,
    transparent: true, opacity: 0.85
  });
  var orb = new THREE.Mesh(orbGeo, orbMat);
  orb.position.set(3.5, 0.5, 0);
  scene.add(orb);

  // Orb glow ring
  var ringGeo = new THREE.TorusGeometry(1.6, 0.04, 16, 100);
  var ringMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.6 });
  var ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.position.copy(orb.position);
  ring1.rotation.x = Math.PI / 3;
  scene.add(ring1);

  var ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(1.9, 0.025, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.4 })
  );
  ring2.position.copy(orb.position);
  ring2.rotation.x = Math.PI / 5;
  ring2.rotation.z = Math.PI / 4;
  scene.add(ring2);

  // ── LOGO 3D (xoay) ──
  var logoGroup = new THREE.Group();
  var logoGeo = new THREE.TorusKnotGeometry(0.6, 0.18, 80, 12);
  var logoMat = new THREE.MeshStandardMaterial({
    color: 0x1a56db, emissive: 0x1a56db, emissiveIntensity: 0.3,
    metalness: 1.0, roughness: 0.05
  });
  var logoMesh = new THREE.Mesh(logoGeo, logoMat);
  logoGroup.add(logoMesh);
  logoGroup.position.set(-3.5, 1, -1);
  scene.add(logoGroup);

  // ── HOLOGRAM GRID ──
  var gridHelper = new THREE.GridHelper(12, 20, 0x1a56db, 0x0e3a8a);
  gridHelper.position.y = -2.5;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.3;
  scene.add(gridHelper);

  // ── FLOATING CUBES (server/data nodes) ──
  var cubes = [];
  var cubePositions = [
    [-2, 2, -2], [2, -1.5, -3], [-1, -2, -1], [4, 1.5, -2],
    [-4, -1, -2], [1, 2.5, -3], [3, -2, -1], [-3, 0.5, -3]
  ];
  cubePositions.forEach(function(pos) {
    var size = 0.15 + Math.random() * 0.2;
    var geo = new THREE.BoxGeometry(size, size, size);
    var mat = new THREE.MeshStandardMaterial({
      color: Math.random() > 0.5 ? 0x1a56db : 0x7c3aed,
      emissive: 0x0e3a8a, emissiveIntensity: 0.5,
      metalness: 0.8, roughness: 0.2,
      transparent: true, opacity: 0.8
    });
    var cube = new THREE.Mesh(geo, mat);
    cube.position.set(pos[0], pos[1], pos[2]);
    cube.userData.speed = { x: (Math.random()-0.5)*0.01, y: (Math.random()-0.5)*0.008, z: 0 };
    cube.userData.floatOffset = Math.random() * Math.PI * 2;
    scene.add(cube);
    cubes.push(cube);
  });

  // ── PARTICLE FIELD (cyber) ──
  var particleCount = 300;
  var positions = new Float32Array(particleCount * 3);
  for (var i = 0; i < particleCount; i++) {
    positions[i*3]   = (Math.random()-0.5) * 20;
    positions[i*3+1] = (Math.random()-0.5) * 12;
    positions[i*3+2] = (Math.random()-0.5) * 10 - 3;
  }
  var pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  var pMat = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.04, transparent: true, opacity: 0.6 });
  var particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // ── LIGHTS ──
  scene.add(new THREE.AmbientLight(0x0f172a, 2));
  var pLight1 = new THREE.PointLight(0x3b82f6, 4, 20);
  pLight1.position.set(5, 5, 5);
  scene.add(pLight1);
  var pLight2 = new THREE.PointLight(0x7c3aed, 3, 15);
  pLight2.position.set(-5, -3, 3);
  scene.add(pLight2);
  var pLight3 = new THREE.PointLight(0x1a56db, 2, 10);
  pLight3.position.set(0, 0, 6);
  scene.add(pLight3);

  // Mouse parallax
  var mouse = { x: 0, y: 0 };
  document.addEventListener('mousemove', function(e) {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Resize
  window.addEventListener('resize', function() {
    var w = canvas.offsetWidth, h = canvas.offsetHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  var clock = new THREE.Clock();
  function animateHero() {
    requestAnimationFrame(animateHero);
    var t = clock.getElapsedTime();

    // Orb pulse
    orb.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05);
    ring1.rotation.z += 0.008;
    ring2.rotation.y += 0.006;
    ring2.rotation.x += 0.004;

    // Logo xoay
    logoGroup.rotation.x += 0.01;
    logoGroup.rotation.y += 0.015;
    logoGroup.position.y = 1 + Math.sin(t * 0.8) * 0.3;

    // Floating cubes
    cubes.forEach(function(c) {
      c.rotation.x += c.userData.speed.x;
      c.rotation.y += c.userData.speed.y;
      c.position.y += Math.sin(t + c.userData.floatOffset) * 0.003;
    });

    // Particles drift
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0002;

    // Grid pulse
    gridHelper.material.opacity = 0.2 + Math.sin(t * 0.5) * 0.1;

    // Camera parallax
    camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animateHero();
}

// ── 3. GLOBE 3D (Network Technology) ──
function initGlobe3D() {
  var canvas = document.getElementById('globe3DCanvas');
  if (!canvas || !window.THREE) return;

  var W = canvas.offsetWidth || 500;
  var H = canvas.offsetHeight || 500;
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
  camera.position.z = 3.5;

  // Globe sphere
  var globeGeo = new THREE.SphereGeometry(1, 64, 64);
  var globeMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a, emissive: 0x0e3a8a, emissiveIntensity: 0.15,
    metalness: 0.3, roughness: 0.7,
    transparent: true, opacity: 0.9,
    wireframe: false
  });
  var globe = new THREE.Mesh(globeGeo, globeMat);
  scene.add(globe);

  // Wireframe overlay
  var wireGeo = new THREE.SphereGeometry(1.01, 24, 24);
  var wireMat = new THREE.MeshBasicMaterial({
    color: 0x1a56db, wireframe: true, transparent: true, opacity: 0.15
  });
  scene.add(new THREE.Mesh(wireGeo, wireMat));

  // Network nodes on globe surface
  var nodePositions = [
    [0.3, 0.8, 0.5], [-0.6, 0.5, 0.6], [0.7, -0.3, 0.6],
    [-0.4, -0.7, 0.6], [0.9, 0.2, 0.4], [-0.8, 0.3, -0.5],
    [0.2, -0.9, 0.4], [0.5, 0.6, -0.6], [-0.3, 0.4, -0.9],
    [0.8, -0.5, -0.3], [-0.7, -0.4, -0.6], [0.1, 0.95, -0.3]
  ];
  var nodes = [];
  var nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
  nodePositions.forEach(function(p) {
    var v = new THREE.Vector3(p[0], p[1], p[2]).normalize();
    var mat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
    var node = new THREE.Mesh(nodeGeo, mat);
    node.position.copy(v);
    scene.add(node);
    nodes.push(node);

    // Pulse ring around node
    var pulseGeo = new THREE.RingGeometry(0.05, 0.08, 16);
    var pulseMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
    var pulse = new THREE.Mesh(pulseGeo, pulseMat);
    pulse.position.copy(v.clone().multiplyScalar(1.02));
    pulse.lookAt(v.clone().multiplyScalar(2));
    pulse.userData.phase = Math.random() * Math.PI * 2;
    scene.add(pulse);
    nodes.push(pulse);
  });

  // Connection lines between nodes
  var lineMat = new THREE.LineBasicMaterial({ color: 0x1a56db, transparent: true, opacity: 0.3 });
  var connections = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,0],[0,6],[2,8],[4,10]];
  connections.forEach(function(pair) {
    var p1 = new THREE.Vector3(nodePositions[pair[0]][0], nodePositions[pair[0]][1], nodePositions[pair[0]][2]).normalize();
    var p2 = new THREE.Vector3(nodePositions[pair[1]][0], nodePositions[pair[1]][1], nodePositions[pair[1]][2]).normalize();
    var points = [];
    for (var i = 0; i <= 20; i++) {
      var t = i / 20;
      var pt = new THREE.Vector3().lerpVectors(p1, p2, t);
      pt.normalize().multiplyScalar(1.02 + Math.sin(Math.PI * t) * 0.15);
      points.push(pt);
    }
    var lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    scene.add(new THREE.Line(lineGeo, lineMat));
  });

  // Atmosphere glow
  var atmGeo = new THREE.SphereGeometry(1.15, 32, 32);
  var atmMat = new THREE.MeshBasicMaterial({
    color: 0x1a56db, transparent: true, opacity: 0.06, side: THREE.BackSide
  });
  scene.add(new THREE.Mesh(atmGeo, atmMat));

  scene.add(new THREE.AmbientLight(0x1e293b, 2));
  var gLight = new THREE.PointLight(0x3b82f6, 3, 10);
  gLight.position.set(3, 3, 3);
  scene.add(gLight);

  // Drag to rotate
  var isDragging = false, prevX = 0, prevY = 0, rotX = 0, rotY = 0;
  canvas.addEventListener('mousedown', function(e) { isDragging = true; prevX = e.clientX; prevY = e.clientY; });
  window.addEventListener('mouseup', function() { isDragging = false; });
  window.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    rotY += (e.clientX - prevX) * 0.005;
    rotX += (e.clientY - prevY) * 0.005;
    prevX = e.clientX; prevY = e.clientY;
  });
  canvas.addEventListener('touchstart', function(e) { isDragging = true; prevX = e.touches[0].clientX; prevY = e.touches[0].clientY; });
  canvas.addEventListener('touchend', function() { isDragging = false; });
  canvas.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    rotY += (e.touches[0].clientX - prevX) * 0.005;
    rotX += (e.touches[0].clientY - prevY) * 0.005;
    prevX = e.touches[0].clientX; prevY = e.touches[0].clientY;
  });

  window.addEventListener('resize', function() {
    var w = canvas.offsetWidth, h = canvas.offsetHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  var clock2 = new THREE.Clock();
  function animateGlobe() {
    requestAnimationFrame(animateGlobe);
    var t = clock2.getElapsedTime();
    if (!isDragging) { rotY += 0.003; }
    globe.rotation.y = rotY;
    globe.rotation.x = rotX;
    scene.children.forEach(function(obj) {
      if (obj !== globe && obj.userData && obj.userData.phase !== undefined) {
        obj.material.opacity = 0.3 + Math.sin(t * 2 + obj.userData.phase) * 0.3;
        var s = 1 + Math.sin(t * 2 + obj.userData.phase) * 0.5;
        obj.scale.setScalar(s);
      }
    });
    renderer.render(scene, camera);
  }
  animateGlobe();
}

// ── 4. AI DASHBOARD 3D (Realtime) ──
function initDashboard3D() {
  var canvas = document.getElementById('dashboard3DCanvas');
  if (!canvas || !window.THREE) return;

  var W = canvas.offsetWidth || 600;
  var H = canvas.offsetHeight || 300;
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
  camera.position.set(0, 3, 8);
  camera.lookAt(0, 0, 0);

  // Bar chart 3D
  var barData = [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.3, 0.75, 0.55, 0.85];
  var bars = [];
  barData.forEach(function(val, i) {
    var h = val * 3;
    var geo = new THREE.BoxGeometry(0.4, h, 0.4);
    var mat = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? 0x1a56db : 0x7c3aed,
      emissive: i % 2 === 0 ? 0x0e3a8a : 0x4c1d95,
      emissiveIntensity: 0.4, metalness: 0.7, roughness: 0.2
    });
    var bar = new THREE.Mesh(geo, mat);
    bar.position.set((i - 4.5) * 0.7, h / 2 - 1.5, 0);
    bar.userData.targetH = h;
    bar.userData.phase = i * 0.3;
    scene.add(bar);
    bars.push(bar);
  });

  // Floor grid
  var floor = new THREE.GridHelper(10, 20, 0x1a56db, 0x0e3a8a);
  floor.position.y = -1.5;
  floor.material.transparent = true;
  floor.material.opacity = 0.3;
  scene.add(floor);

  // Floating data points
  var dataPoints = [];
  for (var i = 0; i < 30; i++) {
    var dpGeo = new THREE.SphereGeometry(0.05, 6, 6);
    var dpMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.7 });
    var dp = new THREE.Mesh(dpGeo, dpMat);
    dp.position.set((Math.random()-0.5)*8, (Math.random()-0.5)*4, (Math.random()-0.5)*3 - 1);
    dp.userData.vel = new THREE.Vector3((Math.random()-0.5)*0.01, (Math.random()-0.5)*0.01, 0);
    scene.add(dp);
    dataPoints.push(dp);
  }

  scene.add(new THREE.AmbientLight(0x1e293b, 2));
  var dLight = new THREE.PointLight(0x3b82f6, 4, 20);
  dLight.position.set(0, 5, 5);
  scene.add(dLight);
  var dLight2 = new THREE.PointLight(0x7c3aed, 3, 15);
  dLight2.position.set(-5, 2, 2);
  scene.add(dLight2);

  window.addEventListener('resize', function() {
    var w = canvas.offsetWidth, h = canvas.offsetHeight;
    camera.aspect = w / h; camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  var clock3 = new THREE.Clock();
  function animateDashboard() {
    requestAnimationFrame(animateDashboard);
    var t = clock3.getElapsedTime();

    // Animate bars (realtime data simulation)
    bars.forEach(function(bar, i) {
      var newH = bar.userData.targetH * (0.8 + Math.sin(t * 0.7 + bar.userData.phase) * 0.2);
      bar.scale.y = newH / bar.userData.targetH;
      bar.position.y = (newH * bar.scale.y) / 2 - 1.5;
      bar.material.emissiveIntensity = 0.3 + Math.sin(t + i) * 0.2;
    });

    // Data points float
    dataPoints.forEach(function(dp) {
      dp.position.add(dp.userData.vel);
      if (Math.abs(dp.position.x) > 4) dp.userData.vel.x *= -1;
      if (Math.abs(dp.position.y) > 2) dp.userData.vel.y *= -1;
      dp.material.opacity = 0.4 + Math.sin(t * 2 + dp.position.x) * 0.3;
    });

    camera.position.x = Math.sin(t * 0.1) * 1.5;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  animateDashboard();
}

// ── 5. SERVICE CARDS 3D HOVER ──
function initServiceCards3D() {
  document.querySelectorAll('.service-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(600px) rotateY(' + (x * 18) + 'deg) rotateX(' + (-y * 18) + 'deg) translateZ(12px) scale(1.03)';
      card.style.boxShadow = '0 20px 60px rgba(26,86,219,0.4), ' + (-x*20) + 'px ' + (-y*20) + 'px 30px rgba(124,58,237,0.2)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    });
    card.addEventListener('mouseenter', function() {
      card.style.transition = 'none';
    });
  });

  // Project cards too
  document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(700px) rotateY(' + (x * 14) + 'deg) rotateX(' + (-y * 14) + 'deg) translateZ(10px)';
      card.style.boxShadow = '0 16px 48px rgba(26,86,219,0.35)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    });
    card.addEventListener('mouseenter', function() { card.style.transition = 'none'; });
  });
}

// ── 6. SCROLL ANIMATION 3D (Apple-style) ──
function initScrollAnimation3D() {
  var elements = document.querySelectorAll('.service-card, .project-card, .team-card, .cv-item, .workflow-step, .testi-card');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-3d-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(function(el, i) {
    el.classList.add('scroll-3d-init');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    observer.observe(el);
  });

  // Parallax on scroll for hero
  window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    var hero3D = document.getElementById('hero3DCanvas');
    if (hero3D) {
      hero3D.style.transform = 'translateY(' + scrollY * 0.3 + 'px)';
      hero3D.style.opacity = Math.max(0, 1 - scrollY / 600);
    }
    // Section reveal with depth
    document.querySelectorAll('.section').forEach(function(sec) {
      var rect = sec.getBoundingClientRect();
      var progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      sec.style.setProperty('--scroll-progress', progress);
    });
  }, { passive: true });
}

// ── 7. CYBER BACKGROUND PARTICLES (Canvas 2D enhanced) ──
function initCyberParticles() {
  var canvas = document.getElementById('heroParticles');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Create particles
  for (var i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random()-0.5) * 0.4, vy: (Math.random()-0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.6 ? '124,58,237' : '26,86,219'
    });
  }

  var mouse = { x: -9999, y: -9999 };
  window.addEventListener('mousemove', function(e) { mouse.x = e.clientX; mouse.y = e.clientY; });

  function drawCyber() {
    requestAnimationFrame(drawCyber);
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(26,86,219,' + (0.15 * (1 - dist/120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
      // Mouse interaction
      var mdx = particles[i].x - mouse.x;
      var mdy = particles[i].y - mouse.y;
      var mdist = Math.sqrt(mdx*mdx + mdy*mdy);
      if (mdist < 150) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(59,130,246,' + (0.3 * (1 - mdist/150)) + ')';
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    // Draw particles
    particles.forEach(function(p) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color + ',' + p.alpha + ')';
      ctx.fill();
    });
  }
  drawCyber();
}

// ── INIT ALL ──
document.addEventListener('DOMContentLoaded', function() {
  initLoadingScreen();
  initCyberParticles();
  initServiceCards3D();
  initScrollAnimation3D();

  // Lazy init 3D scenes when visible
  function lazyInit3D(id, fn) {
    var el = document.getElementById(id);
    if (!el) return;
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { fn(); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
  }

  if (window.THREE) {
    initHero3D();
    lazyInit3D('globe3DCanvas', initGlobe3D);
    lazyInit3D('dashboard3DCanvas', initDashboard3D);
  }
});

})();

// ── REALTIME DASHBOARD METRICS ──
(function() {
  function randomBetween(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function updateMetrics() {
    var cpu = document.getElementById('d3cpu');
    var req = document.getElementById('d3req');
    if (cpu) cpu.textContent = randomBetween(72, 96) + '%';
    if (req) req.textContent = (randomBetween(1100, 1500)).toLocaleString();
  }
  setInterval(updateMetrics, 1800);
})();
