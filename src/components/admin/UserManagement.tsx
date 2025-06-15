
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Mail,
  Phone,
  GraduationCap,
  UserCheck
} from 'lucide-react';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: 1,
      name: "አበበ ተስፋዬ",
      email: "abebe.tesfaye@email.com",
      class: "Grade 12A",
      status: "Active",
      enrollmentDate: "2024-01-15",
      attendance: "95%"
    },
    {
      id: 2,
      name: "Meron Kebede",
      email: "meron.kebede@email.com",
      class: "Grade 11B",
      status: "Active", 
      enrollmentDate: "2024-01-20",
      attendance: "88%"
    },
    {
      id: 3,
      name: "ዳዊት አሸናፊ",
      email: "dawit.ashenafi@email.com",
      class: "Grade 10A",
      status: "Inactive",
      enrollmentDate: "2023-09-10",
      attendance: "76%"
    }
  ];

  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@zehulu.com",
      subjects: ["Mathematics", "Physics"],
      status: "Active",
      experience: "8 years",
      phone: "+251-911-123456"
    },
    {
      id: 2,
      name: "Prof. Ahmed Hassan",
      email: "ahmed.hassan@zehulu.com", 
      subjects: ["Chemistry", "Biology"],
      status: "Active",
      experience: "12 years",
      phone: "+251-911-789012"
    }
  ];

  const TabButton = ({ id, label, count }: { id: string; label: string; count: number }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        activeTab === id
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-accent hover:text-accent-foreground'
      }`}
    >
      {label}
      <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
        {count}
      </span>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage students, teachers, and staff members</p>
        </div>
        <Button className="w-fit">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">2,847</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-muted-foreground">Teachers</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">45</p>
              <p className="text-sm text-muted-foreground">Staff Members</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">34</p>
              <p className="text-sm text-muted-foreground">Pending Applications</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>User Directory</CardTitle>
              <CardDescription>View and manage all system users</CardDescription>
            </div>
            
            {/* Search and Filter */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b">
            <TabButton id="students" label="Students" count={2847} />
            <TabButton id="teachers" label="Teachers" count={156} />
            <TabButton id="staff" label="Staff" count={45} />
            <TabButton id="parents" label="Parents" count={1823} />
          </div>

          {/* Students Table */}
          {activeTab === 'students' && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Enrollment Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          student.status === 'Active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {student.status}
                        </span>
                      </TableCell>
                      <TableCell>{student.attendance}</TableCell>
                      <TableCell>{student.enrollmentDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Teachers Table */}
          {activeTab === 'teachers' && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">{teacher.name}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.subjects.join(', ')}</TableCell>
                      <TableCell>{teacher.experience}</TableCell>
                      <TableCell>{teacher.phone}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {teacher.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === 'staff' || activeTab === 'parents') && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                {activeTab === 'staff' ? 'Staff' : 'Parent'} management features will be available soon.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
