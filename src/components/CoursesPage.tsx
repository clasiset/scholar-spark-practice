
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import BackButton from './BackButton';

// Mock data with more details
const allCourses = [
  { id: 1, title: 'Advanced Mathematics', code: 'MATH301', description: 'Comprehensive math preparation for university entrance.', department: 'Mathematics', level: 'Undergraduate', studyMode: 'On-Campus', duration: '1 Year', credits: 15, startDate: 'Fall 2025' },
  { id: 2, title: 'Physics Fundamentals', code: 'PHY101', description: 'Essential physics concepts for science and engineering students.', department: 'Physics', level: 'Undergraduate', studyMode: 'On-Campus', duration: '1 Year', credits: 15, startDate: 'Fall 2025' },
  { id: 3, title: 'Chemistry Basics', code: 'CHEM101', description: 'Core chemistry principles and lab practices.', department: 'Chemistry', level: 'Undergraduate', studyMode: 'Blended', duration: '1 Year', credits: 15, startDate: 'Fall 2025' },
  { id: 4, title: 'Introduction to Programming', code: 'CS101', description: 'Learn to code with Python. No prior experience required.', department: 'Computer Science', level: 'Undergraduate', studyMode: 'Online', duration: '12 Weeks', credits: 5, startDate: 'Spring 2026' },
  { id: 5, title: 'Masters in Business Administration', code: 'MBA500', description: 'Develop leadership skills for the modern business world.', department: 'Business', level: 'Graduate', studyMode: 'Full-time', duration: '2 Years', credits: 60, startDate: 'Fall 2025' },
  { id: 6, title: 'Digital Marketing Certificate', code: 'MKTG250', description: 'A short course on social media marketing, SEO, and content strategy.', department: 'Business', level: 'Certificate', studyMode: 'Online', duration: '6 Weeks', credits: 0, startDate: 'Rolling' },
];

const departments = [...new Set(allCourses.map(c => c.department))];
const levels = [...new Set(allCourses.map(c => c.level))];
const studyModes = [...new Set(allCourses.map(c => c.studyMode))];

// Sub-components
const Breadcrumbs = ({ crumbs }: { crumbs: { label: string; href?: string }[] }) => (
  <nav aria-label="breadcrumb" className="mb-4 text-sm text-muted-foreground">
    <ol className="flex space-x-2">
      {crumbs.map((crumb, index) => (
        <li key={index} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          {crumb.href ? <a href={crumb.href} className="hover:underline">{crumb.label}</a> : <span>{crumb.label}</span>}
        </li>
      ))}
    </ol>
  </nav>
);

const CourseCard = ({ course, openModal }) => (
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

const FilterSection = ({ filters, setFilters, clearFilters }) => {
  const handleCheckboxChange = (category, value) => {
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


const CoursesPage = ({ openModal, goBack, previousPageName }: { openModal: (type: string, data?: any) => void, goBack?: () => void, previousPageName?: string | null }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('title-asc');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState<{level?: string[], department?: string[], studyMode?: string[]}>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredAndSortedCourses = useMemo(() => {
    let courses = allCourses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filters.level && filters.level.length > 0) {
      courses = courses.filter(c => filters.level.includes(c.level));
    }
    if (filters.department && filters.department.length > 0) {
      courses = courses.filter(c => filters.department.includes(c.department));
    }
    if (filters.studyMode && filters.studyMode.length > 0) {
      courses = courses.filter(c => filters.studyMode.includes(c.studyMode));
    }

    courses.sort((a, b) => {
      const [key, order] = sortOrder.split('-');
      if (key === 'title') {
        return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      }
      return 0;
    });

    return courses;
  }, [searchQuery, sortOrder, filters]);

  const clearFilters = () => setFilters({});

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Section 1 & 2: Hero and Breadcrumbs */}
      <section className="py-12 px-6 lg:px-12 bg-accent/50">
        <div className="container mx-auto">
          <BackButton onClick={goBack} previousPageName={previousPageName} />
          <Breadcrumbs crumbs={[{ label: 'Home', href: '#' }, { label: 'Academics' }, { label: 'Courses' }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Course Catalog</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            From foundational degrees to advanced specializations, explore the wide array of courses designed to empower your career and personal growth.
          </p>
        </div>
      </section>

      {/* Section 3 & 4: Filters and Course Listings */}
      <div className="container mx-auto py-12 px-6 lg:px-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1">
            <FilterSection filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Search and Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by title or code..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                 <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title-asc">Alphabetical (A-Z)</SelectItem>
                    <SelectItem value="title-desc">Alphabetical (Z-A)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center rounded-md bg-muted p-1">
                   <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}>
                    <LayoutGrid className="h-5 w-5" />
                  </Button>
                  <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}>
                    <List className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {mobileFiltersOpen && (
              <div className="lg:hidden mb-8">
                 <FilterSection filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
              </div>
            )}

            {/* Course List */}
            {filteredAndSortedCourses.length > 0 ? (
               <div className={`gap-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2' : 'flex flex-col'}`}>
                {filteredAndSortedCourses.map(course => (
                  <CourseCard key={course.id} course={course} openModal={openModal} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold">No Courses Found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(''); clearFilters(); }}>
                  Clear Search & Filters
                </Button>
              </div>
            )}

            {/* TODO: Section 5: Pagination */}
          </main>
        </div>
      </div>
      
      {/* Section 6: CTA */}
       <section className="py-20 px-6 lg:px-12 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Our admissions team is here to help you on your journey. Apply today or contact us for more information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">Apply Now</Button>
             <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Request Information</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
