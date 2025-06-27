import {
  IconAlertTriangle,
  IconArrowRight,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCommand,
  IconCreditCard,
  IconFile,
  IconFileText,
  IconHelpCircle,
  IconPhoto,
  IconDeviceLaptop,
  IconLayoutDashboard,
  IconLoader2,
  IconLogin,
  IconProps,
  IconShoppingBag,
  IconMoon,
  IconDotsVertical,
  IconPizza,
  IconPlus,
  IconSettings,
  IconSun,
  IconTrash,
  IconBrandTwitter,
  IconUser,
  IconUserCircle,
  IconUserEdit,
  IconUserX,
  IconX,
  IconLayoutKanban,
  IconBrandGithub,
  IconApps,
  // Ícones verificados que existem no Tabler v2/v3:
  IconRocket,
  IconPlug,
  IconShoppingCart,
  IconSpider,
  IconDeviceMobile,
  IconKey,
  IconCurrencyDollar,
  IconWallet,
  IconRefresh,
  IconChartBar,
  IconSpeakerphone,
  IconShield,
  IconLogout,
  IconAdjustments,
  IconPaperclip // Para "Personalizar"
} from '@tabler/icons-react';

export type Icon = React.ComponentType<IconProps>;

export const Icons = {
  dashboard: IconLayoutDashboard,
  logo: IconCommand,
  login: IconLogin,
  close: IconX,
  product: IconShoppingBag,
  spinner: IconLoader2,
  kanban: IconLayoutKanban,
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  trash: IconTrash,
  employee: IconUserX,
  post: IconFileText,
  page: IconFile,
  userPen: IconUserEdit,
  paper: IconPaperclip,
  user2: IconUserCircle,
  media: IconPhoto,
  settings: IconSettings,
  billing: IconCreditCard,
  ellipsis: IconDotsVertical,
  add: IconPlus,
  warning: IconAlertTriangle,
  user: IconUser,
  apps: IconApps,
  arrowRight: IconArrowRight,
  help: IconHelpCircle,
  pizza: IconPizza,
  sun: IconSun,
  moon: IconMoon,
  laptop: IconDeviceLaptop,
  github: IconBrandGithub,
  twitter: IconBrandTwitter,
  check: IconCheck,
  // Ícones atualizados com nomes corretos:
  rocket: IconRocket, // Começar
  plug: IconPlug, // Integração
  shoppingCart: IconShoppingCart, // Checkout
  sliders: IconAdjustments, // Personalizar Checkout (IconSlider existe mas IconAdjustments é mais comum)
  smartphone: IconDeviceMobile, // App (nome correto)
  key: IconKey,
  fileText: IconKey, // Credenciais
  mousePointer: IconKey, // Botões (nome mais apropriado)
  dollarSign: IconCurrencyDollar, // Financeiro (nome oficial)
  wallet: IconWallet, // Carteira
  refreshCw: IconRefresh, // Reembolsos (nome simplificado)
  barChart: IconChartBar, // Análises
  megaphone: IconSpeakerphone, // Marketing
  shield: IconShield, // Privacidade
  logOut: IconLogout // Sair (nome oficial)
};
