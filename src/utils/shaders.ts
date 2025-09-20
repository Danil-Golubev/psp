export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;

  void main() {
    // Используем vUv вместо gl_FragCoord для независимости от размера экрана
    vec2 uv = vUv;
    
    // Нормализуем координаты и добавляем защиту от NaN
    uv = clamp(uv, 0.0, 1.0);
    uv.y += 0.4;
    
    vec4 _TopColor = vec4(0.04, 0.19, 0.54, 1.0);
    vec4 _BottomColor = vec4(0.04, 0.69, 0.87, 1.0);

    float _Frequency = 4.29;
    float _OuterWavesAmplitude = 0.5;
    float _InnerWavesAmplitude = 0.18;
    float _OuterWavesSpeed = 0.044;
    float _InnerWavesSpeed = 0.064;
    float _OuterWave1Falloff = 2.0;
    float _OuterWave2Falloff = 2.0;
    float _InnerWave1Falloff = 1.0;
    float _InnerWave2Falloff = 1.0;
    
    // Добавляем защиту от бесконечности и NaN для времени
    float time = clamp(iTime, 0.0, 10000.0);

    vec3 white = vec3(1.0, 1.0, 1.0);

    float topOuterWave = sin((uv.x + (time * (_OuterWavesSpeed + (0.0025 * 1.0)))) * _Frequency) * _OuterWavesAmplitude;
    float bottomOuterWave = sin((uv.x + (time * (_OuterWavesSpeed + (0.0025 * 20.0)))) * _Frequency) * _OuterWavesAmplitude;
    float topInnerWave = sin((uv.x + (time * (_InnerWavesSpeed + (0.0025 * 8.0)))) * _Frequency) * _InnerWavesAmplitude;
    float bottomInnerWave = sin((uv.x + (time * (_InnerWavesSpeed + (0.0025 * 40.0)))) * _Frequency) * _InnerWavesAmplitude;

    float topOuterWaveFalloff = topOuterWave;
    float bottomOuterWaveFalloff = bottomOuterWave;
    float topInnerWaveFalloff = topInnerWave;
    float bottomInnerWaveFalloff = bottomInnerWave;

    topOuterWave += 1.0 - (1.0 - uv.y) * 6.0;
    bottomOuterWave += 1.0 - (uv.y * 6.0);
    topInnerWave += 1.0 - (uv.y) * 2.5;
    bottomInnerWave += 1.0 - (1.0 - uv.y) * 2.5;

    topOuterWaveFalloff += 1.0 - (1.0 - uv.y - 0.2) * 6.0;
    bottomOuterWaveFalloff += 1.0 - ((uv.y - 0.2) * 6.0);
    topInnerWaveFalloff += 1.0 - ((uv.y - 0.1) * 2.2);
    bottomInnerWaveFalloff += 1.0 - (((1.0 - uv.y - 0.1)) * 2.2);

    float wave1 = 1.0 - smoothstep(0.0, 0.025, topOuterWave);
    float wave2 = 1.0 - smoothstep(0.0, 0.025, bottomOuterWave);
    float wave3 = 1.0 - smoothstep(0.0, 0.025, topInnerWave);
    float wave4 = 1.0 - smoothstep(0.0, 0.025, bottomInnerWave);

    float wave1Falloff = 1.0 - smoothstep(0.0, _OuterWave1Falloff, topOuterWaveFalloff);
    float wave2Falloff = 1.0 - smoothstep(0.0, _OuterWave2Falloff, bottomOuterWaveFalloff);
    float wave3Falloff = 1.0 - smoothstep(0.0, _InnerWave1Falloff, topInnerWaveFalloff);
    float wave4Falloff = 1.0 - smoothstep(0.0, _InnerWave2Falloff, bottomInnerWaveFalloff);

    wave1 -= wave1Falloff;
    wave2 -= wave2Falloff;
    wave3 -= wave3Falloff;
    wave4 -= wave4Falloff;

    wave1 = clamp(wave1, 0.0, 1.0);
    wave2 = clamp(wave2, 0.0, 1.0);
    wave3 = clamp(wave3, 0.0, 1.0);
    wave4 = clamp(wave4, 0.0, 1.0);

    float wave = wave1 + wave2 + wave3 + wave4;
    vec4 waveContribution = vec4(white, wave);
    vec4 background = vec4(mix(_BottomColor.rgb, _TopColor.rgb, uv.y), 1.0);

    gl_FragColor = mix(background, waveContribution, wave);
  }
`;
