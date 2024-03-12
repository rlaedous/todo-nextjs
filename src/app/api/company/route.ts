export async function GET(request: Request) {
  const response = await fetch(`http://localhost:4000/companyInfo`);
  const companyInfo = await response.json();

  if (!companyInfo) {
    return new Response("companyInfo not found", { status: 404 });
  }

  return Response.json({ companyInfo });
}

export async function POST(request: Request) {
  const { title, contents } = await request.json();

  const response = await fetch(`http://localhost:4000/companyInfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, contents, isDone: false }),
  });
  const todo = await response.json();

  return Response.json({ todo });
}
