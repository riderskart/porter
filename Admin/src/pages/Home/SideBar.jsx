import React from "react";
import { initialSections } from "../../Constants/Home.constant";

const SideBar = () => {
  return (
    <div>
      <aside className="w-1/4 bg-decent-white text-white p-6 shadow-lg shadow-neutral-300 drop-shadow-sm">
        <h2 className="text-2xl mb-8 text-black font-bold">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            {Object.keys(initialSections).map((section) => (
              <li key={section}>
                <button
                  onClick={() => setSelectedSection(section)}
                  className={`w-full text-left py-2 px-4 rounded ${
                    selectedSection === section
                      ? "bg-dark-blue"
                      : "bg-gray-700 hover:bg-dark-blue"
                  }`}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;
