import { Howl } from 'howler';

// Sound effect types
export type SoundEffect = 
  | 'click'
  | 'hover'
  | 'select'
  | 'success'
  | 'error'
  | 'coin'
  | 'levelUp'
  | 'gameOver'
  | 'achievement'
  | 'transition'
  | 'powerUp'
  | 'blip';

// Sound URLs - using base64 encoded simple sounds or external URLs
// For production, replace these with actual sound files
const SOUND_URLS: Record<SoundEffect, string> = {
  click: 'data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',
  hover: 'data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',
  select: 'data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',
  success: 'data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',
  error: 'data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',
  coin: 'data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',
  levelUp: 'data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',
  gameOver: 'data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',
  achievement: 'data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',
  transition: 'data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',
  powerUp: 'data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',
  blip: 'data:audio/wav;base64,UklGRl9vT19teleWQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',
};

class SoundManager {
  private sounds: Map<SoundEffect, Howl> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.5;
  private musicVolume: number = 0.3;
  private initialized: boolean = false;
  private backgroundMusic: Howl | null = null;
  private musicEnabled: boolean = false;

  constructor() {
    // Defer initialization until first interaction
  }

  private initializeSounds() {
    if (this.initialized) return;
    
    // Create Web Audio context-based sounds
    Object.entries(SOUND_URLS).forEach(([key, _url]) => {
      const sound = this.createSynthSound(key as SoundEffect);
      this.sounds.set(key as SoundEffect, sound);
    });
    
    this.initialized = true;
  }

  // Create synthesized retro sounds using Web Audio API wrapped in Howler
  private createSynthSound(type: SoundEffect): Howl {
    // Generate simple beep sounds
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const duration = 0.1;
    const sampleRate = audioContext.sampleRate;
    const numSamples = duration * sampleRate;
    const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
    const data = buffer.getChannelData(0);

    // Different frequencies for different sounds
    const frequencies: Record<SoundEffect, number> = {
      click: 800,
      hover: 400,
      select: 600,
      success: 1000,
      error: 200,
      coin: 1200,
      levelUp: 880,
      gameOver: 150,
      achievement: 1400,
      transition: 500,
      powerUp: 1600,
      blip: 700,
    };

    const freq = frequencies[type];
    
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      // Simple square wave with envelope
      const envelope = Math.exp(-t * 10);
      data[i] = envelope * (Math.sin(2 * Math.PI * freq * t) > 0 ? 0.3 : -0.3);
    }

    // Convert to WAV
    const wav = this.bufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);

    return new Howl({
      src: [url],
      volume: this.volume,
      preload: true,
    });
  }

  private bufferToWav(buffer: AudioBuffer): ArrayBuffer {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const dataLength = buffer.length * blockAlign;
    const bufferLength = 44 + dataLength;
    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);

    // WAV header
    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, bufferLength - 8, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataLength, true);

    // Audio data
    const channelData = buffer.getChannelData(0);
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += bytesPerSample;
    }

    return arrayBuffer;
  }

  play(effect: SoundEffect) {
    if (!this.enabled) return;
    
    if (!this.initialized) {
      this.initializeSounds();
    }

    const sound = this.sounds.get(effect);
    if (sound) {
      sound.volume(this.volume);
      sound.play();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.stopAll();
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach((sound) => {
      sound.volume(this.volume);
    });
  }

  stopAll() {
    this.sounds.forEach((sound) => {
      sound.stop();
    });
  }

  // Background Music Methods
  private initBackgroundMusic() {
    if (this.backgroundMusic) return;
    
    // Use the custom arcade music MP3 file
    this.backgroundMusic = new Howl({
      src: ['/arcadesfx.mp3'],
      volume: this.musicVolume,
      loop: true,
      preload: true,
      html5: true, // Use HTML5 Audio for better compatibility
      onloaderror: (_id, error) => {
        console.error('Music load error:', error);
      },
      onplayerror: (_id, error) => {
        console.error('Music play error:', error);
      }
    });
  }

  playMusic() {
    this.initBackgroundMusic();
    
    if (this.backgroundMusic && !this.musicEnabled) {
      this.backgroundMusic.volume(this.musicVolume);
      this.backgroundMusic.play();
      this.musicEnabled = true;
      console.log('Music started');
    }
  }

  stopMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
      this.musicEnabled = false;
    }
  }

  toggleMusic(): boolean {
    if (this.musicEnabled) {
      this.stopMusic();
    } else {
      this.playMusic();
    }
    return this.musicEnabled;
  }

  setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.backgroundMusic) {
      this.backgroundMusic.volume(this.musicVolume);
    }
  }

  isMusicPlaying() {
    return this.musicEnabled;
  }

  getMusicVolume() {
    return this.musicVolume;
  }

  isEnabled() {
    return this.enabled;
  }

  getVolume() {
    return this.volume;
  }
}

// Singleton instance
export const soundManager = new SoundManager();

// React hook for sound
export const useSound = () => {
  return {
    play: (effect: SoundEffect) => soundManager.play(effect),
    setEnabled: (enabled: boolean) => soundManager.setEnabled(enabled),
    setVolume: (volume: number) => soundManager.setVolume(volume),
    isEnabled: () => soundManager.isEnabled(),
    getVolume: () => soundManager.getVolume(),
    // Music controls
    playMusic: () => soundManager.playMusic(),
    stopMusic: () => soundManager.stopMusic(),
    toggleMusic: () => soundManager.toggleMusic(),
    setMusicVolume: (volume: number) => soundManager.setMusicVolume(volume),
    isMusicPlaying: () => soundManager.isMusicPlaying(),
    getMusicVolume: () => soundManager.getMusicVolume(),
  };
};
