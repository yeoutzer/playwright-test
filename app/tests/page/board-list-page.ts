import { expect, type Locator, type Page } from '@playwright/test';

export class BoardListPage {
    readonly page: Page;
    readonly boardListTitle: Locator;
    readonly boardName: Locator;
    readonly boardFavoriteButton: Locator;
    readonly createBoardButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.boardListTitle = page.getByTestId('board-list');
        this.boardName = page.getByTestId('board-item');
        this.boardFavoriteButton = page.getByTestId('star');
        this.createBoardButton = page.getByTestId('create-board');
    }

    async expectBoardListPage() {
        await expect(this.boardListTitle).toBeVisible();
        await expect(this.boardListTitle).toContainText('My Boards');
        await expect(this.boardName).toBeVisible();
        await expect(this.boardName.getByRole('heading')).toHaveText('first board');
        
        await this.boardName.hover()

        await expect(this.boardFavoriteButton.getByRole('img')).toBeVisible();
        await expect(this.createBoardButton).toBeVisible();
        await expect(this.createBoardButton.getByRole('heading')).toHaveText('Create new board');
    }

    async openBoard(boardIndex: number) {
        await this.page.locator(`#board-${boardIndex.toString()}`).click();
    }
}