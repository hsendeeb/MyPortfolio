'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { resolvedTheme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    points: THREE.Points;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const SEPARATION = 120;
    const AMOUNTX = 28;
    const AMOUNTY = 42;
    const isDark = resolvedTheme === 'dark';

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(isDark ? 0x0a0a0a : 0xfafafa, 1200, 5000);

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(0, 340, 1080);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(scene.fog.color, 0);

    container.appendChild(renderer.domElement);

    const positions: number[] = [];
    const colors: number[] = [];
    const geometry = new THREE.BufferGeometry();

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        const y = 0;
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        positions.push(x, y, z);

        if (isDark) {
          colors.push(0.78, 0.78, 0.78);
        } else {
          colors.push(0.1, 0.1, 0.1);
        }
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 6,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const positionAttribute = geometry.attributes.position;
      const pointPositions = positionAttribute.array as Float32Array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3;

          pointPositions[index + 1] =
            Math.sin((ix + count) * 0.28) * 30 +
            Math.sin((iy + count) * 0.45) * 30;

          i++;
        }
      }

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.06;
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const nextWidth = containerRef.current.clientWidth || window.innerWidth;
      const nextHeight = containerRef.current.clientHeight || window.innerHeight;

      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    animate();

    sceneRef.current = {
      scene,
      camera,
      renderer,
      points,
      animationId,
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.points.geometry.dispose();
        if (Array.isArray(sceneRef.current.points.material)) {
          sceneRef.current.points.material.forEach((item: THREE.Material) => item.dispose());
        } else {
          sceneRef.current.points.material.dispose();
        }
        sceneRef.current.renderer.dispose();

        if (container.contains(sceneRef.current.renderer.domElement)) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
      {...props}
    />
  );
}
