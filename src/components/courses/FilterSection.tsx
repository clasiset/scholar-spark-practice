
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { departments, levels, studyModes } from '@/data/courses';

interface Filters {
  level?: string[];
  department?: string[];
  studyMode?: string[];
}

interface FilterSectionProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  clearFilters: () => void;
}

const FilterSection = ({ filters, setFilters, clearFilters }: FilterSectionProps) => {
  const handleCheckboxChange = (category: keyof Filters, value: string) => {
    setFilters(prev => {
      const currentValues = prev[category] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  return (
    <Card className="lg:sticky lg:top-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['level', 'studyMode']} className="w-full">
          <AccordionItem value="level">
            <AccordionTrigger>Degree Level</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {levels.map(level => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`level-${level}`} 
                    checked={filters.level?.includes(level) || false}
                    onCheckedChange={() => handleCheckboxChange('level', level)}
                  />
                  <Label htmlFor={`level-${level}`} className="font-normal">{level}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="department">
            <AccordionTrigger>Department</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {departments.map(dept => (
                <div key={dept} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`dept-${dept}`} 
                    checked={filters.department?.includes(dept) || false}
                    onCheckedChange={() => handleCheckboxChange('department', dept)}
                  />
                  <Label htmlFor={`dept-${dept}`} className="font-normal">{dept}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="studyMode">
            <AccordionTrigger>Study Mode</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {studyModes.map(mode => (
                <div key={mode} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`mode-${mode}`} 
                    checked={filters.studyMode?.includes(mode) || false}
                    onCheckedChange={() => handleCheckboxChange('studyMode', mode)}
                  />
                  <Label htmlFor={`mode-${mode}`} className="font-normal">{mode}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FilterSection;
