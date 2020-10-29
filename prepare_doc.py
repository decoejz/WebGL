positions = []
faceColors = []
indices = []

with open('sp.pto', 'r') as file:
    lat_b, lat_s = file.readline().split(' ')
    lng_b, lng_s = file.readline().split(' ')

    largura, altura = file.readline().split(' ')
    largura, altura = int(largura), int(altura)

    #################################################

    z = 0
    a = 0
    for line in file.readlines():
        x = 0
        for y in line.split(' '):
            try:
                y_int = int(y)
                if y_int <= 40:
                    faceColors += [0.0, 0.2, 1.0-y_int/40, 1.0]
                else:
                    faceColors += [1.0*y_int/2000, 0.6, 0.35, 1.0]
                positions += [x, y_int/100, z]
                if (z<altura-1 and x<largura-1):
                    indices += [z*largura+x, z*largura+x+1, (z+1)*largura+x]
                    indices += [(z+1)*largura+x+1, z*largura+x+1, (z+1)*largura+x]
                x += 1
                a += 3
            except:
                pass
        z += 1

print(f'const lat_s = {lat_s}')
print(f'const lat_b = {lat_b}')
print(f'const lng_s = {lng_s}')
print(f'const lng_b = {lng_b}')
print(f'const largura = {largura}')
print(f'const altura = {altura}')
print(f'const positions = {positions};')
print(f'const colors = {faceColors};')
print(f'const indices = {indices};')
print(f'const vertexCount = {len(indices)};')