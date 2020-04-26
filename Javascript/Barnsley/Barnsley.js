// Barnsley's Fern
const transformations = [
    { p : 0.03, m : [[0, 0], [0, 0.16]], n : [0, 0] },
    { p : 0.85, m : [[0.85, 0.04], [-0.04, 0.85]], n : [0, 1.60] },
    { p : 0.06, m : [[0.20, -0.26], [0.23, 0.22]], n : [0, 1.60] },
    { p : 0.06, m : [[-0.15, 0.28], [0.26, 0.24]], n : [0, 0.44] }
]
const origin = [200, 300]
const scale = [29, 25]
const color = "darkgreen"

function transform(pos)
{
    r = math.random()
    for (t of transformations)
    {
        if (r < t.p) {
            return math.add(math.multiply(t.m, pos), t.n)
        } else {
            r -= t.p
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 800x600 canvas element created in the HTML
    const context = document.getElementById('canvas').getContext('2d', {antialias:false})
    var pos = [0, 0]
    window.setInterval(() => {
        context.save()
        context.fillStyle = color
        context.transform(1, 0, 0, -1, origin[0], origin[1])        // flip the canvas vertically, and set origin
        context.fillRect(pos[0]*scale[0], pos[1]*scale[1], 1, 1)
        pos = transform(pos)
        context.restore()
    }, .01)
})
