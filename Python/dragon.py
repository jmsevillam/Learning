import numpy as np
import matplotlib.pylab as plt
import sys
import os

def rot(x,y,ang):
    x_1=x-x[-1]
    y_1=y-y[-1]
    x_rot=(np.cos(ang)*x_1-np.sin(ang)*y_1)+x[-1]
    y_rot=(np.sin(ang)*x_1+np.cos(ang)*y_1)+y[-1]
    return x_rot[::-1],y_rot[::-1]

def make_plot(x,y,i):

    fig=plt.figure(figsize=(10,10))
    ax=fig.add_subplot(111)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_aspect(aspect=1)
    ax.plot(x,y)
    plt.savefig("images/"+str(i).zfill(2)+".png")
    plt.close()

x=np.array([0,1])
y=np.array([0,0])

os.mkdir("images")
N=int(sys.argv[1])

for i in range(N):
    x_r,y_r=rot(x,y,np.pi/2)
    x=np.append(x,x_r)
    y=np.append(y,y_r)
    print(i,len(x))
    make_plot(x,y,i)
