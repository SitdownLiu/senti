import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = async (app) => {
  const options = new DocumentBuilder()
    .setTitle('病程管理系统 Follow-Up-System')
    .setDescription(
      '基于医院机构、用户、角色的授权管理，动态随访表单的设计和授权管理，慢病随访管理业务的病程管理系统',
    )
    .setVersion('1.0.0')
    .addTag('Follow up system')
    .build();

  const docment = await SwaggerModule.createDocument(app, options);
  await SwaggerModule.setup(process.env.API_DOC_PATH, app, docment);
};
