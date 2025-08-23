"use client"

import { useState } from "react"
import { NewsFeed } from "@/components/news-feed"
import { FootballSection } from "@/components/football-section"
import { StreamingSection } from "@/components/streaming-section"

export function ApiIntegrations() {
  const [activeTab, setActiveTab] = useState<"noticias" | "futebol" | "streaming">("noticias")

  return (
    <div className="relative z-10 px-4 md:px-16 py-8 md:py-16 max-w-[1920px] mx-auto">
      <h2 className="text-white text-lg md:text-xl font-normal mb-8 md:mb-12 text-center">Integrações com API's</h2>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#151313] border border-[#262A2C] rounded-[15px] p-1 flex gap-1">
          <button
            onClick={() => setActiveTab("noticias")}
            className={`px-6 py-2 rounded-[12px] text-sm font-medium transition-all ${
              activeTab === "noticias" ? "bg-[#262A2C] text-white" : "text-gray-400 hover:text-white hover:bg-[#1a1818]"
            }`}
          >
            Notícias
          </button>
          {/* <button
            onClick={() => setActiveTab("futebol")}
            className={`px-6 py-2 rounded-[12px] text-sm font-medium transition-all ${
              activeTab === "futebol" ? "bg-[#262A2C] text-white" : "text-gray-400 hover:text-white hover:bg-[#1a1818]"
            }`}
          >
         
         Futebol
          </button> */}
          {/* <button
            onClick={() => setActiveTab("streaming")}
            className={`px-6 py-2 rounded-[12px] text-sm font-medium transition-all ${
              activeTab === "streaming"
                ? "bg-[#262A2C] text-white"
                : "text-gray-400 hover:text-white hover:bg-[#1a1818]"
            }`}
          >
            Streaming
          </button> */}
        </div>
      </div>

      {/* Content */}
      <div className="transition-all duration-300">
        {activeTab === "noticias" && <NewsFeed />}
        {/* {activeTab === "futebol" && <FootballSection maxRounds={2} />}
        {activeTab === "streaming" && <StreamingSection />}
      </div> */}
    </div>
    </div>
  )
}
