import { MainOption } from './types';

export const defaultItems: MainOption[] = [
  {
    name: 'Settings',
    icon: '/newicons/Settings.svg',
    semiOptions: [
      {
        name: 'God of War',
        icon: '/newicons/SdCard.svg',
        data: <div>God of War info or launch screen</div>
      },
      {
        name: 'GTA: Liberty City Stories',
        icon: '/newicons/SdCard.svg',
        data: <div>GTA LCS info or launch screen</div>
      }
    ]
  },
  {
    name: 'Photo',
    icon: '/newicons/Picture.svg',
    semiOptions: [
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
        name: 'Display',
        icon: '/newicons/SdCard.svg',
        data: <div>Brightness, themes, etc.</div>
      }
    ]
  }
];
