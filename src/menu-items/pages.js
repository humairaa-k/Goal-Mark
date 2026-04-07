// assets
import { IconArchive, IconCategory2, IconKey, IconPlus, IconSettings, IconTargetArrow } from '@tabler/icons-react';

// constant
const icons = {
  IconArchive,
  IconCategory2,
  IconKey,
  IconPlus,
  IconSettings,
  IconTargetArrow
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'sidebar.pages',
  icon: icons.IconKey,
  type: 'group',
  children: [
    {
      id: 'goals-page',
      title: 'sidebar.goals',
      type: 'item',
      url: '/goals',
      icon: icons.IconTargetArrow,
      breadcrumbs: false
    },
    {
      id: 'new-goal-page',
      title: 'sidebar.newGoal',
      type: 'item',
      url: '/goals/new',
      icon: icons.IconPlus,
      breadcrumbs: false
    },
    {
      id: 'categories-page',
      title: 'sidebar.categories',
      type: 'item',
      url: '/categories',
      icon: icons.IconCategory2,
      breadcrumbs: false
    },
    {
      id: 'archive-page',
      title: 'sidebar.archive',
      type: 'item',
      url: '/archive',
      icon: icons.IconArchive,
      breadcrumbs: false
    },
    {
      id: 'settings-page',
      title: 'sidebar.settings',
      type: 'item',
      url: '/settings',
      icon: icons.IconSettings,
      breadcrumbs: false
    },
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,
      children: [
        {
          id: 'login',
          title: 'Login',
          type: 'item',
          url: '/pages/login',
          target: true
        },
        {
          id: 'register',
          title: 'Register',
          type: 'item',
          url: '/pages/register',
          target: true
        }
      ]
    }
  ]
};

export default pages;
