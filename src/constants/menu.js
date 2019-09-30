const data = [
  {
    id: 'category',
    icon: 'simple-icon-layers',
    label: 'menu.category',
    to: '/admin/category'
  },
  {
    id: 'author',
    icon: 'iconsminds-male-female',
    label: 'menu.author',
    to: '/admin/author'
  },
  {
    id: 'gogo',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.gogo',
    to: '/admin/gogo',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.start',
        to: '/admin/gogo/start'
      }
    ]
  },
  {
    id: 'secondmenu',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.second-menu',
    to: '/admin/second-menu',
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.second',
        to: '/admin/second-menu/second'
      }
    ]
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: '/admin/blank-page'
  },
  {
    id: 'docs',
    icon: 'iconsminds-library',
    label: 'menu.docs',
    to: 'https://gogo-react-docs.coloredstrategies.com/',
    newWindow: true
  }
];
export default data;
