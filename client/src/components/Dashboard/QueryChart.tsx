import React, { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';


const data = [
  { date: '28 Jun', thisMonth: 2700000, lastMonth: 2500000 },
  { date: '29', thisMonth: 2600000, lastMonth: 2550000 },
  { date: '30', thisMonth: 2750000, lastMonth: 2600000 },
  { date: '01 Jul', thisMonth: 2650000, lastMonth: 2700000 },
  { date: '02', thisMonth: 2800000, lastMonth: 2750000 },
  { date: '03', thisMonth: 2700000, lastMonth: 2800000 },
  { date: '04', thisMonth: 2900000, lastMonth: 2850000 },
  { date: '05', thisMonth: 3000000, lastMonth: 2900000 },
  { date: '06', thisMonth: 2950000, lastMonth: 2950000 },
  { date: '07', thisMonth: 3050000, lastMonth: 3000000 },
  { date: '08', thisMonth: 2900000, lastMonth: 3050000 },
  { date: '09', thisMonth: 3000000, lastMonth: 3100000 },
  { date: '10', thisMonth: 2950000, lastMonth: 3000000 },
  { date: '11', thisMonth: 3100000, lastMonth: 2950000 },
  { date: '12', thisMonth: 3050000, lastMonth: 2900000 },
  { date: '13', thisMonth: 3150000, lastMonth: 2850000 },
  { date: '14', thisMonth: 3100000, lastMonth: 2800000 },
  { date: '15', thisMonth: 3000000, lastMonth: 2750000 },
  { date: '16', thisMonth: 2950000, lastMonth: 2700000 },
  { date: '17', thisMonth: 3050000, lastMonth: 2650000 },
  { date: '18', thisMonth: 3000000, lastMonth: 2600000 },
  { date: '19', thisMonth: 2950000, lastMonth: 2550000 },
  { date: '20', thisMonth: 3000000, lastMonth: 2500000 },
  { date: '21', thisMonth: 2950000, lastMonth: 2600000 },
  { date: '22', thisMonth: 3000000, lastMonth: 2700000 },
  { date: '23', thisMonth: 2900000, lastMonth: 2800000 },
  { date: '24', thisMonth: 2950000, lastMonth: 2900000 },
  { date: '25', thisMonth: 2850000, lastMonth: 2950000 },
]

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
    {children}
  </div>
)

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">
    {children}
  </div>
)

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold mb-2">
    {children}
  </h2>
)

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>
    {children}
  </div>
)

export default function QueryChart() {
  const formatYAxis = (value: number) => {
    return (value / 1000000).toFixed(1) + 'M'
  }

  const formatTooltip = (value: number) => {
    return value.toLocaleString()
  }

  const totalMethodCalls = useMemo(() => {
    const lastIndex = data.length - 1
    return data[lastIndex].thisMonth
  }, [data])

  const percentageIncrease = useMemo(() => {
    const lastIndex = data.length - 1
    const increase = data[lastIndex].thisMonth - data[lastIndex].lastMonth
    return ((increase / data[lastIndex].lastMonth) * 100).toFixed(0)
  }, [data])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="text-5xl font-bold text-[#ff9b8a]">{totalMethodCalls.toLocaleString()}</span>
          <span className="ml-2 text-sm text-green-500">▲ {percentageIncrease}%</span>
        </CardTitle>
        <p className="text-sm text-gray-500 uppercase">Total Method Calls</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#888' }} 
              />
              <YAxis 
                tickFormatter={formatYAxis} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#888' }} 
              />
              <Tooltip 
                formatter={formatTooltip}
                contentStyle={{ background: 'white', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#333' }}
              />
              <Line 
                type="monotone" 
                dataKey="thisMonth" 
                // stroke="#ff9b8a" 
                stroke='#d4c8b8'
                strokeWidth={2} 
                dot={false} 
              />
              <Line 
                type="monotone" 
                dataKey="lastMonth" 
                stroke="#88c7dc" 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#ff9b8a] rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">This Month</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#88c7dc] rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Last Month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}