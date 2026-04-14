/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  MousePointer2, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  BarChart3,
  LayoutDashboard,
  Target,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data from the report
const SUMMARY_DATA = {
  spend: 332.58,
  impressions: 13403,
  reach: 11573,
  clicks: 413,
  linkClicks: 234,
  lpv: 100,
  conversions: 0,
};

const CAMPAIGN_DATA = [
  { name: 'Engajamento/Aquecendo/Frio aberto/ ABO 03.04', spend: 13.09, impressions: 5120, linkClicks: 0, lpv: 0, ctr: 0, cpc: 0, cpa: 0 },
  { name: 'Traf/Seguidores/Frio aberto/ ABO 06.04', spend: 32.68, impressions: 5343, linkClicks: 101, lpv: 1, ctr: 0.0189, cpc: 0.32, cpa: 32.68 },
  { name: 'Vendas/Cbo teste/2 Conj - 06.04', spend: 286.81, impressions: 2940, linkClicks: 133, lpv: 99, ctr: 0.0452, cpc: 2.15, cpa: 2.89 },
];

const AD_DATA = [
  { name: '01 - Animação Reels (Aberto Br)', spend: 145.62, impressions: 1506, linkClicks: 52, lpv: 38, cpa: 3.83 },
  { name: '02 - dani (Segmentado/Br)', spend: 65.04, impressions: 352, linkClicks: 14, lpv: 10, cpa: 6.50 },
  { name: '10 - Reels/Dani (Aberto Br)', spend: 4.37, impressions: 99, linkClicks: 18, lpv: 13, cpa: 0.33 },
  { name: '03 - Animação (Segmentado/Br)', spend: 20.16, impressions: 307, linkClicks: 15, lpv: 13, cpa: 1.55 },
];

const FUNNEL_DATA = [
  { name: 'Impressões', value: SUMMARY_DATA.impressions, color: '#141414' },
  { name: 'Cliques', value: SUMMARY_DATA.linkClicks, color: '#333333' },
  { name: 'Visitas (LPV)', value: SUMMARY_DATA.lpv, color: '#FF6321' },
  { name: 'Conversões', value: SUMMARY_DATA.conversions, color: '#FF8A5C' },
];

const MetricCard = ({ title, value, icon: Icon, subValue, trend }: { title: string, value: string, icon: any, subValue?: string, trend?: string }) => (
  <div className="bg-white border border-pine-ink/10 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-pine-bg rounded-lg">
        <Icon className="w-5 h-5 text-pine-ink" />
      </div>
      {trend && (
        <span className={cn("text-xs font-medium px-2 py-1 rounded-full", trend.startsWith('+') ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-sm font-medium text-pine-ink/60 uppercase tracking-wider mb-1">{title}</h3>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold font-mono">{value}</span>
      {subValue && <span className="text-xs text-pine-ink/40 font-mono">{subValue}</span>}
    </div>
  </div>
);

const SectionTitle = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-2 mb-6">
    <Icon className="w-5 h-5 text-pine-accent" />
    <h2 className="text-xl font-bold uppercase tracking-tight">{title}</h2>
  </div>
);

export default function App() {
  const retentionRate = useMemo(() => ((SUMMARY_DATA.lpv / SUMMARY_DATA.linkClicks) * 100).toFixed(1), []);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="border-b border-pine-ink/10 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pine-ink rounded-lg flex items-center justify-center">
              <Zap className="text-pine-accent w-6 h-6 fill-pine-accent" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none">PINEPOW</h1>
              <p className="text-xs text-pine-ink/40 font-mono mt-1">ADS PERFORMANCE • MÊS 01</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-mono text-pine-ink/40">STATUS</span>
              <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> ATENÇÃO REQUERIDA
              </span>
            </div>
            <div className="h-10 w-10 rounded-full bg-pine-bg border border-pine-ink/10 flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard 
            title="Investimento Total" 
            value={`R$ ${SUMMARY_DATA.spend.toFixed(2)}`} 
            icon={TrendingUp} 
          />
          <MetricCard 
            title="Impressões" 
            value={SUMMARY_DATA.impressions.toLocaleString()} 
            icon={Users} 
            subValue={`${SUMMARY_DATA.reach.toLocaleString()} alcance`}
          />
          <MetricCard 
            title="Cliques no Link" 
            value={SUMMARY_DATA.linkClicks.toString()} 
            icon={MousePointer2} 
            subValue={`CTR ${((SUMMARY_DATA.linkClicks / SUMMARY_DATA.impressions) * 100).toFixed(2)}%`}
          />
          <MetricCard 
            title="Visualizações (LPV)" 
            value={SUMMARY_DATA.lpv.toString()} 
            icon={Eye} 
            subValue={`${retentionRate}% retenção`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Funnel Chart */}
          <div className="lg:col-span-2 bg-white border border-pine-ink/10 p-8 rounded-2xl">
            <SectionTitle title="Funil de Conversão" icon={BarChart3} />
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={FUNNEL_DATA} layout="vertical" margin={{ left: 40, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 12, fontWeight: 500, fill: '#141414' }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f5f5f5' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                    {FUNNEL_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-900">Diagnóstico Crítico</p>
                <p className="text-xs text-red-700 mt-1 leading-relaxed">
                  O funil "morre" na página de destino. 100 visitas reais e 0 adições ao carrinho indicam problema grave na oferta ou usabilidade do site.
                </p>
              </div>
            </div>
          </div>

          {/* Retention / Quick Stats */}
          <div className="bg-pine-ink text-white p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <SectionTitle title="Eficiência" icon={Target} />
              <div className="space-y-8 mt-4">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-mono opacity-60 uppercase tracking-widest">Retenção de Clique</span>
                    <span className="text-2xl font-bold font-mono">{retentionRate}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${retentionRate}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-pine-accent"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-mono opacity-60 uppercase tracking-widest">Taxa de Conversão</span>
                    <span className="text-2xl font-bold font-mono">0.0%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-0" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-xs font-mono opacity-40 mb-4 uppercase tracking-widest">Recomendação Imediata</p>
              <button className="w-full py-4 bg-pine-accent text-pine-ink font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors group">
                AUDITAR SITE AGORA
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Campaign Table */}
        <div className="mb-12">
          <SectionTitle title="Performance por Campanha" icon={LayoutDashboard} />
          <div className="bg-white border border-pine-ink/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-pine-bg/50 border-b border-pine-ink/10">
                    <th className="p-4 text-xs font-mono text-pine-ink/40 uppercase tracking-widest">Campanha</th>
                    <th className="p-4 text-xs font-mono text-pine-ink/40 uppercase tracking-widest text-right">Investido</th>
                    <th className="p-4 text-xs font-mono text-pine-ink/40 uppercase tracking-widest text-right">Cliques</th>
                    <th className="p-4 text-xs font-mono text-pine-ink/40 uppercase tracking-widest text-right">LPV</th>
                    <th className="p-4 text-xs font-mono text-pine-ink/40 uppercase tracking-widest text-right">CPC</th>
                    <th className="p-4 text-xs font-mono text-pine-ink/40 uppercase tracking-widest text-right">CPA (LPV)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pine-ink/5">
                  {CAMPAIGN_DATA.map((camp, i) => (
                    <tr key={i} className="hover:bg-pine-bg/20 transition-colors">
                      <td className="p-4">
                        <span className="text-sm font-bold block">{camp.name}</span>
                        <span className="text-[10px] font-mono text-pine-ink/40 uppercase">{camp.impressions.toLocaleString()} Impressões</span>
                      </td>
                      <td className="p-4 text-right font-mono text-sm">R$ {camp.spend.toFixed(2)}</td>
                      <td className="p-4 text-right font-mono text-sm">{camp.linkClicks}</td>
                      <td className="p-4 text-right font-mono text-sm">{camp.lpv}</td>
                      <td className="p-4 text-right font-mono text-sm">R$ {camp.cpc.toFixed(2)}</td>
                      <td className="p-4 text-right font-mono text-sm">
                        <span className={cn(
                          "px-2 py-1 rounded-md",
                          camp.cpa > 0 && camp.cpa < 5 ? "bg-green-50 text-green-700" : camp.cpa > 10 ? "bg-red-50 text-red-700" : ""
                        )}>
                          R$ {camp.cpa.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Ad Level Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <SectionTitle title="Criativos em Destaque" icon={Zap} />
            <div className="space-y-4">
              {AD_DATA.map((ad, i) => (
                <div key={i} className="bg-white border border-pine-ink/10 p-5 rounded-2xl flex items-center justify-between group hover:border-pine-accent transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg",
                      ad.cpa < 1 ? "bg-green-100 text-green-700" : "bg-pine-bg text-pine-ink/40"
                    )}>
                      {ad.cpa < 1 ? <TrendingUp className="w-6 h-6" /> : i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{ad.name}</h4>
                      <p className="text-xs text-pine-ink/40 font-mono">R$ {ad.spend.toFixed(2)} gastos • {ad.lpv} visitas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono text-pine-ink/40 uppercase mb-1">CPA (LPV)</p>
                    <p className={cn("text-lg font-bold font-mono", ad.cpa < 1 ? "text-green-600" : "text-pine-ink")}>
                      R$ {ad.cpa.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white border border-pine-ink/10 p-8 rounded-2xl">
            <SectionTitle title="Plano de Ação" icon={CheckCircle2} />
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold text-sm">1</div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-tight">Pausa Urgente</h4>
                  <p className="text-sm text-pine-ink/60 mt-1 leading-relaxed">
                    Pausar campanhas de Tráfego e Engajamento. Estão gerando métricas vaidosas sem visitas reais ao site.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-pine-accent text-pine-ink flex items-center justify-center shrink-0 font-bold text-sm">2</div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-tight">Realocação de Verba</h4>
                  <p className="text-sm text-pine-ink/60 mt-1 leading-relaxed">
                    Focar orçamento no criativo <span className="font-bold text-pine-ink">10 - Reels/Dani</span>. Custo por visitante de R$ 0,33 é excepcional.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-pine-ink text-white flex items-center justify-center shrink-0 font-bold text-sm">3</div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-tight">Auditoria de UX</h4>
                  <p className="text-sm text-pine-ink/60 mt-1 leading-relaxed">
                    Verificar velocidade de carregamento mobile e clareza da oferta. O tráfego está chegando, mas não está convertendo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-10 border-t border-pine-ink/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 opacity-40">
          <Zap className="w-4 h-4" />
          <span className="text-[10px] font-mono uppercase tracking-widest">Pinepow Performance Engine v1.0</span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] font-mono uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Relatório Completo</a>
          <a href="#" className="text-[10px] font-mono uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Configurações</a>
          <a href="#" className="text-[10px] font-mono uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Suporte</a>
        </div>
      </footer>
    </div>
  );
}
