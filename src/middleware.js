import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'

export function middleware(request) {
console.log("middleware executed");
const path=request.nextUrl.pathname;

const publicpath=path==='/login'||path==='/signup'


// console.log(request.cookies.get('login_token').value);
const token=request.cookies.get('login_token')?.value;
console.log(token);


if(publicpath && token)  //undefine //1235
{
    return NextResponse .redirect(new URL("/Add-task", request.nextUrl))    
}
if(!publicpath&&!token){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
}

}
 
export const config = {
  matcher: ['/Add-task/:path*', '/about/:path*','/profile/:path*','/show-task/:path*','/login','/signup'],
}