import { Card } from "@/components/ui/card";
import MaterialItem from "./MaterialItem";
import type { Material } from "@/types/student/material";

type MaterialSectionProps = {
  materials: Material[];
  sectionName: string;
};

export default function MaterialSection({ materials, sectionName }: MaterialSectionProps) {
  return (
    <Card className="divide-y gap-0 p-0">
      {materials.length === 0 ? (
        <p className="p-4 text-sm text-slate-500">
          No {sectionName.toLowerCase()} found
        </p>
      ) : (
        materials.map((material) => (
          <MaterialItem key={material.id} material={material}/>
        ))
      )}
    </Card>
  );
}
