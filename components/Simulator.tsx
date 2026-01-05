
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export const Simulator: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [orbitRadius, setOrbitRadius] = useState(150);
  const [rotationSpeed, setRotationSpeed] = useState(1);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    svg.selectAll("*").remove();

    const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);

    // Draw Earth
    g.append('circle')
      .attr('r', 60)
      .attr('fill', '#1e40af')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2);
    
    // Add Earth Details
    g.append('path')
      .attr('d', d3.arc()({innerRadius: 0, outerRadius: 60, startAngle: 0, endAngle: Math.PI}))
      .attr('fill', '#3b82f6')
      .attr('opacity', 0.2);

    // Draw Orbit Path
    const orbit = g.append('circle')
      .attr('r', orbitRadius)
      .attr('fill', 'none')
      .attr('stroke', '#475569')
      .attr('stroke-dasharray', '5,5')
      .attr('stroke-width', 1);

    // Draw Satellite
    const satelliteGroup = g.append('g');
    
    satelliteGroup.append('rect')
      .attr('width', 20)
      .attr('height', 10)
      .attr('x', -10)
      .attr('y', -5)
      .attr('fill', '#f59e0b')
      .attr('rx', 2);

    satelliteGroup.append('rect')
      .attr('width', 30)
      .attr('height', 4)
      .attr('x', -15)
      .attr('y', -12)
      .attr('fill', '#6366f1')
      .attr('rx', 1);

    satelliteGroup.append('rect')
      .attr('width', 30)
      .attr('height', 4)
      .attr('x', -15)
      .attr('y', 8)
      .attr('fill', '#6366f1')
      .attr('rx', 1);

    // Animation logic
    let angle = 0;
    const animate = () => {
      angle += 0.02 * rotationSpeed;
      const x = Math.cos(angle) * orbitRadius;
      const y = Math.sin(angle) * orbitRadius;
      
      satelliteGroup.attr('transform', `translate(${x}, ${y}) rotate(${(angle * 180 / Math.PI) + 90})`);
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [orbitRadius, rotationSpeed]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Simulador de Órbita</h2>
        <p className="text-slate-400">Ajuste os parâmetros para ver como o satélite se comporta.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative">
          <div className="absolute top-4 left-4 bg-slate-900/80 px-3 py-1 rounded-full text-[10px] font-mono text-indigo-400 border border-indigo-500/30">
            VIEW: TOP-DOWN ORBITAL PLANE
          </div>
          <svg ref={svgRef}></svg>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
            <h3 className="font-semibold mb-6 text-sm flex items-center gap-2">
              <span className="text-indigo-400">⚙️</span> Controles do Satélite
            </h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs text-slate-400">Altitude da Órbita</label>
                  <span className="text-xs font-mono text-indigo-400">{orbitRadius} km</span>
                </div>
                <input 
                  type="range" 
                  min="80" 
                  max="190" 
                  value={orbitRadius}
                  onChange={(e) => setOrbitRadius(Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs text-slate-400">Velocidade Angular</label>
                  <span className="text-xs font-mono text-indigo-400">{rotationSpeed}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="5" 
                  step="0.1"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(Number(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/5">
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              "Quanto maior a altitude, maior o período orbital. Satélites em órbita GEO parecem fixos no céu pois sua rotação coincide com a da Terra."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
