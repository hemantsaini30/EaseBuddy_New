import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import DoubtSolver from "./DoubtSolver";

/**
 * Main app layout: Navbar (top) + Sidebar (left) + Content (right)
 * Wraps all authenticated pages.
 *
 * Usage:
 *   <Layout activeSubject="science" chapters={chapterList}>
 *     <YourPageContent />
 *   </Layout>
 */
const Layout = ({ children, activeSubject = null, chapters = [],chapterTitle = null,subject = null,}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSubject={activeSubject}
        chapters={chapters}
      />
      {/* Offset for fixed navbar + sidebar */}
      <main className="pt-16 md:pl-64">
        <div className="min-h-[calc(100vh-4rem)] p-4 md:p-8">{children}</div>
        <Footer />
      </main>

      <DoubtSolver chapterTitle={chapterTitle} subject={subject} />
    </div>
  );
};

export default Layout;
