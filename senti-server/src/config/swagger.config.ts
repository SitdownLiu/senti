import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = async (app) => {
  const options = new DocumentBuilder()
    .setTitle('Senti（森蒂）服务端')
    .setDescription(
      '',
    )
    .setVersion('1.0.0')
    .addTag('Senti Service')
    .build();

  const docment = await SwaggerModule.createDocument(app, options);
  await SwaggerModule.setup(process.env.API_DOC_PATH, app, docment);
};
