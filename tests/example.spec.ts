import { test, expect } from '@playwright/test';

let taskName;

test("user logs in with valid credentials", async ({ page }) => {
  await page.goto("/");
  await page.getByRole('textbox', { name: 'Email' }).fill('iffat.ahmedk@gmail.com');
  await page.getByRole('textbox', { name: 'Password'}).fill('sajna!jaag');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.getByRole('heading', { name: 'Today' }).waitFor({ timeout: 50000 });
  await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible();
});

test('Create a new todo', async ({ page }) => {
  taskName = `Create: ${(new Date()).toISOString()}`;

  await page.goto("/");
  await page.getByRole('textbox', { name: 'Email' }).fill('iffat.ahmedk@gmail.com');
  await page.getByRole('textbox', { name: 'Password'}).fill('sajna!jaag');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.getByRole('heading', { name: 'Today' }).waitFor({ timeout: 50000 });
  await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible();

  await page.getByTestId('app-sidebar-container').getByRole('button', { name: 'Add task' }).click();
  await page.getByRole('textbox', { name: 'Task name' }).getByRole('paragraph').fill(taskName);
  await page.getByTestId('task-editor-submit-button').click();
  await expect(page.getByRole('button', { name: 'Task:  ' + taskName })).toBeVisible();
});

test('Edit an existing todo', async ({ page }) => {
  taskName = `Edit: ${(new Date()).toISOString()}`;

  await page.goto("/");
  await page.getByRole('textbox', { name: 'Email' }).fill('iffat.ahmedk@gmail.com');
  await page.getByRole('textbox', { name: 'Password'}).fill('sajna!jaag');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.getByRole('heading', { name: 'Today' }).waitFor({ timeout: 50000 });
  await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible();

  await page.getByTestId('app-sidebar-container').getByRole('button', { name: 'Add task' }).click();
  await page.getByRole('textbox', { name: 'Task name' }).getByRole('paragraph').fill(taskName);
  await page.getByTestId('task-editor-submit-button').click();

  const taskTimestamp = page.locator('.task_content', {
    hasText: taskName,
  });

  await taskTimestamp.click();
  await page.getByRole('button', { name: 'Task name' }).click();
  await page.getByTestId('task-editor').getByText(taskName).fill('Task Edited: ' + taskName);
  await page.getByTestId('task-editor-submit-button').click();
  await page.getByRole('button', { name: 'Close task' }).click();

  await expect(page.getByRole('button', { name: 'Task:  Task Edited: ' + taskName })).toBeVisible();
});

test('Delete an existing todo', async ({ page }) => {
  taskName = `Delete: ${(new Date()).toISOString()}`;

  await page.goto("/");
  await page.getByRole('textbox', { name: 'Email' }).fill('iffat.ahmedk@gmail.com');
  await page.getByRole('textbox', { name: 'Password'}).fill('sajna!jaag');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.getByRole('heading', { name: 'Today' }).waitFor({ timeout: 50000 });
  await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible();

  await page.getByTestId('app-sidebar-container').getByRole('button', { name: 'Add task' }).click();
  await page.getByRole('textbox', { name: 'Task name' }).getByRole('paragraph').fill(taskName);
  await page.getByTestId('task-editor-submit-button').click();
  await expect(page.getByRole('button', { name: 'Task:  ' + taskName })).toBeVisible();
    const taskTimestamp = page.locator('.task_content', {
    hasText: taskName,
  });

  await taskTimestamp.click();
  await page.getByRole('button', { name: 'More actions' }).click();
  
  page.getByText('Delete', { exact: true }).first().click();
  
  await expect(page.getByRole('button', { name: 'Task:  ' + taskName })).not.toBeVisible();

});