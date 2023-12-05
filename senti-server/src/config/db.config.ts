import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

interface IDbConfig {
  db: TypeOrmModuleOptions;
}

export const dbConfig = (): IDbConfig => {
  const entitiesRelativePath =
    process.env.DB_ENTITIES_PATH || '/dist/src/entity/**/*.entity{.ts,.js}';

  return {
    db: {
      logging:
        process.env.DB_LOGGING === 'true' ? true : false || ['error', 'query'],
      maxQueryExecutionTime:
        Number(process.env.DB_MAX_QUERY_EXECUTION_TIME) || 300000,
      synchronize:
        process.env.DB_SYNCHRONIZE === 'true' ? true : false || false,
      cache: process.env.DB_CACHE === 'true' ? true : false || false,
      entities: [path.join(process.cwd(), entitiesRelativePath)],
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      connectTimeout: 300000,
    },
  };
};
