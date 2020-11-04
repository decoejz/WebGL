function drawScene(gl, programInfo, buffers, deltaTime, vertexCount, translation, rotation, geometria) {
  // Atualiza o valor da rotação
  squareRotation += deltaTime;

  // gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // // define cor para pintar de preto sem transparência;
  // gl.clearDepth(1.0); // Limpa o buffer de profundidade
  // gl.enable(gl.DEPTH_TEST); // Liga o teste de profundidade (Z-Buffer)
  // // Pinta todo o canvas com a cor padrão (preto)
  // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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
    gl.drawElements(geometria, vertexCount, type, offset);
  }
}