import './utils/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { UsersController } from './controllers/users.controller';
import * as database from '@src/database/database';
import { Application } from 'express';
import { ClassesController } from './controllers/classes.controller';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.setupControllers();
  }

  private setupControllers(): void {
    const userController = new UsersController();
    const classesController = new ClassesController();

    this.addControllers([userController, classesController]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening of port:', this.port);
    })
  }
}
