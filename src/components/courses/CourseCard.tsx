
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from '@/data/courses';

interface CourseCardProps {
  course: Course;
  openModal: (type: string, data?: any) => void;
}

const CourseCard = ({ course, openModal }: CourseCardProps) => (
  <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="text-xl">{course.title}</CardTitle>
      <CardDescription>{course.code}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-muted-foreground mb-4 text-sm">{course.description}</p>
      <div className="text-xs space-y-1 text-muted-foreground">
        <p><strong>Department:</strong> {course.department}</p>
        <p><strong>Level:</strong> {course.level}</p>
        <p><strong>Mode:</strong> {course.studyMode}</p>
        <p><strong>Duration:</strong> {course.duration}</p>
      </div>
    </CardContent>
    <div className="p-6 pt-0">
       <Button onClick={() => openModal('enroll', course.title)} className="w-full">
        Enroll Now
      </Button>
    </div>
  </Card>
);

export default CourseCard;
