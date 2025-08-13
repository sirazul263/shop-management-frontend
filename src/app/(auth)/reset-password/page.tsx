import { Suspense } from "react";
import PageLoader from "@/components/page-loader";
import ResetPassword from "@/features/auth/components/reset-password";

export default function ResetPasswordPage() {
  return (
    <div>
      {/* The Suspense must wrap ResetPassword directly */}
      <Suspense fallback={<PageLoader />}>
        <ResetPassword />
      </Suspense>
    </div>
  );
}
