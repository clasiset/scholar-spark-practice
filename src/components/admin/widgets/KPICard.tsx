
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  color?: string;
  bgColor?: string;
  description?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  color = "text-blue-600",
  bgColor = "bg-blue-50 dark:bg-blue-950",
  description
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-green-600";
      case "down": return "text-red-600";
      default: return "text-slate-500";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up": return TrendingUp;
      case "down": return TrendingDown;
      default: return null;
    }
  };

  const TrendIcon = getTrendIcon();

  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              {title}
            </p>
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {value}
            </p>
            
            {change && (
              <div className="flex items-center gap-1">
                {TrendIcon && <TrendIcon className={cn("w-4 h-4", getTrendColor())} />}
                <span className={cn("text-sm font-medium", getTrendColor())}>
                  {change}
                </span>
                <span className="text-sm text-slate-500 ml-1">vs last period</span>
              </div>
            )}
            
            {description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {description}
              </p>
            )}
          </div>
          
          <div className={cn(
            "p-3 rounded-xl group-hover:scale-110 transition-transform duration-300",
            bgColor
          )}>
            <Icon className={cn("w-6 h-6", color)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
