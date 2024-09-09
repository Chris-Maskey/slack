"use client";

import Image from "next/image";
import VerificationInput from "react-verification-input";

type JoinPageProps = {
  params: {
    workspaceId: string;
  };
};

const JoinPage = ({ params }: JoinPageProps) => {
  return (
    <div className="h-full flex flex-col gap-8 items-center justify-center bg-white p-8 rounded-lg shadow-sm">
      <Image src="/logo.svg" width={60} height={60} alt="Logo" />
      <div className="flex flex-col gap-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join workspace</h1>
          <p className="text-md text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
        <VerificationInput
          classNames={{
            container: "flex gap-2",
          }}
        />
      </div>
    </div>
  );
};

export default JoinPage;
