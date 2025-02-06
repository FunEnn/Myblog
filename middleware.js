export default function middleware(request) {
  // 简单的中间件，只处理基本路由
  return Response.next()
}

export const config = {
  matcher: [
    // 只匹配需要的路径
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 