import { activeGameApi } from "@/utils/activeGameApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const activeGamesResponse = await activeGameApi.getAllActiveGames();

  return NextResponse.json(activeGamesResponse, {
    headers: {
      'Cache-Control': 'public, s-maxage=0',
      'CDN-Cache-Control': 'public, s-maxage=0',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=0',
    }
  });
}