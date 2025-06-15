
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import { allCourses } from '@/data/courses';
import CourseCard from './courses/CourseCard';
import FilterSection from './courses/FilterSection';
import BreadcrumbNav from './BreadcrumbNav';

interface HistoryEntry {
  page: string;
  data: any | null;
}

const CoursesPage = ({ openModal, navigate, history, navigateToHistory }: { 
  openModal: (type: string, data?: any) => void;
  navigate: (page: string, data?: any) => void;
  history: HistoryEntry[];
  navigateToHistory: (index: number) => void;
}) => {
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
          <BreadcrumbNav history={history} navigateToHistory={navigateToHistory} />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 mt-4">Course Catalog</h1>
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
             <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" onClick={() => openModal('signup')}>Apply Now</Button>
             <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => navigate('contact')}>Request Information</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
