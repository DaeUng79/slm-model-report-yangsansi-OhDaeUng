import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SectionHeader } from "./PipelineOverview";

const top = [
  { id: "chunk_001", sim: 94 },
  { id: "chunk_004", sim: 91 },
  { id: "chunk_002", sim: 87 },
];

export function VectorSpace() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.04);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // chunk point cloud (sphere distribution)
    const COUNT = 600;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const baseColor = new THREE.Color(0x475569);
    for (let i = 0; i < COUNT; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      colors[i * 3] = baseColor.r;
      colors[i * 3 + 1] = baseColor.g;
      colors[i * 3 + 2] = baseColor.b;
    }
    const cloudGeo = new THREE.BufferGeometry();
    cloudGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    cloudGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const cloudMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const cloud = new THREE.Points(cloudGeo, cloudMat);
    group.add(cloud);

    // Question vector at origin (indigo)
    const qGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const qMat = new THREE.MeshBasicMaterial({ color: 0x6366f1 });
    const qSphere = new THREE.Mesh(qGeo, qMat);
    group.add(qSphere);

    // Glow halo
    const haloGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.2,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    group.add(halo);

    // Search radius wireframe
    const radiusGeo = new THREE.SphereGeometry(3.5, 24, 24);
    const radiusMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const radiusSphere = new THREE.Mesh(radiusGeo, radiusMat);
    group.add(radiusSphere);

    // Top-K nearest results (emerald) with connecting lines
    const topPositions = [
      new THREE.Vector3(2.2, 1.4, 0.8),
      new THREE.Vector3(-1.8, 2.0, 1.2),
      new THREE.Vector3(1.0, -1.6, 2.4),
    ];
    const topMeshes: THREE.Mesh[] = [];
    topPositions.forEach((p) => {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0x34d399 }),
      );
      m.position.copy(p);
      group.add(m);
      topMeshes.push(m);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        p,
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.55,
      });
      group.add(new THREE.Line(lineGeo, lineMat));
    });

    // mouse parallax
    let mx = 0, my = 0, tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      my = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
    };
    mount.addEventListener("mousemove", onMove);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      group.rotation.y += 0.0025;
      group.rotation.x = Math.sin(t * 0.3) * 0.15;

      tx += (mx - tx) * 0.05;
      ty += (my - ty) * 0.05;
      camera.position.x = tx * 4;
      camera.position.y = -ty * 4;
      camera.lookAt(0, 0, 0);

      const pulse = 1 + Math.sin(t * 3) * 0.15;
      halo.scale.setScalar(pulse);
      qSphere.scale.setScalar(1 + Math.sin(t * 3) * 0.08);

      topMeshes.forEach((m, i) => {
        m.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.2);
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mousemove", onMove);
      renderer.dispose();
      cloudGeo.dispose();
      cloudMat.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Vector Space · 3D"
          title="벡터 공간에서의 유사도 검색"
          desc="질문 벡터 주변의 가장 가까운 청크들이 3D 임베딩 공간에서 검색됩니다. 마우스를 움직여 시점을 바꿔보세요."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="glass-strong relative overflow-hidden rounded-3xl">
            <div ref={mountRef} className="h-[420px] w-full sm:h-[480px]" />
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/5 via-transparent to-cyan-400/5" />
            <div className="absolute bottom-4 left-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-500" /> Chunk
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" /> Question
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Top-K
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400" /> Search Radius
              </span>
            </div>
          </div>
          <div className="glass-strong rounded-3xl p-6">
            <div className="text-xs uppercase tracking-wider text-cyan-300">Top-K Results</div>
            <ol className="mt-4 space-y-3">
              {top.map((t, i) => (
                <li key={t.id} className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">
                      #{i + 1} <span className="text-cyan-300">{t.id}</span>
                    </span>
                    <span className="rounded-full gradient-bg px-2 py-0.5 text-xs text-white">
                      {t.sim}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full gradient-bg" style={{ width: `${t.sim}%` }} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
