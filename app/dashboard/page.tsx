import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  // Get current user
  const user = await currentUser()
  
  // Extra protection
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐢</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
              WealthWise
            </h1>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-semibold text-gray-900">{user.firstName || 'Friend'}!</p>
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-12 h-12"
                }
              }}
            />
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Your Financial Journey 🌳
          </h2>
          <p className="text-lg text-gray-600">
            Track your progress, complete challenges, and grow your wealth tree!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* XP Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-green-500 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">⚡</span>
              <span className="text-xs font-semibold text-gray-500 uppercase">XP</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">1,240</div>
            <div className="text-sm text-gray-600">Total Experience</div>
          </div>

          {/* Level Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-yellow-500 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🏆</span>
              <span className="text-xs font-semibold text-gray-500 uppercase">Level</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">Level 7</div>
            <div className="text-sm text-gray-600">Bronze Saver</div>
          </div>

          {/* Badges Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-purple-500 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🎖️</span>
              <span className="text-xs font-semibold text-gray-500 uppercase">Badges</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>

          {/* Streak Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-orange-500 transition-all hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">🔥</span>
              <span className="text-xs font-semibold text-gray-500 uppercase">Streak</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">5 Days</div>
            <div className="text-sm text-gray-600">Keep it up!</div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Money Tree Section */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-3xl">🌳</span>
              Your Wealth Tree
            </h3>
            
            {/* Tree Visualization Area */}
            <div className="bg-gradient-to-b from-sky-100 to-green-100 rounded-xl h-80 flex items-center justify-center relative overflow-hidden">
              {/* Placeholder tree */}
              <div className="text-center">
                <div className="text-8xl mb-4 animate-bounce">🌳</div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-3 inline-block">
                  <p className="text-lg font-semibold text-gray-900">Growing Strong!</p>
                  <p className="text-sm text-gray-600">Level 7 Tree</p>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-600">Growth Progress</span>
                    <span className="text-xs font-bold text-green-600">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-600 to-yellow-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Challenges Section */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                Active Challenges
              </h3>
              <button className="text-sm font-semibold text-green-600 hover:text-green-700">
                View All →
              </button>
            </div>

            {/* Challenge List */}
            <div className="space-y-4">
              {/* Challenge 1 */}
              <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-green-500 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Save $100</h4>
                      <p className="text-sm text-gray-600">Monthly Goal</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>$67 saved</span>
                  <span>13 days left</span>
                </div>
              </div>

              {/* Challenge 2 */}
              <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-yellow-500 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Complete 5 Lessons</h4>
                      <p className="text-sm text-gray-600">Weekly Goal</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                    In Progress
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>2 of 5 complete</span>
                  <span>4 days left</span>
                </div>
              </div>

              {/* Challenge 3 */}
              <div className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-500 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎮</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Investment Simulator</h4>
                      <p className="text-sm text-gray-600">Learning Track</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    New
                  </span>
                </div>
                <button className="w-full bg-gradient-to-r from-green-600 to-yellow-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all">
                  Start Challenge
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-yellow-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready for more? 🚀</h3>
              <p className="text-green-50">Explore new challenges and grow your financial skills!</p>
            </div>
            <button className="bg-white text-green-600 font-bold px-8 py-3 rounded-full hover:shadow-xl transition-all">
              Browse Challenges
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}


