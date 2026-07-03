'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, BookOpen } from 'lucide-react';

export default function CourseManagementPage() {
  const [courses] = useState([
    { id: 1, title: 'Web Development Basics', instructor: 'John Doe' },
    { id: 2, title: 'Digital Marketing', instructor: 'Jane Smith' },
    { id: 3, title: 'Data Science 101', instructor: 'Alex Rivera' },
  ]);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="space-y-8 max-w-7xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <motion.div variants={item}>
          <h1 className="text-4xl font-black uppercase tracking-tighter scale-y-110">Course Management</h1>
          <p className="text-gray-400 font-medium mt-2">Create, modify, and manage your ecosystem's curriculum.</p>
        </motion.div>
        <motion.div variants={item}>
          <Button className="bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-widest rounded-xl px-6 h-12 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            <Plus className="w-4 h-4 mr-2" /> Add Course
          </Button>
        </motion.div>
      </div>

      <motion.div variants={item} className="grid gap-4">
        {courses.map((course) => (
          <Card 
            key={course.id} 
            className="bg-[#111] border border-white/5 p-6 flex items-center justify-between hover:border-purple-500/30 transition-all rounded-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{course.title}</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Instructor: {course.instructor}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5">
                <Edit2 className="w-4 h-4 mr-2" /> Edit
              </Button>
              <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </div>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}