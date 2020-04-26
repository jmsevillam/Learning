speed = 1


W = 350
H = 500

transformations = [
  [ ((x,y) -> 0                ) , ((x,y) -> 0.16*y                  ) , 1  ]
  [ ((x,y) -> 0.2*x - 0.26*y   ) , ((x,y) -> 0.23*x + 0.22*y + 1.6   ) , 7  ]
  [ ((x,y) -> -0.15*x + 0.28*y ) , ((x,y) -> 0.26*x + 0.24*y + 0.44  ) , 7  ]
  [ ((x,y) -> 0.85*x + 0.04*y  ) , ((x,y) -> -0.04*x + 0.85*y + 1.6  ) , 85 ]
]

maxDraws = 200000

xRange = [ -2.182 , 2.6558 ]
yRange = [ 0      , 9.9983 ]

canvas = document.getElementById("world")
canvas.width = W
canvas.height = H

styles =
  position: "absolute"
  top: "50%"
  left: "50%"
  margin: "-#{~~(H/2)}px 0 0 -#{~~(W/2)}px"

colorStops = [
  [ 0       , "rgba(255,255,255,1)"    ]
  [ 1000    , "rgba(253,253,52,0.6)"   ]
  [ 5000    , "rgba(0,171,56,0.7)"     ]
  [ 10000   , "rgba(168,210,110,0.7)"  ]
  [ 20000   , "rgba(246,243,27,0.6)"   ]
  [ 40000   , "rgba(138,215,39,0.7)"   ]
  [ 65000   , "rgba(243,205,8,0.5)"    ]
  [ 90000   , "rgba(150,204,104,0.4)"  ]
  [ 125000  , "rgba(137,230,101,0.5)"  ]
  [ 150000  , "rgba(246,243,27,0.5)"   ]
  [ 190000  , "rgba(255,255,255,0.8)"  ]
]

animationCurve = (frame) ->
  return 25 if frame < 1000
  return 50 if frame < 5000
  return 75 if frame < 10000
  return 100 if frame < 20000
  return 150 if frame < 40000
  return 250 if frame < 65000
  return 400 if frame < 90000
  return 600 if frame < 150000
  return 400 if frame < 190000
  return 100 if frame < 200000

lut = {}
numDraws = 0
pMax = 0

for row in transformations
  lut[i] = [row[0], row[1]] for i in [pMax..row[2]+pMax-1]
  pMax += row[2]

getColors = ->
  colors = colorStops.slice()
  ->
    return unless colors[0] and numDraws >= colors[0][0]
    colorStop = colors.shift()
    ctx.fillStyle = colorStop[1]

canvas.style[k] = v for k,v of styles

window.ctx = canvas.getContext("2d")

xSpan = xRange[1]-xRange[0]
ySpan = yRange[1]-yRange[0]

window.updateColor = getColors()

render = ->
  return if numDraws > maxDraws
  updateColor()
  drawsPerFrame = speed*animationCurve(numDraws)
  for i in [0..drawsPerFrame]
    iter = 0
    [x,y] = [rand(xRange[0],xRange[1]), rand(yRange[0],yRange[1])]
    while iter++ < 50
      f = lut[~~rand(0,pMax)]
      [x,y] = [f[0](x,y), f[1](x,y)]
    x = W*(x-xRange[0])/xSpan
    y = H*(1-y/ySpan)
    ctx.fillRect x, y, 1, 1
  numDraws += drawsPerFrame


window.onclick = ->
  numDraws = 0
  window.updateColor = getColors()
  ctx.clearRect(0,0,W,H)

rand = (a,b) -> (b-a)*Math.random()+a

window.requestAnimationFrame ||= do ->
  for prefix in ['webkit','moz','ms','o']
    return r if r = window["#{prefix}RequestAnimationFrame"]
  (callback) -> window.setTimeout(callback, 1000/60)

(step = -> requestAnimationFrame(step) and render())()
