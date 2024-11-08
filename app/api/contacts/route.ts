import { NextResponse } from "next/server";

/**
 * API Endpoint: GET /api/contacts
 * Access this API from a remote source using:
 * fetch('https://your-domain.com/api/contacts')
 * or during local development:
 * fetch('http://localhost:3000/api/contacts')
 */
export async function GET() {
  return NextResponse.json({ message: "Hello World" });
}
