import type { FC } from "react";

import DashboardLayout from "./components/dashboard/dashboard-layout";

const App: FC = () => {
  return (
    <>
      <DashboardLayout>
        <p>Home Page</p>
      </DashboardLayout>
    </>
  );
};

export default App;
