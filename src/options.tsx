import { MainOption } from './types';

export const pspOptions: MainOption[] = [
  {
    name: 'Settings',
    icon: '/icons/settings.png',
    semiOptions: [
      {
        name: 'God of War',
        icon: '/icons/memorystick.png',
        data: <div>God of War info or launch screen</div>
      },
      {
        name: 'GTA: Liberty City Stories',
        icon: '/icons/memorystick.png',
        data: <div>GTA LCS info or launch screen</div>
      }
    ]
  },
  {
    name: 'Photo',
    icon: '/icons/photo.png',
    semiOptions: [
      {
        name: 'My Playlist',
        icon: '/icons/memorystick.png',
        data: <div>MP3 player or playlist</div>
      }
    ]
  },
  {
    name: 'Music',
    icon: '/icons/music.png',
    semiOptions: [
      {
        name: 'Display',
        icon: '/icons/memorystick.png',
        data: <div>Brightness, themes, etc.</div>
      }
    ]
  },
  {
    name: 'Video',
    icon: '/icons/video.png',
    semiOptions: [
      {
        name: 'Display',
        icon: '/icons/memorystick.png',
        data: <div>Brightness, themes, etc.</div>
      }
    ]
  },
  {
    name: 'Game',
    icon: '/icons/game.png',
    semiOptions: [
      {
        name: 'Display',
        icon: '/icons/memorystick.png',
        data: <div>Brightness, themes, etc.</div>
      }
    ]
  },
  {
    name: 'Network',
    icon: '/icons/network.png',
    semiOptions: [
      {
        name: 'Display',
        icon: '/icons/memorystick.png',
        data: <div>Brightness, themes, etc.</div>
      }
    ]
  }
];
