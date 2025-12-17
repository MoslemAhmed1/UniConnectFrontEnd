import api from "@/lib/axios";
import type { Submission } from "@/types/student/submission";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

type UseStudentSubmissionsArgs = {
  assignmentId: string | undefined;
  courseId: string | undefined;
  pageIndex?: number;
  pageSize?: number;
  sortingOptions?: { attribute: string; desc: boolean }[];
  filteringOptions?: { attribute: string; value: unknown }[];
};

type PaginationMetadata = {
  pageIndex: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export const useStudentSubmissions = ({
  assignmentId,
  courseId,
  pageIndex,
  pageSize,
  sortingOptions,
  filteringOptions,
}: UseStudentSubmissionsArgs) => {
  const { data: submissionsAndMetadata, isLoading } = useQuery<{
    data: Submission[];
    meta: PaginationMetadata;
  }>({
    queryKey: [
      "submissions",
      assignmentId,
      pageIndex,
      pageSize,
      sortingOptions,
      filteringOptions,
    ],
    queryFn: async () => {
      try {
        if (!assignmentId) throw new Error("assignmentId is undefined");
        if (!courseId) throw new Error("courseId is undefined");

        let query = `/api/courses/${courseId}/assignments/${assignmentId}/submissions?turned_in=true`;

        // Building sort query
        if (typeof pageIndex === "number") {
          query += `&pageIndex=${pageIndex}`;
        }

        if (typeof pageSize === "number") {
          query += `&pageSize=${pageSize}`;
        }

        if (sortingOptions && sortingOptions.length > 0) {
          query += "&sortBy=";

          sortingOptions.forEach((option) => {
            query += `${option.attribute},`;
          });

          // Remove the extra ',' at the end
          query = query.substring(0, query.length - 1);

          query += "&sortOrder=";

          sortingOptions.forEach((option) => {
            if (option.desc) {
              query += `desc,`;
            } else {
              query += `asc,`;
            }
          });

          // Remove the extra ',' at the end
          query = query.substring(0, query.length - 1);
        }

        // Building filter query
        filteringOptions?.forEach((option) => {
          query += `&${option.attribute}=${option.value}`;
        });

        const result = await api.get(query);
        return result.data;
      } catch (error) {
        console.error(error);
        toast.error(
          "An error occurred while loading the assignment submission, please try again."
        );
      }
    },
    initialData: {
      data: [],
      meta: {
        pageIndex: 0,
        pageSize: 0,
        total: 0,
        totalPages: 0,
      },
    },
  });

  return {
    submissionsAndMetadata,
    isLoading,
  };
};
