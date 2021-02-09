
export async function GET() {
    if (process.browser) {
        const req = await fetch("api/get");
    }
};

export async function POST(objData) {
    console.log(objData);

    if (process.browser) {
        const req = await fetch("api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objData),
        });
    }
};

export async function PUT(objData) {
    const req = await fetch("api/put", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objData),
    });
};

export async function DELETE(objData) {
    const req = await fetch("api/del", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objData),
    });
};
