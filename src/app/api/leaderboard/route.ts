import { clientSideLeaderboardApi } from "@/utils/leaderboardApi";
import { NextRequest, NextResponse } from "next/server";

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
