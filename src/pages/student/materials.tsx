import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStudentMaterials } from "@/hooks/student/use-student-materials";
import type { Material } from "@/types/student/material";
import MaterialSection from "@/components/student/course/MaterialSection";

const categoryList = [
  { id: "lecture", label: "Lecture Slides", category: "lecture" },
  { id: "sheet", label: "Problem Sheets", category: "sheet" },
  { id: "quiz", label: "Past Quizzes", category: "quiz" },
  { id: "assignment", label: "Assignments", category: "assignment" },
  { id: "tutorial", label: "Tutorials", category: "tutorial" },
  { id: "textbook", label: "Textbook", category: "textbook" },
];

export default function Materials() {
  const { id, category } = useParams<{ id: string; category: string }>();
  const { materials } = useStudentMaterials();

  const filterMaterialsByCategory = (tabCategory: string): Material[] => {
    return materials.filter((m) => m.category === tabCategory && m.courseCode === id);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Materials</h1>
          <p className="text-slate-500">
            Signals & Systems - Dr. Sarah Johnson
          </p>
        </div>

        <Tabs defaultValue={category || "lecture"} className="space-y-6">
          <TabsList className="bg-slate-100">
            {categoryList.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categoryList.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <MaterialSection
                materials={filterMaterialsByCategory(cat.category)}
                sectionName={cat.label}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
