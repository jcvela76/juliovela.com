import { expect, test, type Page } from "@playwright/test";

async function expectNoConsoleErrors(page: Page, action: () => Promise<void>) {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await action();

  expect(consoleErrors).toEqual([]);
}

test.describe("public smoke routes", () => {
  test("home loads the Julio Vela brand without console errors", async ({ page }) => {
    await expectNoConsoleErrors(page, async () => {
      await page.goto("/");
      await expect(page).toHaveTitle(/Julio Vela Tech Solutions/);
      await expect(page.getByText("JULIO VELA").first()).toBeVisible();
      await expect(page.getByText("TECH SOLUTIONS").first()).toBeVisible();
    });
  });

  test("blog index loads the public blog shell", async ({ page }) => {
    await expectNoConsoleErrors(page, async () => {
      await page.goto("/blog");
      await expect(page).toHaveTitle(/Blog | Julio Vela Tech Solutions/);
      await expect(page.getByRole("heading", { name: "Practical technology notes." })).toBeVisible();
    });
  });

  test("robots.txt is available and blocks draft previews", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBe(true);

    const body = await response.text();
    expect(body).toContain("User-Agent: *");
    expect(body).toContain("Disallow: /drafts-preview");
    expect(body).toContain("Sitemap: https://juliovela.com/sitemap.xml");
  });

  test("sitemap.xml is available with canonical public routes", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBe(true);

    const body = await response.text();
    expect(body).toContain("<urlset");
    expect(body).toContain("<loc>https://juliovela.com/</loc>");
    expect(body).toContain("<loc>https://juliovela.com/blog</loc>");
    expect(body).not.toContain("drafts-preview");
  });
});
