import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Shield, 
  Scale, 
  Activity, 
  Pill, 
  TrendingDown, 
  Droplets, 
  Building2, 
  Users, 
  Smile, 
  Star, 
  Stethoscope,
  TrendingUp,
  Minus
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from "recharts";

const SummaryDashboard = () => {
  // Mock data for each indicator
  const indicators = [
    {
      id: 1,
      name: "Pressure Injuries",
      value: 8.2,
      unit: "%",
      subtitle: "of residents with ≥1 pressure injury",
      trend: "down",
      trendValue: "2.1%",
      icon: Heart,
      color: "hsl(0, 72%, 51%)",
      type: "gauge"
    },
    {
      id: 2,
      name: "Restrictive Practices",
      value: 12.5,
      unit: "%",
      subtitle: "subject to restrictive practices",
      trend: "down",
      trendValue: "1.8%",
      icon: Shield,
      color: "hsl(38, 92%, 50%)",
      type: "gauge"
    },
    {
      id: 3,
      name: "Unplanned Weight Loss",
      value: 15.3,
      value2: 8.7,
      unit: "%",
      subtitle: "Significant / Consecutive loss",
      icon: Scale,
      color: "hsl(212, 99%, 77%)",
      type: "dual-bar"
    },
    {
      id: 4,
      name: "Falls & Major Injury",
      value: 24.6,
      value2: 4.2,
      unit: "%",
      subtitle: "Falls / Major injury from falls",
      trend: "up",
      trendValue: "3.2%",
      icon: Activity,
      color: "hsl(259, 66%, 21%)",
      type: "dual-metric"
    },
    {
      id: 5,
      name: "Medication Management",
      value: 42.1,
      value2: 18.5,
      unit: "%",
      subtitle: "Polypharmacy / Antipsychotics",
      icon: Pill,
      color: "hsl(245, 89%, 82%)",
      type: "dual-gauge"
    },
    {
      id: 6,
      name: "Activities of Daily Living",
      value: 18.4,
      unit: "%",
      subtitle: "with decline in ADL score",
      trend: "down",
      trendValue: "1.5%",
      icon: TrendingDown,
      color: "hsl(142, 71%, 45%)",
      type: "sparkline"
    },
    {
      id: 7,
      name: "Incontinence Care",
      value: 22.3,
      unit: "%",
      subtitle: "with IAD by severity",
      icon: Droplets,
      color: "hsl(231, 72%, 93%)",
      type: "stacked-bar"
    },
    {
      id: 8,
      name: "Hospitalisation",
      value: 14.8,
      unit: "%",
      subtitle: "ED or hospital admissions",
      trend: "up",
      trendValue: "2.4%",
      icon: Building2,
      color: "hsl(288, 71%, 88%)",
      type: "comparison-bar"
    },
    {
      id: 9,
      name: "Workforce",
      value: 16.2,
      unit: "%",
      subtitle: "staff turnover rate",
      icon: Users,
      color: "hsl(259, 66%, 21%)",
      type: "donut"
    },
    {
      id: 10,
      name: "Consumer Experience",
      value: 87.5,
      unit: "%",
      subtitle: "reporting Excellent/Good",
      trend: "up",
      trendValue: "4.2%",
      icon: Smile,
      color: "hsl(142, 71%, 45%)",
      type: "smiley-bar"
    },
    {
      id: 11,
      name: "Quality of Life",
      value: 82.3,
      unit: "%",
      subtitle: "reporting Excellent/Good",
      trend: "up",
      trendValue: "3.1%",
      icon: Star,
      color: "hsl(38, 92%, 50%)",
      type: "horizontal-bar"
    },
    {
      id: 12,
      name: "Allied Health",
      value: 78.6,
      unit: "%",
      subtitle: "of recommended services received",
      icon: Stethoscope,
      color: "hsl(212, 99%, 77%)",
      type: "progress"
    }
  ];

  const renderVisualization = (indicator: any) => {
    switch (indicator.type) {
      case "gauge":
        const gaugeData = [{ value: indicator.value, fill: indicator.color }];
        return (
          <ResponsiveContainer width="100%" height={80}>
            <RadialBarChart 
              cx="50%" 
              cy="50%" 
              innerRadius="60%" 
              outerRadius="90%" 
              barSize={10} 
              data={gaugeData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                background={{ fill: 'hsl(var(--muted))' }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        );

      case "dual-bar":
        const dualBarData = [
          { name: 'Significant', value: indicator.value },
          { name: 'Consecutive', value: indicator.value2 }
        ];
        return (
          <ResponsiveContainer width="100%" height={60}>
            <BarChart data={dualBarData}>
              <Bar dataKey="value" fill={indicator.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "dual-metric":
        return (
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
              <span className="text-sm font-medium">{indicator.value}%</span>
              <span className="text-xs text-muted-foreground">falls</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
              <span className="text-sm font-medium">{indicator.value2}%</span>
              <span className="text-xs text-muted-foreground">injury</span>
            </div>
          </div>
        );

      case "dual-gauge":
        return (
          <div className="flex gap-4 mt-2">
            {[indicator.value, indicator.value2].map((val, idx) => (
              <div key={idx} className="flex-1">
                <ResponsiveContainer width="100%" height={50}>
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="50%" 
                    outerRadius="80%" 
                    barSize={6} 
                    data={[{ value: val }]}
                    startAngle={180}
                    endAngle={0}
                  >
                    <RadialBar
                      dataKey="value"
                      cornerRadius={5}
                      fill={indicator.color}
                      background={{ fill: 'hsl(var(--muted))' }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="text-center text-xs text-muted-foreground mt-1">
                  {val}%
                </div>
              </div>
            ))}
          </div>
        );

      case "sparkline":
        const sparklineData = [
          { value: 22 },
          { value: 21 },
          { value: 20 },
          { value: 19.5 },
          { value: 19 },
          { value: 18.4 }
        ];
        return (
          <ResponsiveContainer width="100%" height={50}>
            <LineChart data={sparklineData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={indicator.color} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "stacked-bar":
        const stackedData = [
          { name: 'Mild', value: 45, fill: 'hsl(142, 71%, 45%)' },
          { name: 'Moderate', value: 35, fill: 'hsl(38, 92%, 50%)' },
          { name: 'Severe', value: 20, fill: 'hsl(0, 72%, 51%)' }
        ];
        return (
          <ResponsiveContainer width="100%" height={40}>
            <BarChart data={[{ ...stackedData.reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {}) }]} layout="vertical">
              <Bar dataKey="Mild" stackId="a" fill={stackedData[0].fill} radius={[4, 0, 0, 4]} />
              <Bar dataKey="Moderate" stackId="a" fill={stackedData[1].fill} />
              <Bar dataKey="Severe" stackId="a" fill={stackedData[2].fill} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "comparison-bar":
        const comparisonData = [
          { name: 'Previous', value: 12.4 },
          { name: 'Current', value: indicator.value }
        ];
        return (
          <ResponsiveContainer width="100%" height={60}>
            <BarChart data={comparisonData}>
              <Bar dataKey="value" fill={indicator.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "donut":
        const donutData = [
          { name: 'Turnover', value: indicator.value, fill: indicator.color },
          { name: 'Retained', value: 100 - indicator.value, fill: 'hsl(var(--muted))' }
        ];
        return (
          <ResponsiveContainer width="100%" height={80}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={35}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );

      case "smiley-bar":
        return (
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Smile className="h-8 w-8" style={{ color: indicator.color }} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all" 
                    style={{ width: `${indicator.value}%`, backgroundColor: indicator.color }}
                  />
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {indicator.value}%
                </span>
              </div>
            </div>
          </div>
        );

      case "horizontal-bar":
        return (
          <div className="space-y-3 mt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
              <div className="relative w-full h-6 bg-gradient-to-r from-destructive via-warning to-success rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full w-1 bg-foreground"
                  style={{ left: `${indicator.value}%` }}
                />
              </div>
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="mt-4">
            <Progress value={indicator.value} className="h-3" />
          </div>
        );

      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-success" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Quality Indicators Dashboard" 
        subtitle="Residential Aged Care Facility" 
        period="Q3 2024"
        showBackLink={true}
      />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {indicators.map((indicator) => {
            const Icon = indicator.icon;
            return (
              <Card 
                key={indicator.id}
                className="relative overflow-hidden transition-all hover:shadow-lg border-border/50"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card)) 100%)'
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base font-semibold text-foreground leading-tight">
                        {indicator.name}
                      </CardTitle>
                    </div>
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${indicator.color}20` }}
                    >
                      <Icon 
                        className="h-5 w-5" 
                        style={{ color: indicator.color }}
                      />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {indicator.value}
                    </span>
                    <span className="text-2xl font-medium text-muted-foreground">
                      {indicator.unit}
                    </span>
                  </div>

                  {renderVisualization(indicator)}

                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">
                      {indicator.subtitle}
                    </p>
                    {indicator.trend && (
                      <div className="flex items-center gap-1.5 text-xs">
                        {getTrendIcon(indicator.trend)}
                        <span className="text-muted-foreground">
                          {indicator.trendValue} vs previous quarter
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default SummaryDashboard;
