using Plots
x=range(1,stop=10,step=0.01)
y=exp.(-x).*(4sin.(π*x)+0.1(x).^3);
plot(x,y,fmt= :png)

savefig("test")
