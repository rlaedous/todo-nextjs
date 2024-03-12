export async function GET(request: Request) {
  const response = await fetch(`http://localhost:4000/todos`);
  const todos = await response.json();

  if (!todos) {
    return new Response("todos not found", { status: 404 });
  }

  return Response.json({ todos });
}

export async function POST(request: Request) {
  const { title, contents } = await request.json();

  const response = await fetch(`http://localhost:4000/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, contents, isDone: false }),
  });
  const todo = await response.json();

  return Response.json({ todo });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const response = await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE",
  });

  if (response.status === 204) {
    return new Response(null, { status: 204 });
  } else {
    return new Response("Todo not found", { status: 404 });
  }
}
