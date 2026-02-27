import React from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { generateSentimentData, generatePlatformData, generateTrendData, generateEngagementData, TrendDataPoint, ChartDataPoint } from '../../utils/chartUtils';
import { cn } from '../ui/utils';

interface SentimentChartProps {
  className?: string;
}

export function SentimentChart({ className }: SentimentChartProps) {
  const data = generateSentimentData();

  return (
    <div className={cn('bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-800', className)}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Sentiment Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name} ${percentage}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} mentions`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.name} className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{item.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">{item.percentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PlatformChartProps {
  className?: string;
}

export function PlatformChart({ className }: PlatformChartProps) {
  const data = generatePlatformData();

  return (
    <div className={cn('bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-800', className)}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Mentions by Platform</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" stroke="#6b7280" />
          <YAxis dataKey="name" type="category" stroke="#6b7280" width={90} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value) => `${value} mentions`}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#3b82f6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface TrendChartProps {
  className?: string;
  title?: string;
}

export function TrendChart({ className, title = 'Mentions Trend (30 Days)' }: TrendChartProps) {
  const data = generateTrendData();

  return (
    <div className={cn('bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-800', className)}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tick={{ fill: '#6b7280' }}
          />
          <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} tick={{ fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value) => [`${value} mentions`, 'Mentions']}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface EngagementChartProps {
  className?: string;
}

export function EngagementChart({ className }: EngagementChartProps) {
  const data = generateEngagementData();

  return (
    <div className={cn('bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-800', className)}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Total Engagement</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#3b82f6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
