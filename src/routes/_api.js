export async function GET() {
  if (process.browser) {
    const req = await fetch("api/get");
    return req;
  }
}

export async function POST(objData) {
  if (process.browser) {
    const req = await fetch("api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objData),
    });

    return req;
  }
}

export async function PUT(objData) {
  if (process.browser) {
    const req = await fetch("api/put", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objData),
    });

    return req;
  }
}

export async function DELETE(objData) {
  if (process.browser) {
    const req = await fetch("api/del", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objData),
    });

    return req;
  }
}

export async function PRINT(objData) {
  if (process.browser) {
    const req = await fetch("api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objData),
    });

    return req;
  }
}
