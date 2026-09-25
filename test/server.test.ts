import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import type { Express } from "express";

let server: Server | undefined;
let baseUrl = "";

before(async () => {
  let application: Express | undefined;

  try {
    const module = (await import("../src/index.js")) as { app?: Express };
    application = module.app;
  } catch {
    // The first test run intentionally happens before src/index.ts exists.
  }

  if (!application) {
    return;
  }

  server = application.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server?.once("listening", resolve));

  const address = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (!server) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    server?.close((error) => (error ? reject(error) : resolve()));
  });
});

function applicationUrl(): string {
  assert.notEqual(
    baseUrl,
    "",
    "expected src/index.ts to export an Express application",
  );

  return baseUrl;
}

async function postPlant(body: unknown): Promise<Response> {
  return fetch(`${applicationUrl()}/plants/validate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function expectValidationFailure(body: unknown): Promise<void> {
  const response = await postPlant(body);
  const payload = (await response.json()) as {
    message?: string;
    issues?: unknown[];
  };

  assert.equal(response.status, 400);
  assert.equal(payload.message, "Invalid request body");
  assert.ok(Array.isArray(payload.issues));
  assert.ok(payload.issues.length > 0);
}

test("health endpoint reports that the server is ready", async () => {
  const response = await fetch(`${applicationUrl()}/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("valid plant data is accepted and unknown properties are removed", async () => {
  const response = await postPlant({
    name: "Monstera",
    price: 25,
    ignored: true,
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    message: "Valid plant data",
    data: { name: "Monstera", price: 25 },
  });
});

test("an empty request body is rejected", async () => {
  await expectValidationFailure({});
});

test("a numeric string price is rejected instead of coerced", async () => {
  await expectValidationFailure({ name: "Monstera", price: "12" });
});

test("a whitespace-only name is rejected", async () => {
  await expectValidationFailure({ name: "   ", price: 12 });
});

test("a negative price is rejected", async () => {
  await expectValidationFailure({ name: "Monstera", price: -1 });
});
