import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const response = NextResponse.json({ message: 'Cookie deleted' });

  // Delete the cookie by setting its expiration date in the past
  response.cookies.delete('login_token', '', { expiresIN: new Date(0) });

  return response;
}