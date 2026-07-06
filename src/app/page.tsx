"use client";

import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Activity, Zap, Database, ArrowUpRight, ArrowDownRight, Layers, Bell } from "lucide-react";

// Mock Data Generator for "Real-time" feel
const generateData = () => {
  const data = [];
  let time = new Date();
  time.setMinutes(time.getMinutes() - 30);
  for (let i = 0; i < 30; i++) {
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      events: Math.floor(Math.random() * (12000 - 8000) + 8000),
      errors: Math.floor(Math.random() * 50),
    });
    time.setMinutes(time.getMinutes() + 1);
  }
  return data;
};

const funnelData = [
  { name: "Page View", users: 150000, fill: "#3b82f6" },
  { name: "Sign Up", users: 45000, fill: "#8b5cf6" },
  { name: "Added Billing", users: 12000, fill: "#10b981" },
  { name: "Subscribed", users: 3500, fill: "#f59e0b" },
];

export default function NexusDashboard() {
  const [data, setData] = useState(generateData());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simulate real-time data ingestion
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)];
        const lastTime = new Date();
        newData.push({
          time: lastTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          events: Math.floor(Math.random() * (15000 - 9000) + 9000),
          errors: Math.floor(Math.random() * 40),
        });
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Nexus Analytics</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-sm text-zinc-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Live Pipeline Active
          </span>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Bell className="h-5 w-5 text-zinc-400" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-zinc-400 font-medium">Events Processed Today</h3>
              <Activity className="h-5 w-5 text-blue-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">2.5M</span>
              <span className="text-sm text-green-400 flex items-center"><ArrowUpRight className="h-4 w-4" /> 12%</span>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-zinc-400 font-medium">Avg Query Latency</h3>
              <Zap className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">42ms</span>
              <span className="text-sm text-green-400 flex items-center"><ArrowDownRight className="h-4 w-4" /> 8%</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-zinc-400 font-medium">ClickHouse Storage</h3>
              <Database className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">14.2 TB</span>
              <span className="text-sm text-zinc-500 flex items-center">Compressed</span>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">Real-time Ingestion Rate</h2>
              <p className="text-sm text-zinc-400">Events per minute across all Kafka brokers</p>
            </div>
            <select className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-blue-500">
              <option>Last 30 Minutes</option>
              <option>Last 1 Hour</option>
              <option>Last 24 Hours</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="time" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Area type="monotone" dataKey="events" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorEvents)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Funnel Analysis */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Conversion Funnel</h2>
                <p className="text-sm text-zinc-400">Checkout Flow Drop-off</p>
              </div>
              <Layers className="h-5 w-5 text-zinc-500" />
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                  <XAxis type="number" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} hide />
                  <YAxis dataKey="name" type="category" stroke="#e4e4e7" fontSize={13} tickLine={false} axisLine={false} width={100} />
                  <Tooltip 
                    cursor={{fill: '#27272a', opacity: 0.4}}
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                  />
                  <Bar dataKey="users" radius={[0, 4, 4, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* System Status / Log */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
            <h2 className="text-lg font-bold mb-4">Pipeline Status</h2>
            <div className="flex-1 bg-black/40 rounded-xl border border-white/5 p-4 font-mono text-xs text-zinc-300 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />
              <div className="space-y-2 animate-pulse">
                <p><span className="text-green-400">[OK]</span> Kafka Topic 'user_events' healthy. Lag: 0</p>
                <p><span className="text-green-400">[OK]</span> ClickHouse cluster node-1 synced.</p>
                <p><span className="text-yellow-400">[WARN]</span> High CPU usage detected on ingest-worker-3 (84%)</p>
                <p><span className="text-green-400">[OK]</span> WebSocket server running on port 8080</p>
                <p><span className="text-blue-400">[INFO]</span> Executing materialized view refresh...</p>
                <p><span className="text-green-400">[OK]</span> Refresh complete in 12ms.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
