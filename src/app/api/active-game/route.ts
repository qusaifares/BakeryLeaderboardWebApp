import { activeGameApi } from "@/utils/activeGameApi";
import { NextRequest, NextResponse } from "next/server";
import { ActiveGamesResponse } from "../../../../resources/BakeryLeaderboardServiceModel/output/model/typescript/active-game";

export async function GET(request: NextRequest) {
  // const activeGamesResponse = await activeGameApi.getAllActiveGames();

  const activeGamesResponse: ActiveGamesResponse = { activeGames: [], timestamp: Date.now() }
  return Response.json(activeGamesResponse, {
    headers: {
      'Cache-Control': 'no-cache',
      'CDN-Cache-Control': 'no-cache',
      'Vercel-CDN-Cache-Control': 'no-cache',
    }
  });
}