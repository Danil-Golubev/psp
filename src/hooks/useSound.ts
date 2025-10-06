import { useEffect, useState } from 'react';

export const useSound = (soundPath: string, volume: number = 0.5) => {
  const [audioContext] = useState(() => new (window.AudioContext || (window as any).webkitAudioContext)());
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    fetch(soundPath)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(buffer => setAudioBuffer(buffer))
      .catch(err => console.log('Audio loading failed:', err));
  }, [audioContext, soundPath]);

  const play = () => {
    if (!audioBuffer) return;
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start(0);
  };

  return { play };
};

