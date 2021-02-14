export async function GET() {
  if (process.browser) {
    const req = await fetch("api/");
    return req;
  }
}

export async function GETONE(id) {
  if (process.browser) {
    const req = await fetch(`api/${id}`);
    return req;
  }
}

export async function POST(objData) {
  if (process.browser) {
    const req = await fetch("api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objData),
    });

    return req;
  }
}

export async function PUT(objData, id) {
  if (process.browser) {
    const req = await fetch(`api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objData),
    });

    return req;
  }
}

export async function DELETE(id) {
  if (process.browser) {
    const req = await fetch(`api/${id}`, {
      method: "DELETE",
    });

    return req;
  }
}

export async function PRINT(objData) {
  if (process.browser) {
    const req = await fetch("api/print", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objData),
    });

    return req;
  }
}
