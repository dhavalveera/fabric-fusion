import type { FC } from "react";

// utils
import { getGreetings } from "@/utils/get-greetings";

const DashboardPage: FC = () => {
  return (
    <>
      <title>Dashboard | Fabric Fusion</title>

      <div className="grow-1 py-8">
        <div className="mb-4">
          <div>
            <p className="font-della-respira text-2xl font-semibold">{getGreetings()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
