import App from './src/App';
import { GarageIcon, NotificationIcon } from './icon';

export const path = '/npwd-forge-garage';

export default () => ({
  id: 'npwd_forge_garage',
  nameLocale: 'Forge Garage',
  color: '#ffffff',
  backgroundColor: '#171717',
  path,
  icon: GarageIcon,
  app: App,
  notificationIcon: NotificationIcon,
});