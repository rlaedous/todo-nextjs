export async function GET() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
  const todos = await response.json();
  if (!todos) {
    return new Response("todos not found", { status: 404 });
  }

  return Response.json({ todos });
}

export async function POST(request: Request) {
  const { title, contents } = await request.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
    {
      method: "DELETE",
    }
  );

  if (response.status === 204) {
    return new Response(null, { status: 204 });
  } else {
    return new Response("Todo not found", { status: 404 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, isDone } = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone: !isDone }),
      }
    );

    if (response.status === 200) {
      const updatedTodo = await response.json();
      return new Response(JSON.stringify(updatedTodo), { status: 200 });
    } else {
      return new Response("Todo not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
