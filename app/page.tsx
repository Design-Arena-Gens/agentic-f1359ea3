'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface Profile {
  id: number
  name: string
  age: number
  location: string
  bio: string
  image: string
}

const initialProfiles: Profile[] = [
  {
    id: 1,
    name: "Emma",
    age: 26,
    location: "San Francisco, CA",
    bio: "Coffee enthusiast ☕ | Travel junkie ✈️ | Dog mom 🐕",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop"
  },
  {
    id: 2,
    name: "Olivia",
    age: 24,
    location: "Los Angeles, CA",
    bio: "Yoga instructor 🧘‍♀️ | Plant-based 🌱 | Beach lover 🏖️",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop"
  },
  {
    id: 3,
    name: "Sophia",
    age: 28,
    location: "New York, NY",
    bio: "Artist 🎨 | Foodie 🍕 | Museum hopper 🖼️",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop"
  },
  {
    id: 4,
    name: "Ava",
    age: 25,
    location: "Miami, FL",
    bio: "Fitness coach 💪 | Sunrise chaser 🌅 | Adventure seeker 🏃‍♀️",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop"
  },
  {
    id: 5,
    name: "Isabella",
    age: 27,
    location: "Seattle, WA",
    bio: "Software engineer 💻 | Gamer 🎮 | Sushi lover 🍣",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop"
  },
  {
    id: 6,
    name: "Mia",
    age: 23,
    location: "Austin, TX",
    bio: "Music lover 🎵 | Festival goer 🎪 | Taco enthusiast 🌮",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop"
  },
  {
    id: 7,
    name: "Charlotte",
    age: 29,
    location: "Chicago, IL",
    bio: "Bookworm 📚 | Wine connoisseur 🍷 | Architecture nerd 🏛️",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop"
  },
  {
    id: 8,
    name: "Amelia",
    age: 26,
    location: "Denver, CO",
    bio: "Mountain climber 🏔️ | Photographer 📸 | Nature lover 🌲",
    image: "https://images.unsplash.com/photo-1502767089025-6572583495f9?w=400&h=500&fit=crop"
  }
]

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likeIndicator, setLikeIndicator] = useState<'like' | 'nope' | null>(null)

  const currentProfile = profiles[currentIndex]

  const handleSwipe = (direction: 'left' | 'right') => {
    setLikeIndicator(direction === 'right' ? 'like' : 'nope')

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setLikeIndicator(null)
    }, 300)
  }

  const handleLike = () => handleSwipe('right')
  const handleNope = () => handleSwipe('left')

  if (currentIndex >= profiles.length) {
    return (
      <div className="container">
        <div className="header">
          <div className="logo">🔥 Swipe</div>
          <div className="header-icons">
            <button className="icon-btn">💬</button>
            <button className="icon-btn">👤</button>
          </div>
        </div>
        <div className="no-more-cards">
          <h2>That&apos;s Everyone!</h2>
          <p>Check back later for new profiles</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <div className="logo">🔥 Swipe</div>
        <div className="header-icons">
          <button className="icon-btn">💬</button>
          <button className="icon-btn">👤</button>
        </div>
      </div>

      <div className="card-container">
        <SwipeCard
          profile={currentProfile}
          onSwipe={handleSwipe}
          likeIndicator={likeIndicator}
        />
      </div>

      <div className="actions">
        <button className="action-btn nope" onClick={handleNope}>
          ✕
        </button>
        <button className="action-btn star">
          ⭐
        </button>
        <button className="action-btn like" onClick={handleLike}>
          ♥
        </button>
      </div>
    </div>
  )
}

function SwipeCard({
  profile,
  onSwipe,
  likeIndicator
}: {
  profile: Profile
  onSwipe: (direction: 'left' | 'right') => void
  likeIndicator: 'like' | 'nope' | null
}) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipe('right')
    } else if (info.offset.x < -100) {
      onSwipe('left')
    }
  }

  return (
    <>
      {likeIndicator && (
        <div className={`swipe-indicator ${likeIndicator} visible`}>
          {likeIndicator === 'like' ? 'LIKE' : 'NOPE'}
        </div>
      )}
      <motion.div
        className="card"
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={profile.image}
          alt={profile.name}
          className="card-image"
        />
        <div className="card-info">
          <div className="card-name">
            {profile.name}, {profile.age}
          </div>
          <div className="card-details">
            📍 {profile.location}
          </div>
          <div className="card-bio">
            {profile.bio}
          </div>
        </div>
      </motion.div>
    </>
  )
}
