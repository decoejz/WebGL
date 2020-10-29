// Início do Sistema WebGL
function main(positions, faceColors, indices, vertexCount, translation, rotation) {
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
  // Rotina para contruir todos os buffers
  const buffers = initBuffers(gl, positions, faceColors, indices);

  var then = 0;
  // Desenha a cena continuamente
  function render(now) {
    now *= 0.001; // converte o tempo para segundos
    const deltaTime = now - then;
    then = now;
    drawScene(gl, programInfo, buffers, deltaTime, vertexCount, translation, rotation);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}