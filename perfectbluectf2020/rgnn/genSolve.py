from constants import ROWS, COLS

with open('./s.out', 'w') as out:
  out.write('[colors]\n')
  out.write('r = (red) %\n')
  out.write('g = (green) *\n')
  out.write('y = (yellow) &\n')

  color_map = [None, 'r', 'g', 'y', '']

  print('[*] Adding columns')
  out.write('[clues]\n')
  out.write('columns =\n')
  for i in range(len(COLS)):
    segments = COLS[i]
    currStr = '    '
    for segment in segments:
      color = color_map[segment[0]]
      rep = segment[1]
      currStr += str(rep) + color + ' '
    currStr = currStr[:-1] + '\n'
    out.write(currStr)

  print('[*] Adding rows')
  out.write('rows = \n')
  for i in range(len(ROWS)):
    segments = ROWS[i]
    currStr = '    '
    for segment in segments:
      color = color_map[segment[0]]
      rep = segment[1]
      currStr += str(rep) + color + ' '
    currStr = currStr[:-1] + '\n'
    out.write(currStr)
