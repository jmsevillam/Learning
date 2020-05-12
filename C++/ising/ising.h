#include<iostream>
#include<vector>
#include<cmath>

typedef std::vector<std::vector<int> > matrix;

class ising{
private:
  matrix m;
  void get_mem(matrix & m,int N);
  int N;
  double kbT;
  double J;
  double H;
public:
  void Initial_Conditions(int size, double Temp);
  void Time_Step();
  void MC_Time_Step(int x, int y);
  double Magne();
  double Get_Temp(){return kbT;};
  void Temp(double T){kbT=T;};
  void Field(double Fie){H=Fie;};
  void print();
};

void ising::get_mem(matrix & m,int N){
  m.resize(N);
  for(int i=0;i<N;i++){
    m[i].resize(N);
    for(int j=0;j<N;j++){
      m[i][j]=1;//2*(rand() % 2)-1;
    }
  }
}

void ising::Initial_Conditions(int size, double Temp) {
  N=size;
  kbT=Temp;
  get_mem(m,N);
  J=1;
  H=0.0;
  }
  double ising::Magne(){
    double mag=0;
    for(int i=0;i<N;i++){
      for(int j=0;j<N;j++){
        mag+=m[i][j];
      }
    }
    return mag/(N*N);
  }
void ising::MC_Time_Step(int x, int y){
  int xp,xl,yp,yl;
  double E,Eold,Enew,dE,r;
  xp=x+1;xl=x-1; yp=y+1;yl=y-1;
  if(x==0){xl=N-1;}
  if(x==N-1){xp=0;}
  if(y==0){yl=N-1;}
  if(y==N-1){yp=0;}
  E=J*(m[xl][y]+m[xp][y]+m[x][yl]+m[x][yp]);

  Eold=m[x][y]*(E+H);
  Enew=-m[x][y]*(E+H);
  dE=Eold-Enew;
  if(dE<0){
    m[x][y]=-m[x][y];
  }else{
    r=drand48();
    if(r<exp(-dE/kbT)){
      m[x][y]=-m[x][y];
    }
  }
}

void ising::Time_Step(){
  int x,y;
  for(int j=0;j<N*N;j++){
    x=rand()%N;
    y=rand()%N;
    MC_Time_Step(x,y);
  }
}

void ising::print(){
 for(int i=0;i<N;i++){
    for(int j=0;j<N;j++){
      std::cout<<m[i][j]<<' ';
    }
    std::cout<<std::endl;
  }
}
