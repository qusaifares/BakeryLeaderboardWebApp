import { clientSideLeaderboardApi } from "@/utils/leaderboardApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const leaderboard = await clientSideLeaderboardApi.getLeaderboard();
  return Response.json(leaderboard, {
    headers: {
      'Cache-Control': 'public, max-age=0',
      'CDN-Cache-Control': 'public, max-age=0',
      'Vercel-CDN-Cache-Control': 'public, max-age=0',
    }
  });
}