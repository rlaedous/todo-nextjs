export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log("params", params);
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos/${id}`, {
    method: "DELETE",
  });

  return new Response(null, { status: 200 });
}

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  const { id } = params;
  console.log("params", params);
  const { isDone } = await request.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/todos/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone }),
    }
  );
  const updatedTodo = await response.json();

  return new Response(JSON.stringify(updatedTodo), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
