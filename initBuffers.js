function initBuffers(gl) {
  // Cria um buffer para as posições dos vértices do quadrado.
  const positionBuffer = gl.createBuffer();
  // Selecione o positionBuffer para aplicar as operações de buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Posições dos vértices do quadrado.
  const positions = [
    -1,-1,-1,   1,-1,-1,  -1,-1,1,
    -1,-1,1,   -1,1,-1,   -1,-1,-1,
    -1,-1,-1,   1,-1,-1,  -1,1,-1,
    -1,1,-1,    1,-1,-1,  -1,-1,1,
  ];
  // Passe a lista de posições para o WebGL
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(positions),
    gl.STATIC_DRAW
  );

  const faceColors = [
    [1.0, 1.0, 1.0, 1.0],
    [1.0, 0.0, 0.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],
    [0.0, 0.0, 1.0, 1.0],
  ];

  var colors = [];
  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];
    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // Contruindo vetor de elementos que especifica os indices dos vértices
  // para cada face do cubo
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // Este vetor define cada face como dois triângulos, usando os
  // indices no vetor de vértices para especificar cada triângulo
  const indices = [
    0,1,2, 3,4,5, 6,7,8, 9,10,11
  ];

  // Enviando os elemntos para o vetor GL
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}