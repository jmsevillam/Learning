#include "ising.h"
#include <cstdlib>
#include <cmath>
int main(int argc, char const *argv[]) {
  ising model;
  model.Initial_Conditions(atoi(argv[1]),0.1);
  int Num=atoi(argv[2]);
  int iter=atoi(argv[3]);
  double dT=(4.0)/(Num+1.0);
  double T;
  for (int j=0;j<Num;j++){
    T=j*dT;
    model.Temp(T);
    for(int i=0;i<iter;i++){
      model.Time_Step();
    }
    printf("%f %f\n",T,abs(model.Magne()));
  }
  return 0;
}
