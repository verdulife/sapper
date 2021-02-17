/* export async function POST(URI, objData) {
  if (process.browser) {
    const req = await this.fetch(`/${URI}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objData),
    });

    return req;
  }
}

export async function PUT(URI, ref, objData) {
  const req = await this.fetch(`/${URI}/${ref}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objData),
  });

  return req;
}

export async function DELETE(URI, ref) {
  const req = await this.fetch(`/${URI}/${ref}`, {
    method: "DELETE",
  });

  return req;
}
 */