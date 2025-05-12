import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {

  const {authUser, updateProfile} = useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName) 
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!selectedImg) {
      await updateProfile({fullName: name, bio});
      navigate('/');
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({profilePic: base64Image, fullName: name, bio});
      navigate('/');
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center p-4'>
      <div className='w-full max-w-3xl backdrop-blur-xl bg-black/20 text-gray-300 border border-gray-600/50 rounded-2xl overflow-hidden flex flex-col md:flex-row items-center'>
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 p-8 flex-1">
          <h3 className="text-xl font-medium text-white mb-4">Profile details</h3>
          
          <div className="flex flex-col items-center gap-3">
            <label htmlFor="avatar" className='flex flex-col items-center gap-2 cursor-pointer group'>
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-600/50 transition-colors">
                <img 
                  src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
                  alt="" 
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm text-white">Change Photo</span>
                </div>
              </div>
              <span className="text-sm text-gray-400">upload profile image</span>
              <input 
                onChange={(e)=>setSelectedImg(e.target.files[0])} 
                type="file" 
                id='avatar' 
                accept='.png, .jpg, .jpeg' 
                hidden 
              />
            </label>
          </div>

          <div className="w-full space-y-4">
            <input 
              onChange={(e)=>setName(e.target.value)} 
              value={name} 
              type="text" 
              required 
              placeholder='Your name' 
              className='w-full p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all'
            />
            <textarea 
              onChange={(e)=>setBio(e.target.value)} 
              value={bio} 
              rows={3} 
              placeholder='Bio' 
              className='w-full p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none'
            />
          </div>

          <button 
            type="submit" 
            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
        </form>

        {/* Logo Section */}
        <div className="flex items-center justify-center p-8">
          <img className={`w-32 h-32 rounded-full ${selectedImg && 'rounded-full'}`} src={authUser?.profilePic || assets.logo_icon} alt="Logo" />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage