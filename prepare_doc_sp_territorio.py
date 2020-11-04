positions = []
faceColors = []
indices = []

with open('sp.pto', 'r') as file:
    lat_b, lat_s = file.readline().split(' ')
    lat_b, lat_s = float(lat_b), float(lat_s)

    lng_b, lng_s = file.readline().split(' ')
    lng_b, lng_s = float(lng_b), float(lng_s)

    largura, altura = file.readline().split(' ')
    largura, altura = int(largura), int(altura)

    with open('sp.ctr', 'r') as points:
        total = int(points.readline())
        localiza_high = {}
        localizacao = []
        indices2 = []
        color2 = []
        state_index = 0
        for line in points.readlines():
            lat_lng = line.split(' ')
            lat, lng = float(lat_lng[1]), float(lat_lng[0])
            x = (largura * (lat - lat_s)) / (lat_b - lat_s)
            z = (altura * (lng - lng_s)) / (lng_b - lng_s)
            localizacao +=  [z, 10, x]
            indices2.append(state_index)
            color2 += [1,1,1,1]
            state_index+=1
            localiza_high[(z, x)] = state_index

    #################################################

    z = 0
    a = 0
    for line in file.readlines():
        x = 0
        for y in line.split(' '):
            try:
                y_int = int(y)
                desired_high = y_int/100
                # if ((x,z) in localiza_high):
                    # print('entrou')
                    # localizacao[localiza_high[(x,z)]*3 + 1] = desired_high + 5
                if y_int <= 40:
                    faceColors += [0.0, 0.2, 1.0-y_int/40, 1.0]
                else:
                    faceColors += [1.0*y_int/2000, 0.8*y_int/2000, 0.35, 1.0]
                positions += [x, desired_high, z]
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
print(f'const vertexCount = {len(indices)};')
print(f'const indices = {indices};')
print(f'const positions = {positions};')
print(f'const colors = {faceColors};')

print(f'const spPos = {localizacao};')
print(f'const spIndex = {indices2}')
print(f'const spVertexCount = {len(indices2)}')
print(f'const spColor = {color2}')
