// Базовые значения для эталонного разрешения (1920x1080)
export const BASE_VIEWPORT_WIDTH = 10;
export const BASE_VIEWPORT_HEIGHT = 5.625;

// Пропорции экрана PSP (480×272)
export const PSP_SCREEN_WIDTH = 480;
export const PSP_SCREEN_HEIGHT = 272;
export const PSP_SCREEN_ASPECT_RATIO = PSP_SCREEN_WIDTH / PSP_SCREEN_HEIGHT; // ≈ 1.765

// Масштаб для уменьшения wallpaper и interface (совпадает с --scale-factor в CSS)
export const SCALE_FACTOR = 0.85;

// Позиция и вращение модели PSP по умолчанию
export const DEFAULT_MODEL_POSITION: [number, number, number] = [0, 9.2, -2.5];
export const DEFAULT_MODEL_ROTATION: [number, number, number] = [1.6, 3.15, 0];

// Позиция wallpaper в 3D сцене
export const WALLPAPER_POSITION: [number, number, number] = [0, 0, -2.8];

