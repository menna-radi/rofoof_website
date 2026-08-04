import { DispatchBoardDTO } from '../dtos/DispatchDTO';

export interface IDispatchLocalDataSource {
  getCachedBoard(): DispatchBoardDTO | null;
  cacheBoard(board: DispatchBoardDTO): void;
}

export class DispatchLocalDataSourceImpl implements IDispatchLocalDataSource {
  private cache: DispatchBoardDTO | null = null;

  getCachedBoard(): DispatchBoardDTO | null {
    return this.cache;
  }

  cacheBoard(board: DispatchBoardDTO): void {
    this.cache = board;
  }
}

export const dispatchLocalDataSource = new DispatchLocalDataSourceImpl();
