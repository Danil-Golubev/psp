import { MainOption } from './types';

export const defaultItems: MainOption[] = [
  {
    name: 'Settings',
    icon: '/newicons/Settings.svg',
    semiOptions: [
      {
        name: 'USB Connection',
        icon: '/newicons/USB.svg',
        data: <div>USB connection settings</div>
      },
      {
        name: 'System Update',
        icon: '/newicons/Update.svg',
        data: <div>System update</div>
      },
      
    ]
  },
  {
    name: 'Photo',
    icon: '/newicons/Picture.svg',
    semiOptions: [
      {
        name: 'Camera',
        icon: '/newicons/Cam.svg',
        data: <div>Camera</div>
      },
      {
        name: 'Memory Stick',
        icon: '/newicons/SdCard.svg',
        data: <div>MP3 player or playlist</div>
      }
    ]
  },
  {
    name: 'Music',
    icon: '/newicons/Music.svg',
    semiOptions: [
      {
        name: 'Memory Stick',
        icon: '/newicons/SdCard.svg',
        data: <div>Brightness, themes, etc.</div>
      }
    ]
  },
  {
    name: 'Video',
    icon: '/newicons/Video.svg',
    semiOptions: [
      {
        name: 'Display',
        icon: '/newicons/SdCard.svg',
        data: <div>Brightness, themes, etc.</div>
      }
    ]
  },
  {
    name: 'Game',
    icon: '/newicons/GamePad.svg',
    semiOptions: [
      {
        name: 'Game Sharing',
        icon: '/newicons/Share.svg',
        data: <div>Game sharing</div>
      },
      {
        name: 'Display',
        icon: '/newicons/SdCard.svg',
        data: <div>Brightness, themes, etc.</div>
      }
    ]
  },
  {
    name: 'Network',
    icon: '/newicons/Network.svg',
    semiOptions: [
      {
        name: 'Internet Browser',
        icon: '/newicons/Web.svg',
        data: <div>Internet browser</div>
      },
      {
        name: 'Display',
        icon: '/newicons/SdCard.svg',
        data: <div>Brightness, themes, etc.</div>
      }
    ]
  }
];
