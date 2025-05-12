import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {

    const {selectedUser} = useContext(ChatContext) 

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-[url('../assets/bgImage.jpeg')] bg-cover bg-no-repeat p-2 sm:p-0">
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 ${selectedUser ? 'md:rounded-2xl' : 'md:rounded-2xl'} rounded-none overflow-hidden h-[80vh] w-full max-w-5xl max-h-[700px] grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'} sm:w-[90vw] sm:h-[80vh] max-sm:h-[90vh] max-sm:w-full`}
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  )
}


export default HomePage