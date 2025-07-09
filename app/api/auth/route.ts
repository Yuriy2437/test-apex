// import { NextRequest, NextResponse } from 'next/server';
// import { credentials } from '@/lib/credentials';

// export async function POST(req: NextRequest) {
//   const { login, password } = await req.json();
//   const found = credentials.find(
//     (c) => c.login === login && c.password === password
//   );
//   if (found) {
//     return NextResponse.json({ success: true, company: found.company });
//   }
//   return NextResponse.json({ success: false });
// }
