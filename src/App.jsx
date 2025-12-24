import React, { useState, useEffect } from 'react';
// Build Timestamp: 2025-12-24T19:15:00 // Force Rebuild
import ProfileGate from './components/ProfileGate';
import NetflixNavbar from './components/NetflixNavbar';
import HeroBanner from './components/HeroBanner';
import ContentRow from './components/ContentRow';
import DetailModal from './components/DetailModal';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/ui/PageTransition';
import Contact from './components/Contact';
import ErrorBoundary from './components/ErrorBoundary';
import SkillsView from './components/sections/SkillsView';
import ExperienceView from './components/sections/ExperienceView';
import EducationView from './components/sections/EducationView';
import LiquidBackground from './components/ui/LiquidBackground';
import CustomCursor from './components/ui/CustomCursor';

// --- DATA IMPORT ---
import { skills, experience, education, contactInfo } from './data/resumeData';

import VideoPlayer from './components/ui/VideoPlayer';

// --- VIDEO DATA ---

// ... (other video arrays) ...

const bengalFamineVideos = [
  { file: "Bengal Femine 3.mp4", folder: "Bihar", type: 'video' },
  { file: "Bengal famine 1.mp4", folder: "Bihar", type: 'video' },
  { file: "Bengal famine 2.mp4", folder: "Bihar", type: 'video' },
  { file: "Bengal famine 4.mp4", folder: "Bihar", type: 'video' },
  { file: "Bengal winning.mp4", folder: "Bihar", type: 'video' }
];

const ancientBiharVideos = [
  { file: "Nalanda Study 2_1.mp4", folder: "Bihar", type: 'video' },
  { file: "Nalanda Studying.mp4", folder: "Bihar", type: 'video' },
  { file: "Raj Darbar.mp4", folder: "Bihar", type: 'video' },
  { file: "Raj mahal scene.mp4", folder: "Bihar", type: 'video' },
  { file: "Megasthanise_1.mp4", folder: "Bihar", type: 'video' },
  { file: "sushruta.mp4", folder: "Bihar", type: 'video' },
  { file: "Sahitya.mp4", folder: "Bihar", type: 'video' },
  { file: "Kala.mp4", folder: "Bihar", type: 'video' },
  { file: "Kala 1.mp4", folder: "Bihar", type: 'video' },
  { file: "Kala 02.mp4", folder: "Bihar", type: 'video' },
  { file: "Ganga nadi.mp4", folder: "Bihar", type: 'video' },
  { file: "Mahal 2.mp4", folder: "Bihar", type: 'video' }
];


const britishRajVideos = [
  { file: "Angrej ka pehla scene.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej 10.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej 11.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej 13.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej 14.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej 16.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej 2.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej 4.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej 5.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej 6.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej 7.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej 8.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej 9.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2 Angrej.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 2.mp4", folder: "Bihar", type: 'video' }
];

const russianRevVideos = [
  { file: "Lenin 1.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Lenin 2.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Lenin and Trotsky Andolan.mp4", folder: "Lenin Video", type: 'video' },
  { file: "lenin and trotsky.mp4", folder: "Lenin Video", type: 'video' },
  { file: "lenin and trotsky 3.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Lenini And Trotsky 2.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Trotsky 1.mp4", folder: "Lenin Video", type: 'video' },
  { file: "communism.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Communism 2.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Tsar 4.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Tsar Palace.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Monster Meeting.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Perceval killed.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Russia 1815.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Russia 1815 (2).mp4", folder: "Lenin Video", type: 'video' },
  { file: "Russia 1815(1).mp4", folder: "Lenin Video", type: 'video' }
];

const financeWarVideos = [
  { file: "1st Bank of US.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Rothschild Family.mp4", folder: "Lenin Video", type: 'video' },
  { file: "America and Britain War.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Richness.mp4", folder: "Lenin Video", type: 'video' },
  { file: "Gemini_Generated_Image_5z27115z27115z27.mp4", folder: "Lenin Video", type: 'video' }
];

const mapsMotionVideos = [
  { file: "Bihar Linked Comp 06_1.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 1 Linked Comp 01_2.mp4", folder: "Bihar", type: 'video' },
  { file: "Bihar Scene 1 Linked Comp 03.mp4", folder: "Bihar", type: 'video' }
];

const socialImpactVideos = [
  { file: "Slum.mp4", folder: "Slum", type: 'video' }
];


const App = () => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Home");
  const [myList, setMyList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  // New State for Videos
  const [videoData, setVideoData] = useState({
    bengalFamine: bengalFamineVideos,
    ancientBihar: ancientBiharVideos,
    britishRaj: britishRajVideos,
    russianRev: russianRevVideos,
    financeWar: financeWarVideos,
    mapsMotion: mapsMotionVideos,
    socialImpact: socialImpactVideos
  });

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();

        // Group by category if needed, assuming backend returns flat list with 'category' field
        if (data && data.length > 0) {
          // Mapping categories from backend to frontend state keys
          const newVideoData = {
            bengalFamine: data.filter(v => v.category === 'Trending Now'),
            ancientBihar: data.filter(v => v.category === 'Ancient Heritage'),
            britishRaj: data.filter(v => v.category === 'The British Raj Limited Series'),
            russianRev: data.filter(v => v.category === 'Revolutionary History'),
            financeWar: data.filter(v => v.category === 'Economics & War'),
            mapsMotion: data.filter(v => v.category === 'Maps & Graphics'),
            socialImpact: data.filter(v => v.category === 'Social Documentaries')
          };
          setVideoData(newVideoData);
        }
      } catch (err) {
        console.log("Using local fallback data (Backend offline or DB empty)");
        // Fallback is already set in initial state
      }
    };

    fetchVideos();
  }, []);


  const toggleList = (video) => {
    setMyList((prev) => {
      const isExists = prev.find(v => v.file === video.file);
      if (isExists) return prev.filter(v => v.file !== video.file);
      return [...prev, video];
    });
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeDetailModal = () => {
    setSelectedItem(null);
  };

  // Filter Logic
  const showHome = activeCategory === "Home";

  const showSkills = activeCategory === "Skills";
  const showExperience = activeCategory === "Experience";
  const showEducation = activeCategory === "Education";
  const showContact = activeCategory === "Contact";

  // Video Categories
  const showVideos = showHome;

  return (
    <ErrorBoundary>
      <div className="bg-[#141414] min-h-screen text-white overflow-x-hidden overflow-y-scroll font-sans">
        <CustomCursor />
        {!currentProfile ? (
          <ProfileGate onSelectProfile={setCurrentProfile} />
        ) : (
          <>
            <NetflixNavbar
              profile={currentProfile}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              onLogout={() => setCurrentProfile(null)}
            />

            {showHome && <HeroBanner />}

            <div className={`relative z-20 pb-20 pl-4 md:pl-12 ${showHome ? '-mt-12 md:-mt-28' : 'mt-24'}`}>

              <AnimatePresence mode="wait">
                {/* --- VIDEO PROJECTS (Home Feed) --- */}
                {(showVideos) && (
                  <PageTransition key="home-videos">
                    <ContentRow title="Trending Now" videos={videoData.bengalFamine} myList={myList} onToggleList={toggleList} onItemClick={handleItemClick} />
                    <ContentRow title="Ancient Heritage" videos={videoData.ancientBihar} myList={myList} onToggleList={toggleList} onItemClick={handleItemClick} />
                    <ContentRow title="The British Raj Limited Series" videos={videoData.britishRaj} myList={myList} onToggleList={toggleList} onItemClick={handleItemClick} />
                    <ContentRow title="Revolutionary History" videos={videoData.russianRev} myList={myList} onToggleList={toggleList} onItemClick={handleItemClick} />
                    <ContentRow title="Economics & War" videos={videoData.financeWar} myList={myList} onToggleList={toggleList} onItemClick={handleItemClick} />
                    <ContentRow title="Maps & Graphics" videos={videoData.mapsMotion} myList={myList} onToggleList={toggleList} onItemClick={handleItemClick} />
                    <ContentRow title="Social Documentaries" videos={videoData.socialImpact} myList={myList} onToggleList={toggleList} onItemClick={handleItemClick} />
                  </PageTransition>
                )}

                {/* --- RESUME SECTIONS (Dedicated Pages) --- */}
                {showSkills && (
                  <PageTransition key="skills">
                    <SkillsView skills={skills} />
                  </PageTransition>
                )}

                {showExperience && (
                  <PageTransition key="experience">
                    <ExperienceView experience={experience} onItemClick={handleItemClick} />
                  </PageTransition>
                )}

                {showEducation && (
                  <PageTransition key="education">
                    <EducationView education={education} onItemClick={handleItemClick} />
                  </PageTransition>
                )}

                {showContact && (
                  <PageTransition key="contact">
                    <div className="pr-4 md:pr-12">
                      <Contact />
                    </div>
                  </PageTransition>
                )}
              </AnimatePresence>

              {/* Footer */}
              <div className="mt-20 text-gray-500 text-sm text-center pb-8 border-t border-gray-800 pt-8 mr-4 md:mr-12">
                <p>Designed by Adarsh Kumar</p>
                <p className="mt-2 text-xs">Portfolio Demonstration</p>
              </div>
            </div>

            {/* Modal for Details */}
            <DetailModal
              item={selectedItem}
              onClose={closeDetailModal}
              onPlay={(video) => setPlayingVideo(video)}
              onToggleList={toggleList}
              isAdded={selectedItem && myList.some(v => v.file === selectedItem.file)}
            />

            {/* Full Screen Video Player Overlay */}
            <AnimatePresence>
              {playingVideo && (
                <VideoPlayer
                  video={playingVideo}
                  onClose={() => setPlayingVideo(null)}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
