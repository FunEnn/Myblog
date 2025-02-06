export default function middleware(request) {
  return new Response(null, {
    status: 200,
    headers: new Headers({
      'x-middleware-next': '1'
    })
  })
} 