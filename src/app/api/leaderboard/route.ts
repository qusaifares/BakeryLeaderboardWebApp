import { clientSideLeaderboardApi } from "@/utils/leaderboardApi";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = 'force-no-store'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 20

export async function GET() {
  const leaderboard = await clientSideLeaderboardApi.getLeaderboard();
  return NextResponse.json(leaderboard, {
    headers: {
      'Cache-Control': 'no-cache',
      'CDN-Cache-Control': 'no-cache',
      'Vercel-CDN-Cache-Control': 'no-cache',
    }
  });
}
