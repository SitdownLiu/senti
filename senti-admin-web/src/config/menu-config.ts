export const INIT_MENUS = (values: any) => {
  return [
    {
      title: values['gettingStarted']['title'],
      open: true,
      children: [
        {
          title: values['gettingStarted']['sample'],
          link: '/pages/getting-started/sample',
        },
      ],
      link: '/pages/getting-started',
      menuIcon: 'icon icon-console',
    },
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
