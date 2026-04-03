import { useState } from "react";
import Layout from "../components/common/Layout";
import SubjectCard from "../components/dashboard/SubjectCard";
import Streak from "../components/dashboard/Streak";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../hooks/useProgress";
import { SUBJECTS, MOTIVATIONAL_TIPS } from "../utils/constants";
import { getRandomTip } from "../utils/helpers";

const Dashboard = () => {
  const { user } = useAuth();
  const { getSubjectStats } = useProgress();
  const [tip] = useState(() => getRandomTip(MOTIVATIONAL_TIPS));

  return (
    <Layout>
      {/* Welcome header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Class {user?.classLevel} · CBSE · Let's make today count.
        </p>
      </div>

      {/* Streak + Tip */}
      <div className="mb-8">
        <Streak streak={user?.streak || 0} tip={tip} />
      </div>

      {/* Subject cards */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Your Subjects</h2>
        <span className="text-sm text-gray-400">Class {user?.classLevel} CBSE</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SUBJECTS.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} stats={getSubjectStats(subject.label)} />
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
