// Layout.tsx

import React from 'react';
import FollowBar from "@/components/layout/FollowBar"
import Sidebar from "@/components/layout/Sidebar"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Assuming you have the userId available in your layout
  const userId = "exampleUserId"; // Replace with the actual userId

  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div 
            className="
              col-span-3 
              lg:col-span-2 
              border-x-[1px] 
              border-neutral-800
          ">
            {children}
          </div>
          <FollowBar userId={userId} /> {/* Pass the userId to FollowBar */}
        </div>
     </div>
    </div>
  )
}

export default Layout;