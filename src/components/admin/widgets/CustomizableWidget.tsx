
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, X, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WidgetProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onRemove?: (id: string) => void;
  onResize?: (id: string, size: 'small' | 'medium' | 'large') => void;
  size?: 'small' | 'medium' | 'large';
  customizable?: boolean;
}

const CustomizableWidget: React.FC<WidgetProps> = ({
  id,
  title,
  children,
  onRemove,
  onResize,
  size = 'medium',
  customizable = true
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'col-span-1 row-span-1';
      case 'large': return 'col-span-2 row-span-2';
      default: return 'col-span-1 row-span-1';
    }
  };

  return (
    <Card className={cn(
      "relative group transition-all duration-300 hover:shadow-lg",
      getSizeClasses(),
      isExpanded && "fixed inset-4 z-50 col-span-full row-span-full"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {customizable && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="h-8 w-8 p-0"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8 p-0"
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              {onRemove && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
        
        {showSettings && onResize && (
          <div className="flex gap-2 mt-2">
            <Button
              variant={size === 'small' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onResize(id, 'small')}
            >
              Small
            </Button>
            <Button
              variant={size === 'medium' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onResize(id, 'medium')}
            >
              Medium
            </Button>
            <Button
              variant={size === 'large' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onResize(id, 'large')}
            >
              Large
            </Button>
          </div>
        )}
      </CardHeader>
      
      <CardContent className={cn(
        "flex-1",
        isExpanded && "overflow-auto"
      )}>
        {children}
      </CardContent>
    </Card>
  );
};

export default CustomizableWidget;
