import { test as base } from '@playwright/test'
import { GetStartedPage } from '../page/start-page';
import { BoardPage } from '../page/board';
import { BoardListPage } from '../page/board-list-page';

type TrelloFixtures = {
  getStartedPage: GetStartedPage;
  boardPage: BoardPage;
  boardListPage: BoardListPage;
};

export const test = base.extend<TrelloFixtures>({

  getStartedPage: async ({ page }, use) => {
    await use(new GetStartedPage(page));
  },

  boardPage: async ({ page }, use) => {
    await use(new BoardPage(page));
  },

  boardListPage: async ({ page }, use) => {
    await use(new BoardListPage(page));
  },
});

export { expect } from '@playwright/test';