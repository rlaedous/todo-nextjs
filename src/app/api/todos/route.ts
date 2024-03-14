export async function GET() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos`);
  const todos = await response.json();
  if (!todos) {
    return new Response("todos not found", { status: 404 });
  }

  return Response.json({ todos });
}

export async function POST(request: Request) {
  const { title, contents } = await request.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, contents, isDone: false }),
  });
  const todo = await response.json();
  return Response.json({ todo });
}
