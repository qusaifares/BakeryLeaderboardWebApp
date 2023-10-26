import { leaderboardApi } from "@/utils/leaderboardApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const leaderboard = await leaderboardApi.getLeaderboard();
  return Response.json(leaderboard);
}