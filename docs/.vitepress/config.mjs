import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'JyLearn',
  description: 'Learn game engine architecture through jygame',
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/0-welcome/', activeMatch: '/[0-9]' },
      { text: 'Reference', link: '/reference/', activeMatch: '/reference/' },
      {
        text: 'Resources',
        items: [
          { text: 'jygame Repository', link: 'https://github.com/Bouzidi-Youssef/Jygame' },
          { text: 'jygame Documentation', link: 'https://jygame-documentation.vercel.app/' },
        ],
      },
    ],

    sidebar: {
      '/0-welcome/': welcomeSidebar(),
      '/1-foundations/': foundationsSidebar(),
      '/2-memory/': memorySidebar(),
      '/3-particles/': particlesSidebar(),
      '/4-modifiers/': modifiersSidebar(),
      '/5-shapes/': shapesSidebar(),
      '/6-storage/': storageSidebar(),
      '/7-cpu-simulation/': cpuSidebar(),
      '/8-gpu-simulation/': gpuSidebar(),
      '/9-webgpu/': webgpuSidebar(),
      '/10-wasm-simd/': wasmSidebar(),
      '/11-rendering/': renderingSidebar(),
      '/12-walkthrough/': walkthroughSidebar(),
      '/reference/': referenceSidebar(),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Bouzidi-Youssef/Jygame' },
    ],

    footer: {
      message: 'Released under the GPL-3.0 License.',
      copyright: 'Copyright © Bouzidi Youssef',
    },

    editLink: {
      pattern: 'https://github.com/Bouzidi-Youssef/learning-platform/edit/main/docs/:path',
    },

    search: {
      provider: 'local',
    },
  },

  vite: {
    resolve: {
      alias: {
        '@components': '/docs/.vitepress/components',
      },
    },
  },

  mermaid: {
    theme: 'dark',
  },
}))

function welcomeSidebar() {
  return [
    {
      text: 'Part 0 — Welcome',
      items: [
        { text: 'What is a Particle System?', link: '/0-welcome/foreword' },
        { text: 'What is jygame?', link: '/0-welcome/what-is-jygame' },
        { text: 'The Architecture Philosophy', link: '/0-welcome/philosophy' },
      ],
    },
  ]
}

function foundationsSidebar() {
  return [
    {
      text: 'Part 1 — Foundations',
      items: [
        { text: '1.1 What is a Game Engine?', link: '/1-foundations/01-what-is-a-game-engine' },
        { text: '1.2 The Game Loop', link: '/1-foundations/02-game-loop' },
        { text: '1.3 Fixed vs Variable Timestep', link: '/1-foundations/03-timestep' },
        { text: '1.4 Entities, Components, Systems', link: '/1-foundations/04-ecs' },
        { text: '1.5 Why Architecture Matters', link: '/1-foundations/05-why-architecture-matters' },
        { text: '1.6 jygame\'s Architecture at a Glance', link: '/1-foundations/06-jygame-architecture-at-a-glance' },
      ],
    },
  ]
}

function memorySidebar() {
  return [
    {
      text: 'Part 2 — Memory Management',
      items: [
        { text: '2.1 Understanding Memory', link: '/2-memory/01-understanding-memory' },
        { text: '2.2 The Problem with Allocation', link: '/2-memory/02-allocation-problem' },
        { text: '2.3 Object Pooling', link: '/2-memory/03-object-pooling' },
        { text: '2.4 Active Pools', link: '/2-memory/05-active-pools' },
        { text: '2.5 Pooling in Practice', link: '/2-memory/07-pooling-in-practice' },
      ],
    },
  ]
}

function particlesSidebar() {
  return [
    {
      text: 'Part 3 — Particles',
      items: [
        { text: '3.1 What is a Particle?', link: '/3-particles/01-what-is-a-particle' },
        { text: '3.2 What is a Particle System?', link: '/3-particles/02-particle-system' },
        { text: '3.3 Particle Lifecycle', link: '/3-particles/03-lifecycle' },
        { text: '3.4 Naive Particle Systems', link: '/3-particles/04-naive' },
        { text: '3.5 Emitters', link: '/3-particles/05-emitters' },
        { text: '3.6 Effects and Assets', link: '/3-particles/06-effects-assets' },
        { text: '3.7 Death Sweep and Compaction', link: '/3-particles/07-death-sweep' },
        { text: '3.8 Sorting Particles', link: '/3-particles/08-sorting' },
      ],
    },
  ]
}

function modifiersSidebar() {
  return [
    {
      text: 'Part 4 — Modifiers',
      items: [
        { text: '4.1 Why Modifiers?', link: '/4-modifiers/01-why-modifiers' },
        { text: '4.2 The Modifier Contract', link: '/4-modifiers/02-modifier-contract' },
        { text: '4.3 The Modifier Stack', link: '/4-modifiers/03-modifier-stack' },
        { text: '4.4 Force Modifiers', link: '/4-modifiers/04-force-modifiers' },
        { text: '4.5 Visual Modifiers', link: '/4-modifiers/05-visual-modifiers' },
        { text: '4.6 Spawn Modifiers', link: '/4-modifiers/06-spawn-modifiers' },
        { text: '4.7 Collision Modifier', link: '/4-modifiers/07-collision-modifier' },
        { text: '4.8 GPU Compatibility', link: '/4-modifiers/08-gpu-compatibility' },
        { text: '4.9 Custom Modifiers', link: '/4-modifiers/09-custom-modifiers' },
      ],
    },
  ]
}

function shapesSidebar() {
  return [
    {
      text: 'Part 5 — Shapes',
      items: [
        { text: '5.1 What is an Emitter Shape?', link: '/5-shapes/01-what-is-a-shape' },
        { text: '5.2 Shape Mathematics', link: '/5-shapes/02-shape-mathematics' },
        { text: '5.3 Circle, Rectangle, Cone, Ring', link: '/5-shapes/03-basic-shapes' },
        { text: '5.4 Polygon Shapes', link: '/5-shapes/04-polygon' },
        { text: '5.5 Path Shapes', link: '/5-shapes/05-path' },
        { text: '5.6 Spline Shapes', link: '/5-shapes/06-spline' },
        { text: '5.7 Direction Vectors', link: '/5-shapes/07-direction-vectors' },
        { text: '5.8 Shape Registry', link: '/5-shapes/08-shape-registry' },
        { text: '5.9 Custom Shapes', link: '/5-shapes/09-custom-shapes' },
      ],
    },
  ]
}

function storageSidebar() {
  return [
    {
      text: 'Part 6 — Storage Architectures',
      items: [
        { text: '6.1 Data Layout Matters', link: '/6-storage/01-data-layout-matters' },
        { text: '6.2 Array of Structures', link: '/6-storage/02-aos' },
        { text: '6.3 Structure of Arrays', link: '/6-storage/03-soa' },
        { text: '6.4 Cache Locality in Practice', link: '/6-storage/04-cache-locality' },
        { text: '6.5 Data-Oriented Design', link: '/6-storage/05-dod' },
        { text: '6.6 jygame\'s SoA Implementation', link: '/6-storage/06-jygame-soa' },
        { text: '6.7 Accessors', link: '/6-storage/07-accessors' },
        { text: '6.8 Storage Enables GPU Compute', link: '/6-storage/08-storage-enables-gpu' },
      ],
    },
  ]
}

function cpuSidebar() {
  return [
    {
      text: 'Part 7 — CPU Simulation',
      items: [
        { text: '7.1 The Simulation Loop', link: '/7-cpu-simulation/01-simulation-loop' },
        { text: '7.2 Backend Architecture', link: '/7-cpu-simulation/02-backend-architecture' },
        { text: '7.3 Modifier Lifecycle Management', link: '/7-cpu-simulation/03-modifier-lifecycle' },
        { text: '7.4 Integration Step', link: '/7-cpu-simulation/04-integration' },
        { text: '7.5 Command Buffer', link: '/7-cpu-simulation/05-command-buffer' },
        { text: '7.6 Render Delegation', link: '/7-cpu-simulation/06-render-delegation' },
        { text: '7.7 Performance Characteristics', link: '/7-cpu-simulation/07-performance' },
      ],
    },
  ]
}

function gpuSidebar() {
  return [
    {
      text: 'Part 8 — GPU Simulation',
      items: [
        { text: '8.1 Why GPU Simulation?', link: '/8-gpu-simulation/01-why-gpu' },
        { text: '8.2 Operator Mode', link: '/8-gpu-simulation/02-operator-mode' },
        { text: '8.3 Compute Mode', link: '/8-gpu-simulation/03-compute-mode' },
        { text: '8.4 Backend Architecture', link: '/8-gpu-simulation/04-backend-architecture' },
        { text: '8.5 Buffer Management', link: '/8-gpu-simulation/05-buffer-management' },
        { text: '8.6 Upload Optimization', link: '/8-gpu-simulation/06-upload-optimization' },
        { text: '8.7 WASM Death Sweep', link: '/8-gpu-simulation/07-wasm-death-sweep' },
        { text: '8.8 Performance Comparison', link: '/8-gpu-simulation/08-performance-comparison' },
      ],
    },
  ]
}

function webgpuSidebar() {
  return [
    {
      text: 'Part 9 — WebGPU',
      items: [
        { text: '9.1 What is WebGPU?', link: '/9-webgpu/01-what-is-webgpu' },
        { text: '9.2 WGSL — The Shader Language', link: '/9-webgpu/02-wgsl' },
        { text: '9.3 Compute Shaders', link: '/9-webgpu/03-compute-shaders' },
        { text: '9.4 jygame\'s WGSL Generation', link: '/9-webgpu/04-wgsl-generation' },
        { text: '9.5 Pipeline Management', link: '/9-webgpu/05-pipeline-management' },
        { text: '9.6 The Dispatch Loop', link: '/9-webgpu/06-dispatch-loop' },
        { text: '9.7 WebGPU Rendering', link: '/9-webgpu/07-webgpu-rendering' },
        { text: '9.8 WebGPU vs WebGL2', link: '/9-webgpu/08-webgpu-vs-webgl2' },
      ],
    },
  ]
}

function wasmSidebar() {
  return [
    {
      text: 'Part 10 — WASM & SIMD',
      items: [
        { text: '10.1 What is WebAssembly?', link: '/10-wasm-simd/01-what-is-wasm' },
        { text: '10.2 Why WASM', link: '/10-wasm-simd/02-why-wasm' },
        { text: '10.3 SIMD — Single Instruction Multiple Data', link: '/10-wasm-simd/03-simd' },
        { text: '10.4 SIMD in Death Sweep', link: '/10-wasm-simd/04-simd-death-sweep' },
        { text: '10.5 From C to WASM', link: '/10-wasm-simd/05-c-to-wasm' },
        { text: '10.6 JS ↔ WASM Bridge', link: '/10-wasm-simd/06-js-wasm-bridge' },
        { text: '10.7 SIMD128 Walkthrough', link: '/10-wasm-simd/07-simd128-walkthrough' },
        { text: '10.8 Performance Analysis', link: '/10-wasm-simd/08-performance-analysis' },
      ],
    },
  ]
}

function renderingSidebar() {
  return [
    {
      text: 'Part 11 — Rendering',
      items: [
        { text: '11.1 The Rendering Pipeline', link: '/11-rendering/01-rendering-pipeline' },
        { text: '11.2 Canvas2D Rendering', link: '/11-rendering/02-canvas2d' },
        { text: '11.3 WebGL2 Instanced Rendering', link: '/11-rendering/03-webgl2-instanced' },
        { text: '11.4 WebGPU Rendering', link: '/11-rendering/04-webgpu-rendering' },
        { text: '11.5 Abstract Renderer Interface', link: '/11-rendering/05-abstract-interface' },
        { text: '11.6 Render Pipeline Comparison', link: '/11-rendering/06-pipeline-comparison' },
        { text: '11.7 Choosing a Renderer', link: '/11-rendering/07-choosing' },
      ],
    },
  ]
}

function walkthroughSidebar() {
  return [
    {
      text: 'Part 12 — Full System Walkthrough',
      items: [
        { text: '12.1 From Asset to Particle', link: '/12-walkthrough/01-asset-to-particle' },
        { text: '12.2 CPU Path End-to-End', link: '/12-walkthrough/02-cpu-path' },
        { text: '12.3 GPU Compute Path End-to-End', link: '/12-walkthrough/03-gpu-path' },
        { text: '12.4 The Layer System', link: '/12-walkthrough/04-layer-system' },
        { text: '12.5 Integration in jygame', link: '/12-walkthrough/05-integration' },
        { text: '12.6 Case Study: Fire Effect', link: '/12-walkthrough/06-fire-effect' },
        { text: '12.7 Case Study: Explosion', link: '/12-walkthrough/07-explosion' },
        { text: '12.8 Case Study: Rain System', link: '/12-walkthrough/08-rain-system' },
        { text: '12.9 Case Study: Trail Effect', link: '/12-walkthrough/09-trail-effect' },
        { text: '12.10 Performance Tuning Guide', link: '/12-walkthrough/10-performance-tuning' },
      ],
    },
  ]
}

function referenceSidebar() {
  return [
    {
      text: 'Reference',
      items: [
        { text: 'Overview', link: '/reference/' },
        { text: 'Modifier Reference', link: '/reference/modifiers' },
        { text: 'Shape Reference', link: '/reference/shapes' },
        { text: 'Storage Reference', link: '/reference/storage' },
        { text: 'Renderer Reference', link: '/reference/renderers' },
        { text: 'Glossary', link: '/reference/glossary' },
      ],
    },
  ]
}
