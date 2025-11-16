import type { StudentUser } from "@/types/student/student-user";
import { useQuery } from "@tanstack/react-query";

const useStudentProfileData = () => {
  const { data: profileData, isLoading } = useQuery<StudentUser>({
    queryKey: ["student-profile-data"],
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const tempUser: StudentUser = {
            studentCode: "912912912",
            profileUrl:
              "https://tr.rbxcdn.com/180DAY-d4a6d1564bf7c0e65447501bdb3cc584/420/420/FaceAccessory/Webp/noFilter",
            firstName: "kit",
            parentName: "cat",
            grandparentName: "boss",
            familyName: "abood",
            email: "cat_99@cats.com",
          };
          resolve(tempUser);
        }, 2000);
      });
    },
  });

  return {
    profileData,
    isLoading,
  };
};

export { useStudentProfileData };
