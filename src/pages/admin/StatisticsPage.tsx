import { Card } from "@/components/ui/card";
import { Book, BookOpen, User } from "lucide-react";

const KPICard = ({
  icon: Icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle?: string;
}) => (
  <Card className={`p-4 hover:shadow-md transition-shadow`}>
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center text-white">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  </Card>
);

export const StatisticsPage = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard
          icon={Book}
          title="Course with the most students"
          value={"CMP123: Jalal course"}
          subtitle="200 students are in Jalal Course"
        />
        <KPICard
          icon={Book}
          title="Course with the least students"
          value={"CMP123: Moslem Course"}
          // TODO: (singular, none singular)
          subtitle="1 student (only muslim) in Moslem course"
        />
        <KPICard
          icon={BookOpen}
          title="Courses Count"
          value={200}
          subtitle="In the UniConnect system."
        />
        <KPICard
          icon={User}
          title="System User Count"
          value={2000}
          subtitle="Across all Courses"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>
      </div>
    </div>
  );
};
