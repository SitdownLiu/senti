export const INIT_MENUS = (values: any) => {
  return [
    {
      title: values['schemas']['title'],
      open: true,
      link: '/pages/schemas',
      menuIcon: 'icon icon-console',
      children: [
        {
          title: values['schemas']['formSchema'],
          link: '/pages/schemas/form-schema',
        },
      ],
    },
  ];
};
