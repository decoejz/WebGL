function drawScene(gl, programInfo, buffers, deltaTime, vertexCount, translation, rotation) {
  // Atualiza o valor da rotação
  squareRotation += deltaTime;

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // define cor para pintar de preto sem transparência;
  gl.clearDepth(1.0); // Limpa o buffer de profundidade
  gl.enable(gl.DEPTH_TEST); // Liga o teste de profundidade (Z-Buffer)
  // Pinta todo o canvas com a cor padrão (preto)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  // Cria uma matriz de perspectiva com um campo de visão de 45 graus,
  // com a proporção de largura/altura correspondente ao tamanho de
  // exibição da tela, com objetos visiveis entre 0.1 e 100 unidades
  // de distância da câmera.
  const fieldOfView = (45 * Math.PI) / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.01;
  const zFar = 1000.0;
  const projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  // Define a posição do desenho para a identidade, que é
  // o centro da cena.
  const modelViewMatrix = mat4.create();
  // Move a posição do desenho para onde queremos
  // desenhar o quadrado.
  mat4.translate(
    modelViewMatrix, // destino
    modelViewMatrix, // matriz para transladar
    translation // translação
  );
  mat4.rotate(modelViewMatrix,
    modelViewMatrix,
    squareRotation,
    rotation);//
  // Diga ao WebGL como retirar as cores do buffer de cores
  // para colocar no atributo vertexColor.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }
  // Diga ao WebGL como retirar as posições do
  // atributo vertexPosition do buffer
  {
    const numComponents = 3; // pega 3 valores por iteração
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // quantos bytes para um conjunto de valores
    // 0 = use type and numComponents above
    const offset = 0;
    // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
  // Diga ao WebGL quais indices usar para conectar os vértices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  // Diga ao WebGL para usar nosso programa ao desenhar
  gl.useProgram(programInfo.program);
  // Defina os uniforms dos shaders
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );
  {
    const offset = 0;
    // const vertexCount = 12;
    const type = gl.UNSIGNED_SHORT;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    // gl.drawArrays(gl.LINE_STRIP, 3168, 79);
    // gl.drawArrays(gl.LINE_STRIP, 9504, 237);
    // gl.drawElements(gl.LINE_STRIP, 16000, gl.UNSIGNED_SHORT, 0);
  }

  {
    const colorBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer2);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), gl.STATIC_DRAW);
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer2);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }
  {
    const numComponents = 3; // pega 3 valores por iteração
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // quantos bytes para um conjunto de valores
    // 0 = use type and numComponents above
    const offset = 0;
    // how many bytes inside the buffer to start from

    const positionBuffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer2);
    // Passe a lista de posições para o WebGL
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([25.422214018734696, 10, 6.210060115636458, 25.054533708642875, 10, 8.038034946202249, 24.2394351898851, 10, 7.330431785983232, 23.947062895113273, 10, 9.579598973822256, 22.839592081583675, 10, 10.986381447114844, 20.917022749296297, 10, 10.84317604564195, 20.695528586590356, 10, 13.513535590754207, 20.10635411379263, 10, 15.055099618374213, 19.51717964099487, 10, 17.161061404740344, 19.441871625674874, 10, 19.267023191106475, 18.923575284943002, 10, 20.673805664399033, 18.777389137557087, 10, 23.62215216531163, 17.373116146001554, 10, 25.584908550204865, 16.340953347791977, 10, 25.441703148731975, 15.087296386876464, 10, 25.584908550204865, 13.904517558026868, 10, 25.163716192931634, 13.24003506990908, 10, 26.991691023497427, 12.13256425637948, 10, 27.126472577824874, 10.657413132758057, 10, 28.39004964964454, 10.657413132758057, 10, 28.39004964964454, 10.139116792026215, 10, 27.834075738043893, 7.481186839555166, 10, 29.375639765663895, 6.298408010705538, 10, 28.39004964964454, 5.044751049790055, 10, 28.533255051117433, 3.4942919108486072, 10, 28.39004964964454, 3.861972220940428, 10, 29.097652809863558, 4.747948871764121, 10, 29.79683212293713, 6.595210188731472, 10, 31.759588507830365, 7.259692676849259, 10, 33.44435793692327, 7.9241751649670125, 10, 34.707935008742936, 8.73484380047068, 10, 36.39270443783583, 9.474634303908461, 10, 37.79948691112842, 9.842314614000282, 10, 39.62746174169421, 10.139116792026215, 10, 41.73342352806034, 10.506797102118036, 10, 43.83938531442647, 10.657413132758057, 10, 45.524154743519404, 11.39277375294173, 10, 47.34370572693972, 12.650860597111352, 10, 48.18609044148618, 13.24003506990908, 10, 50.43525762932521, 14.347505883438682, 10, 51.55562929967198, 15.233482534262375, 10, 52.263232459891, 16.11945918508607, 10, 51.55562929967198, 17.8161044714134, 10, 50.85644998659844, 18.702081122237093, 10, 51.13443694239874, 19.588057773060754, 10, 50.85644998659844, 20.25254026117854, 10, 49.59287291477874, 20.917022749296297, 10, 48.05130888715874, 21.58150523741405, 10, 49.31488595897843, 22.0244935628259, 10, 47.34370572693972, 22.32129574085183, 10, 49.44966751330585, 23.947062895113273, 10, 49.59287291477874, 25.054533708642875, 10, 50.15727067352487, 25.865202344146542, 10, 49.44966751330585, 26.75117899497024, 10, 50.15727067352487, 27.858649808499838, 10, 50.15727067352487, 28.96612062202944, 10, 49.736078316251664, 29.262922800055374, 10, 48.05130888715874, 29.776789257533107, 10, 46.22333405659294, 29.55529509482717, 10, 43.696179912953575, 30.219777582944953, 10, 41.02582036784133, 30.88426007106271, 10, 38.9198585814752, 32.73152138803009, 10, 37.52149995532808, 32.28853306261824, 10, 35.5503197232894, 32.28853306261824, 10, 32.888384025322615, 32.28853306261824, 10, 30.49601143601067, 33.09920169812191, 10, 28.39004964964454, 33.542190023533756, 10, 26.28408786327841, 34.64966083706336, 10, 26.28408786327841, 36.12924184393889, 10, 26.848485622024533, 37.382898804854406, 10, 27.834075738043893, 39.81933459461951, 10, 29.79683212293713, 40.851497392829124, 10, 30.49601143601067, 40.851497392829124, 10, 30.49601143601067, 41.666595911586896, 10, 28.39004964964454, 42.55257256241059, 10, 28.533255051117433, 42.55257256241059, 10, 27.126472577824874, 41.44510174888099, 10, 25.862895506005177, 40.4838170827373, 10, 25.441703148731975, 40.70531124544321, 10, 22.072164290546148]),
      gl.STATIC_DRAW
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer2);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
  // const indiceBuffer2 = gl.createBuffer();
  //   gl.bindBuffer(gl.ARRAY_BUFFER, indiceBuffer2);
  //   // Passe a lista de posições para o WebGL
  //   gl.bufferData(
  //     gl.ELEMENT_ARRAY_BUFFER,
  //     new Uint16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]),
  //     gl.STATIC_DRAW
  //   );
  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indiceBuffer2);
  {
    gl.drawElements(gl.LINE_STRIP, 79, gl.UNSIGNED_SHORT, 3168);
  }
}