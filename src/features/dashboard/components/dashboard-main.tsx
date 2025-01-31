"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetAnalytics } from "../api/use-get-analytics";
import { Analytics } from "./analytics";
import { useStoreId } from "@/hooks/use-store-id";
export const DashboardMain = () => {
  const storeId = useStoreId();
  const { data: result, isLoading } = useGetAnalytics(storeId);
  if (isLoading) {
    return <PageLoader />;
  }
  if (result && result.status !== 1) {
    return <PageError message={result.message} />;
  }

  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={result ? result.data : null} />
      {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TaskList data={tasks} total={tasks.length} />
        <ProjectList data={projects.documents} total={projects.total} />
        <MemberList data={members.documents} total={members.total} />
      </div> */}
    </div>
  );
};
