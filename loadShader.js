// cria um shader para o código fonte fornecido.
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  // Enviar o código fonte para o objeto do shader
  gl.shaderSource(shader, source);
  // Compila o shader
  gl.compileShader(shader);
  // Verifica se a compilação funcionou
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      "Um erro ocorreu ao compilar o shader: " + gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}