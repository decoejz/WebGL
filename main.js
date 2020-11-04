// Início do Sistema WebGL
function main(positions, faceColors, indices, vertexCount, translation, rotation, spPos, spIndex, spColor, spVertexCount) {
  const canvas = document.querySelector("#glcanvas");
  // Initializa o context GL
  const gl = canvas.getContext("webgl");
  // Caso o navegador não suporte WebGL
  if (!gl) {
    alert(
      " Não foi possível iniciar o WebGL. Seu navegador não deve suportá-lo."
    );
    return;
  }
  // Defina a cor de limpeza para preto sem transparência
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // Limpe o buffer de cores com a cor especificada
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Vertex shader
  const vsSource = `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
varying lowp vec4 vColor;
void main() {
gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
vColor = aVertexColor;
}
`;
  const fsSource = `
varying lowp vec4 vColor;
void main() {
gl_FragColor = vColor;
}
`;
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
    },
  };

  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // define cor para pintar de preto sem transparência
  gl.clearDepth(1.0);                 // Limpa o buffer de profundidade
  gl.enable(gl.DEPTH_TEST);           // Liga o teste de profundidade (Z-Buffer)

  // Pinta todo o canvas com a cor padrão (preto)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Rotina para contruir todos os buffers
  const buffers = initBuffers(gl, positions, faceColors, indices);
  drawScene(gl, programInfo, buffers, 0, vertexCount, translation, rotation, gl.TRIANGLES);

  if (spPos) {
    const buffers2 = initBuffers(gl, spPos, spColor, spIndex);
    drawScene(gl, programInfo, buffers2, 0, spVertexCount, translation, rotation, gl.LINE_STRIP);
  }
}