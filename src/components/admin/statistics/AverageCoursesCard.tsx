// import { Card } from "@/components/ui/card";
// import {chart} from "recharts"

// const chartConfig = {
//   value: { label: "Value", color: "hsl(210, 85%, 42%)" },
//   onTime: { label: "On Time", color: "hsl(170, 65%, 45%)" },
//   late: { label: "Late", color: "hsl(45, 90%, 50%)" },
//   missing: { label: "Missing", color: "hsl(0, 75%, 55%)" },
//   count: { label: "Users", color: "hsl(210, 85%, 42%)" },
//   avg: { label: "Average", color: "hsl(170, 65%, 45%)" },
// } satisfies ;
// export const AverageCoursesCard = () => {
//   return (
//     <Card className="p-6 lg:col-span-2">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <h3 className="font-semibold text-foreground">
//             Average Grades by Course
//           </h3>
//         </div>
//       </div>
//       <p className="text-xs text-muted-foreground mb-4">
//         Average grade across graded submissions.
//       </p>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <ChartContainer config={chartConfig} className="h-[250px]">
//           <BarChart data={gradeChartData} layout="vertical">
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis type="number" domain={[0, 100]} />
//             <YAxis dataKey="name" type="category" width={60} />
//             <ChartTooltip content={<ChartTooltipContent />} />
//             <Bar dataKey="value" fill="hsl(210, 85%, 42%)" radius={4}>
//               {gradeChartData.map((entry, index) => (
//                 <Cell
//                   key={index}
//                   fill={
//                     entry.value >= 80
//                       ? "hsl(170, 65%, 45%)"
//                       : entry.value >= 70
//                         ? "hsl(210, 85%, 42%)"
//                         : "hsl(45, 90%, 50%)"
//                   }
//                 />
//               ))}
//             </Bar>
//           </BarChart>
//         </ChartContainer>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b">
//                 <th className="text-left py-2 font-medium">Course</th>
//                 <th className="text-right py-2 font-medium">Avg</th>
//                 <th className="text-right py-2 font-medium">Median</th>
//                 <th className="text-right py-2 font-medium">Students</th>
//                 <th className="text-right py-2"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {mockCourseGrades.map((course) => (
//                 <tr key={course.code} className="border-b last:border-0">
//                   <td className="py-2">{course.name}</td>
//                   <td className="text-right font-medium">
//                     {course.avgGrade.toFixed(1)}%
//                   </td>
//                   <td className="text-right text-muted-foreground">
//                     {course.median}%
//                   </td>
//                   <td className="text-right text-muted-foreground">
//                     {course.students}
//                   </td>
//                   <td className="text-right">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => setGradeDialogOpen(true)}
//                     >
//                       <Eye className="w-4 h-4" />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </Card>
//   );
// };
